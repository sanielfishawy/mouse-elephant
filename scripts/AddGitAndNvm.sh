#!/bin/bash

sudo yum update -y
sudo yum install git -y
sudo yum install iperf3 -y

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Source the NVM script to use it immediately without restarting the shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  

nvm install 14
nvm use 14

echo "Git and NVM have been installed successfully."

sudo sh -c 'echo 1 > /proc/sys/net/ipv4/tcp_low_latency'

git clone https://github.com/sanielfishawy/mouse-elephant.git