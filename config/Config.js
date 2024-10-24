export default class Config{

    // static serverIp = '127.0.0.1'
    static serverIp = '10.0.1.62'
    static largeName = 'large'
    static smallName = 'small'

    static largeBytes = 1024 * 1024 * 25
    static smallBytes = 10 * 1024

    static largeBuffer = Buffer.alloc(this.largeBytes, 'a')
    static smallBuffer = Buffer.alloc(this.smallBytes, 'a')

    static getNumBytesForName(name){
        return name === this.smallName ? this.smallBytes : this.largeBytes
    }
}