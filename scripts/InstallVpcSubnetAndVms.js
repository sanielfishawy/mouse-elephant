import {
    EC2Client,
    CreateVpcCommand,
    DescribeVpcsCommand,
    CreateSubnetCommand,
    DescribeSubnetsCommand,
    CreatePlacementGroupCommand,
    RunInstancesCommand,
    DescribePlacementGroupsCommand,
} from '@aws-sdk/client-ec2';
import { fromIni } from '@aws-sdk/credential-provider-ini';

const profile = 'default'
const region = 'us-west-1'
const AvailabilityZone = 'us-west-1a'
const vpcName = 'vpc-elephant-mouse'
const subnetName = 'subnet-elephant-mouse'
const placementGroupName = 'placement-group-spread-elephant-mouse-4xlarge'
const InstanceType = 'c5a.4xlarge'
const ImageId = 'ami-0175bdd48fdb0973b'
const KeyName = 'se'
const SecurityGroupIds = ['sg-0998f21f2b5c029b2']


const clientConfig = {
    region,
    credentials: fromIni({ profile }),
};
const ec2Client = new EC2Client(clientConfig);

async function findVpc(cidrBlock) {
    const describeParams = {
        Filters: [
            {
                Name: 'cidr-block',
                Values: [cidrBlock]
            },
        ],
    };
    const command = new DescribeVpcsCommand(describeParams);
    const response = await ec2Client.send(command);
    return response.Vpcs[0] ? response.Vpcs[0].VpcId : null;
}

async function createVpc(cidrBlock) {
    const createParams = {
        CidrBlock: cidrBlock,
        TagSpecifications: [
            {
                ResourceType: 'vpc',
                Tags: [
                    {
                        Key: 'Name',
                        Value: vpcName,
                    },
                ],
            },
        ],
    };
    const command = new CreateVpcCommand(createParams);
    const response = await ec2Client.send(command);
    return response.Vpc.VpcId;
}

async function findOrCreateVpc(cidrBlock) {
    let vpcId = await findVpc(cidrBlock);
    if (!vpcId) {
        vpcId = await createVpc(cidrBlock);
    }
    return vpcId;
}

async function findSubnet(vpcId, cidrBlock) {
    const describeParams = {
        Filters: [
            {
                Name: 'vpc-id',
                Values: [vpcId]
            },
            {
                Name: 'cidr-block',
                Values: [cidrBlock]
            },
        ],
    };
    const command = new DescribeSubnetsCommand(describeParams);
    const response = await ec2Client.send(command);
    return response.Subnets[0] ? response.Subnets[0].SubnetId : null;
}

async function createSubnet(vpcId, cidrBlock) {
    const createParams = {
        CidrBlock: cidrBlock,
        VpcId: vpcId,
        AvailabilityZone,
        TagSpecifications: [
            {
                ResourceType: 'subnet',
                Tags: [
                    {
                        Key: 'Name',
                        Value: subnetName,
                    },
                ],
            },
        ],
    };
    const command = new CreateSubnetCommand(createParams);
    const response = await ec2Client.send(command);
    return response.Subnet.SubnetId;
}

async function findOrCreateSubnet(vpcId, cidrBlock, availabilityZone) {
    let subnetId = await findSubnet(vpcId, cidrBlock);
    if (!subnetId) {
        subnetId = await createSubnet(vpcId, cidrBlock, availabilityZone);
    }
    return subnetId;
}

async function createPlacementGroup() {
    const params = {
        GroupName: placementGroupName,
        Strategy: 'spread',
    };
    const command = new CreatePlacementGroupCommand(params);
    try {
        await ec2Client.send(command);
    } catch (error) {
        if (error.name !== 'InvalidPlacementGroup.Duplicate') {
            throw error;
        }
    }
}

async function getPlacementGroupId(groupName) {
    const params = {
        GroupNames: [groupName],
    };
    const command = new DescribePlacementGroupsCommand(params);
    const response = await ec2Client.send(command);
    return response.PlacementGroups[0].GroupId;
}

async function launchInstances(subnetId) {
    const params = {
        ImageId,
        InstanceType,
        KeyName,
        MaxCount: 5,
        MinCount: 5,
        Placement: {
            GroupName: placementGroupName,
        },
        NetworkInterfaces: [
            {
                DeviceIndex: 0,
                SubnetId: subnetId,
                Groups: SecurityGroupIds,
                AssociatePublicIpAddress: true,
            },
        ],
        TagSpecifications: [
            {
                ResourceType: 'instance',
                Tags: [
                    {
                        Key: 'Name',
                        Value: 'mouse-elephant-instance',
                    },
                ],
            },
        ],
    };
    const command = new RunInstancesCommand(params);
    const response = await ec2Client.send(command);
    return response.Instances.map((instance) => instance.InstanceId);
}

async function main() {
    const cidrBlockVPC = '10.0.0.0/16';
    const cidrBlockSubnet = '10.0.1.0/26';

    const vpcId = await findOrCreateVpc(cidrBlockVPC);
    const subnetId = await findOrCreateSubnet(vpcId, cidrBlockSubnet);

    await createPlacementGroup();

    const instanceIds = await launchInstances(subnetId)
    console.log('Launched instances:', instanceIds)
}

main().catch((error) => {
    console.error('Error:', error);
});
