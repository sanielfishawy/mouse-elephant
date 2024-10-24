export default class Config{
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