import Config from '../config/Config.js'

export default class SsParser {

    constructor({data, peerIp=Config.clientIp}){
        this._data = data
        this._peerIp = peerIp
        this._lines = null
        this._peerIpLines = null
    }

    get data(){
        return this._data
    }

    get peerIp(){
        return this._peerIp
    }

    get lines(){
        if (!this._lines){
            this._lines = this._data.split('\n')
        }
        return this._lines
    }

    get peerIpLines(){
        if (!this._peerIpLines){
            this._peerIpLines = []
            let i = 0
            for (const line of this.lines){
                if (this.lineContainsPeerIp(line)){
                    this._peerIpLines.push(this.lines[i+1])
                }
                i++
            }
        }
        return this._peerIpLines
    }

    lineContainsPeerIp(line){
        return line.includes(this.peerIp)
    }

    getRtt(line){
        const regex = /rtt:(\d+\.\d+)\/(\d+\.\d+).*minrtt:(\d+\.\d+)/;
        const match = line.match(regex);

        const r = {}

        if (match) {
            r.rtt = parseFloat(match[1]);
            r.rttVar = parseFloat(match[2]);
            r.minRtt = parseFloat(match[3]);
        }

        if (!r.rtt || !r.rttVar || !r.minRtt) {
            console.error(line);
        }

        return r
    }

    get rtts(){
        if(!this._rtts){
            this._rtts = this.peerIpLines.map(this.getRtt)
        }
        return this._rtts
    }
}