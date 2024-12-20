import { expect } from 'chai'
import SsParser from '../models/SsParser.js'
import RttStats from '../models/RttStats.js'
import SsGetter from '../models/SsGetter.js'
import { ssOutput } from './seed.js'

let r
const SP = new SsParser({data: ssOutput(), peerIp: '10.0.1.37'})

describe('SsParser', () => {

    describe('rtts', () => {
        it('Should should return an array of rtt objects', () => {
            console.log(SP.rtts)
            expect(SP.rtts).to.be.an('array')
            expect(SP.rtts[0]).to.be.an('object')
            expect(SP.rtts[0].rtt).to.be.a('number')
        })
    })

    describe('peerIpLines', () => {
        it('Should return an array of lines', () => {
            expect(SP.peerIpLines).to.be.an('array')
        })
    })
})

describe('RttStats', () => {
    describe('stats', () => {
        it('Should return the aggregate stats', () => {
            const RS = new RttStats()
            SP.rtts.forEach (r => RS.recordRtt(r))
            r = RS.stats
            expect(r).to.be.an('object')
            expect(r.numEntries).to.be.a('number')
        })
    })
})

describe('SsGetter', () => {
    describe.skip('run()', () => {
        it('Should run indefinitely', () => {
            const SG = new SsGetter({periodMs: 100, testSsOutput: ssOutput()})
            SG.run()
        })
    })

    describe.only('runOnce()', () => {
        it('Should run once', () => {
            const SG = new SsGetter({periodMs: 100, testSsOutput: ssOutput()})
            SG.runOnce()
        })
    })
})
