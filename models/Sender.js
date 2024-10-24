import net from 'net'
import Config from '../config/Config.js'

export default class Sender{

    constructor({host, port}){
        this._host = host
        this._port = port
        this._socket = null
        this._setupSocket()
    }

    get host(){
        return this._host
    }   

    get port(){ 
        return this._port
    }

    get socket(){
        return this._socket
    }

    _setupSocket(){
        this._socket = new net.Socket()
        this._socket.setNoDelay(true)

        this._socket.on('data', this._handleRequest.bind(this))
        this._socket.on('error', this._handleError.bind(this))
        this._socket.on('close', this._handleClose.bind(this))
        
        this._socket.connect(this._port, this._host)
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

new Sender({host: '127.0.0.1', port: 6000})