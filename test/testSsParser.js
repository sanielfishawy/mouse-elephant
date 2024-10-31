import { expect } from 'chai'
import SsParser from '../models/SsParser.js'
import RttStats from '../models/RttStats.js'
import SsGetter from '../models/SsGetter.js'

let r
const SP = new SsParser({data: ssOutput(), peerIp: '10.0.1.37'})

describe('SsParser', () => {
    describe('rtts', () => {
        it('Should should return an array of rtt objects', () => {
            expect(SP.rtts).to.be.an('array')
            expect(SP.rtts[0]).to.be.an('object')
            expect(SP.rtts[0].rtt).to.be.a('number')
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
    describe('run()', () => {
        it('Should run indefinitely', () => {
            const SG = new SsGetter({periodMs: 100, testSsOutput: ssOutput()})
            SG.run()
        })
    })
})

function ssOutput() {
    return `
State      Recv-Q      Send-Q            Local Address:Port             Peer Address:Port       Process                                                                                         
ESTAB      0           3235770               10.0.1.29:42314               10.0.1.37:5201       
	 cubic wscale:7,7 rto:204 rtt:3.579/1.106 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:45 ssthresh:23 bytes_sent:50397082723 bytes_retrans:2122510 bytes_acked:50394960214 segs_out:5762766 segs_in:392308 data_segs_out:5762764 send 900150880bps lastsnd:4 lastrcv:438620 lastack:4 pacing_rate 1079917032bps delivery_rate 1011626080bps delivered:5762531 busy:438588ms rwnd_limited:433148ms(98.8%) retrans:0/244 dsack_dups:10 rcv_space:56587 rcv_ssthresh:56587 notsent:3235770 minrtt:0.228
ESTAB      0           2801618               10.0.1.29:42300               10.0.1.37:5201       
	 cubic wscale:7,7 rto:204 rtt:2.482/0.629 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:37 ssthresh:22 bytes_sent:50394988927 bytes_retrans:1755871 bytes_acked:50393086370 segs_out:5744493 segs_in:381966 data_segs_out:5744491 send 1067245770bps lastsnd:4 lastrcv:438620 lastack:4 pacing_rate 1280501448bps delivery_rate 747389008bps delivered:5744304 busy:438588ms rwnd_limited:437324ms(99.7%) unacked:17 retrans:0/211 dsack_dups:40 rcv_space:56587 rcv_ssthresh:56587 notsent:2654931 minrtt:0.199
ESTAB      0           3766062               10.0.1.29:42264               10.0.1.37:5201       
	 cubic wscale:7,7 rto:224 rtt:22.95/0.251 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:124 ssthresh:72 bytes_sent:50392101935 bytes_retrans:1952244 bytes_acked:50389084761 segs_out:5636035 segs_in:679804 data_segs_out:5636033 send 386815163bps lastsnd:4 lastrcv:438624 pacing_rate 464168080bps delivery_rate 380265832bps delivered:5635696 busy:438588ms rwnd_limited:74104ms(16.9%) unacked:119 retrans:0/219 rcv_space:56587 rcv_ssthresh:56587 notsent:2701131 minrtt:0.375
ESTAB      0           0                     10.0.1.29:22              73.231.248.16:49724      
	 cubic wscale:6,7 rto:220 rtt:19.024/8.371 ato:40 mss:1448 pmtu:9001 rcvmss:1368 advmss:8949 cwnd:7 ssthresh:7 bytes_sent:5939573 bytes_retrans:222640 bytes_acked:5716933 bytes_received:7969 segs_out:14436 segs_in:8105 data_segs_out:14312 data_segs_in:122 send 4262405bps lastsnd:588 lastrcv:22576 lastack:580 pacing_rate 5114712bps delivery_rate 6374464bps delivered:14310 app_limited busy:140060ms retrans:0/641 dsack_dups:639 reord_seen:38 rcv_space:56575 rcv_ssthresh:56575 minrtt:7.154
ESTAB      0           3003713               10.0.1.29:42288               10.0.1.37:5201       
	 cubic wscale:7,7 rto:228 rtt:24.757/0.444 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:138 ssthresh:79 bytes_sent:50396002754 bytes_retrans:1620417 bytes_acked:50393192121 segs_out:5688716 segs_in:369615 data_segs_out:5688714 send 399066769bps lastsnd:4 lastrcv:438620 lastack:4 pacing_rate 478880120bps delivery_rate 376546680bps delivered:5688400 busy:438588ms rwnd_limited:422860ms(96.4%) unacked:133 retrans:0/182 rcv_space:56587 rcv_ssthresh:56587 notsent:1813496 minrtt:0.273
ESTAB      0           3968956               10.0.1.29:42232               10.0.1.37:5201       
	 cubic wscale:7,7 rto:204 rtt:3.959/1.342 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:38 ssthresh:28 bytes_sent:50397836692 bytes_retrans:2527468 bytes_acked:50395031806 segs_out:5759247 segs_in:391272 data_segs_out:5759245 send 687167467bps lastsnd:4 lastrcv:438628 lastack:4 pacing_rate 824418744bps delivery_rate 235370952bps delivered:5758929 busy:438588ms rwnd_limited:431196ms(98.3%) unacked:32 retrans:0/287 dsack_dups:3 rcv_space:56587 rcv_ssthresh:56587 notsent:3691537 minrtt:0.234
ESTAB      0           3284605               10.0.1.29:42248               10.0.1.37:5201       
	 cubic wscale:7,7 rto:228 rtt:24.725/0.446 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:132 ssthresh:95 bytes_sent:50395928376 bytes_retrans:1681511 bytes_acked:50393110343 segs_out:5634544 segs_in:684452 data_segs_out:5634542 send 382210071bps lastrcv:438628 lastack:4 pacing_rate 458638168bps delivery_rate 386508952bps delivered:5634228 busy:438588ms rwnd_limited:75856ms(17.3%) unacked:127 retrans:0/188 rcv_space:56587 rcv_ssthresh:56587 notsent:2148082 minrtt:0.346
ESTAB      0           3520506               10.0.1.29:42250               10.0.1.37:5201       
	 cubic wscale:7,7 rto:204 rtt:2.59/0.59 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:32 ssthresh:17 bytes_sent:50397034509 bytes_retrans:3038326 bytes_acked:50393761048 segs_out:5738821 segs_in:371202 data_segs_out:5738819 send 884534363bps lastrcv:438624 pacing_rate 1061185152bps delivery_rate 424546816bps delivered:5738464 busy:438588ms rwnd_limited:433156ms(98.8%) unacked:27 retrans:0/349 dsack_dups:20 rcv_space:56587 rcv_ssthresh:56587 notsent:3285370 minrtt:0.149
ESTAB      0           36                    10.0.1.29:22              73.231.248.16:49703      
	 cubic wscale:6,7 rto:224 rtt:20.811/11.818 ato:48 mss:1448 pmtu:9001 rcvmss:1368 advmss:8949 cwnd:10 bytes_sent:48481 bytes_acked:48445 bytes_received:6377 segs_out:141 segs_in:172 data_segs_out:133 data_segs_in:74 send 5566287bps pacing_rate 11132568bps delivery_rate 7769856bps delivered:133 busy:1356ms unacked:1 rcv_rtt:17 rcv_space:56575 rcv_ssthresh:56575 minrtt:10.702
ESTAB      0           1458624               10.0.1.29:42222               10.0.1.37:5201       
	 cubic wscale:7,7 rto:204 rtt:3.052/0.803 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:36 ssthresh:25 bytes_sent:50397999714 bytes_retrans:3200583 bytes_acked:50394548623 segs_out:5778247 segs_in:387700 data_segs_out:5778245 send 844466579bps lastsnd:4 lastrcv:438628 lastack:4 pacing_rate 1013069448bps delivery_rate 672646408bps delivered:5777865 busy:438588ms rwnd_limited:434864ms(99.2%) unacked:28 retrans:0/368 dsack_dups:15 rcv_space:56587 rcv_ssthresh:56587 notsent:1208115 minrtt:0.131
ESTAB      0           3030573               10.0.1.29:42280               10.0.1.37:5201       
	 cubic wscale:7,7 rto:220 rtt:17.691/1.115 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:144 ssthresh:74 bytes_sent:50395580760 bytes_retrans:1094844 bytes_acked:50393608915 segs_out:5659951 segs_in:470076 data_segs_out:5659949 send 582739698bps lastsnd:8 lastrcv:438628 lastack:8 pacing_rate 699287632bps delivery_rate 402107128bps delivered:5659729 busy:438592ms rwnd_limited:260776ms(59.5%) unacked:98 retrans:0/123 rcv_space:56587 rcv_ssthresh:56587 notsent:2153571 minrtt:0.393
ESTAB      0           1742432               10.0.1.29:42214               10.0.1.37:5201       
	 cubic wscale:7,7 rto:204 rtt:3.375/1.114 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:37 ssthresh:25 bytes_sent:50398256689 bytes_retrans:2917138 bytes_acked:50395073705 segs_out:5779600 segs_in:385568 data_segs_out:5779598 send 784860444bps lastsnd:8 lastrcv:438636 lastack:8 pacing_rate 941832528bps delivery_rate 666799128bps delivered:5779255 busy:438592ms rwnd_limited:435088ms(99.2%) unacked:30 retrans:0/338 dsack_dups:24 rcv_space:56587 rcv_ssthresh:56587 notsent:1476585 minrtt:0.171
ESTAB      0           0                     10.0.1.29:42210               10.0.1.37:5201       
	 cubic wscale:7,7 rto:208 rtt:4.634/9.043 ato:40 mss:8949 pmtu:9001 rcvmss:536 advmss:8949 cwnd:10 bytes_sent:114 bytes_acked:115 bytes_received:4 segs_out:8 segs_in:7 data_segs_out:3 data_segs_in:3 send 154492879bps lastsnd:438636 lastrcv:438592 lastack:438636 pacing_rate 308977416bps delivery_rate 577354832bps delivered:4 app_limited busy:40ms rcv_space:56587 rcv_ssthresh:56587 minrtt:0.123
`
}
