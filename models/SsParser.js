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
        // const regex = /rtt:(?<rtt>\d+\.?\d*)\/(?<rttVariance>\d+\.?\d*) .* bytes_sent:(?<bytesSent>\d+) bytes_retrans:(?<bytesRetrans>\d+) .* minrtt:(?<minRtt>\d+\.?\d*)/
    
        const regex = /rtt:(?<rtt>\d+\.?\d*)\/(?<rttVariance>\d+\.?\d*) .* bytes_sent:(?<bytesSent>\d+)(?: bytes_retrans:(?<bytesRetrans>\d+))? .* minrtt:(?<minRtt>\d+\.?\d*)/

        const match = line.match(regex);

        if (!match) console.log(line)

        const r = {}

        if (match) {
            r.rtt = parseFloat(match.groups.rtt)
            r.rttVar = parseFloat(match.groups.rttVariance)
            r.minRtt = parseFloat(match.groups.minRtt)
            r.bytesSent = parseInt(match.groups.bytesSent)
            r.bytesRetrans = parseInt(match.groups.bytesRetrans || 0)
        }

        // if (!r.rtt || !r.rttVar || !r.minRtt || !r.bytesSent || !r.bytesRetrans){
        //     console.log(line);
        //     console.log(this.lines)
        // }

        return r
    }

    get rtts(){
        if(!this._rtts){
            this._rtts = this.peerIpLines.map((rtt) => this.getRtt(rtt))
        }
        return this._rtts
    }
}