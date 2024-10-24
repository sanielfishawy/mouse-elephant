import net from 'net'
import Config from '../config/Config.js'

export default class Server{

    constructor({port}){
        this._port = port
        this._socket = null
        this._setupServer()
    }

    get port(){ 
        return this._port
    }

    get socket(){
        return this._socket
    }

    _setupServer(){
        const server = net.createServer((socket) => {
            console.log(`Server: client connected ${this.port}`)

            this._socket = socket

            this._socket.on('data', this._handleRequest.bind(this))
            this._socket.on('error', this._handleError.bind(this))
            this._socket.on('close', this._handleClose.bind(this))
        })

        server.listen(this._port, () => {
            console.log(`Server listening on port ${this._port}`)
        })
    }

    _handleRequest(data){
        const reqSize = data.toString('utf-8')
        this._sendData(reqSize)
    }

    _handleError(err){
        console.error(err)
    }

    _handleClose(){
        console.log('Connection closed')
    }

    _sendData(reqSize){
        if (reqSize === Config.smallName)
            this._socket.write(Config.smallBuffer)
        else 
            this._socket.write(Config.largeBuffer)
    }

}

new Server({port: 6000})