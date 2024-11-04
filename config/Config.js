import os from 'os'
export default class Config{

    static linuxServerIp = '10.0.1.57'

    static get serverIp(){
        return this.isMac ? '127.0.0.1' : this.linuxServerIp
    } 
    static clientIp = '10.0.1.55'
    static largeName = 'large'
    static smallName = 'small'

    static largeBytes = 1024 * 10
    static smallBytes = 1

    static largeBuffer = Buffer.alloc(this.largeBytes, 'a')
    static smallBuffer = Buffer.alloc(this.smallBytes, 'a')

    static getNumBytesForName(name){
        return name === this.smallName ? this.smallBytes : this.largeBytes
    }

    static get isMac(){
        return os.platform() === 'darwin'
    }
}