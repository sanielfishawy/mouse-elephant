import { execSync } from 'child_process'
import RttStats from './RttStats.js'
import ssParser from './SsParser.js'
import Config from '../config/Config.js'
import { ssOutput } from '../test/seed.js'

export default class SsGetter {
    
    constructor({periodMs, peerIp=Config.clientIp, testSsOutput}){
        this._periodMs = periodMs
        this._rttStats = new RttStats()
        this._testSsOutput = testSsOutput
    }

    getPeriodMs(){
        return this._periodMs
    }   

    getSsOutput(){
        if (this._testSsOutput) return this._testSsOutput
        if (Config.isMac) return ssOutput()
        return execSync('ss -tin', { encoding: 'utf-8' })
    }

    getAndRecord(){
        const output = this.getSsOutput()
        const rtts = new ssParser({data: output}).rtts
        this._rttStats.recordRtts(rtts)
    }

    async run(){
        setInterval(() => {
            this.getAndRecord()
        }, this.getPeriodMs())
    }

    runOnce(){
        this.getAndRecord()
        this._rttStats.printStats()
    }
}