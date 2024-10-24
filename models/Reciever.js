import net from 'net'
import Config from '../config/Config.js'
import Stats from './Stats.js'

export default class Receiver{

    constructor({port, size: sizeName, gapUs}){
        this._port = port
        this._sizeName = sizeName
        this._gapUs = gapUs
        this._socket = null
        this._received = 0
        this._reqStartTime = null
        this._reqEndTime = null
        Stats.resetStats()
        this._setupServer()
    }

    get port(){
        return this._port
    }

    get sizeName(){
        return this._sizeName
    }

    get sizeBytes(){
        return Config.getNumBytesForName(this.sizeName)
    }

    get gapUs(){
        return this._gapUs
    }

    get received(){
        return this._received
    }

    get socket(){
        return this._socket
    }

    _setupServer(){
        const server = net.createServer((socket) => {
            console.log(`Server: client connected ${this.port}`)

            this._socket = socket
            this.sendDataRequest()

            this._socket.on('data', this._handleData.bind(this))
            this._socket.on('end', this._handleEnd.bind(this))
            socket.on('error', this._handleError.bind(this))
        })

        server.listen(this._port, () => {
            console.log(`Server listening on port ${this._port}`)
        })
    }

    sendDataRequest(){
        this.socket.write(this.sizeName, 'utf-8')
        this._reqStartTime = process.hrtime()
    }

    _handleData(data){
        this._received += data.length
        if (this._received >= this.sizeBytes){
            this._received = 0
            this._reqEndTime = process.hrtime(this._reqStartTime)
            const millis = this._getMillis(this._reqEndTime)
            Stats.recordDelay(millis)
            if (Stats.numRequests >= 1000){
                console.log(Stats.getStats())
                Stats.resetStats()
            } else {
                this.sendDataRequest()
            }
        }
    }

    _getMillis(hrtime){
        return hrtime[0] * 1e3 + hrtime[1] / 1e6
    }
    
    _handleEnd(){
        console.log('Client disconnected')
    }
    
    _handleError(err){
        console.error(err)
    }   

}

new Receiver({port: 6000, size: Config.smallName, gapUs: 1000})