import os from 'os'
export default class Config{

    static linuxServerIp = '10.0.1.57'

    static get serverIp(){
        return this.isMac ? '127.0.0.1' : this.linuxServerIp
    } 
    static clientIp = '10.0.1.55'
    static largeName = 'large'
    static smallName = 'small'
    static oneByteName = 'b'

    static largeBytes = 1024 * 1024 * 25
    static smallBytes = 10 * 1024
    static oneByte = 1

    static largeBuffer = Buffer.alloc(this.largeBytes, 'a')
    static smallBuffer = Buffer.alloc(this.smallBytes, 'a')
    static oneByteBuffer = Buffer.alloc(this.oneByte, 'a')

    static getNumBytesForName(name){
        return name === this.smallName ? this.smallBytes : this.largeBytes
    }

    static get isMac(){
        return os.platform() === 'darwin'
    }
}