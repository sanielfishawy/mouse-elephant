export default class RttStats{

    constructor(){
        this.numEntries = 0
        this.rtt_0_2 = 0
        this.rtt_2_5 = 0
        this.rtt_5_10 = 0
        this.rtt_10_15 = 0
        this.rtt_15_20 = 0
        this.rtt_20_30 = 0
        this.rtt_30_40 = 0
        this.rtt_gt_40 = 0
        this.rtt_min = 100000
        this.rtt_max = 0
        this.rtt_sum = 0

        this.min_rtt_min = 100000
        this.min_rtt_max = 0
    }

    recordRtts(rtts){
        for (const rtt of rtts){
            this.recordRtt(rtt)
        }
    }

    recordRtt(data){
        const rtt = data.rtt
        const minRtt = data.minRtt

        this.numEntries++
        if(this.numEntries % 100 === 0) this.printNumEntries()
        if(this.numEntries % 1000 === 0) this.printStats()

        this.rtt_sum += rtt

        if (rtt < this.rtt_min) this.rtt_min = rtt
        if (rtt > this.rtt_max) this.rtt_max = rtt

        if (minRtt < this.min_rtt_min) this.min_rtt_min = minRtt
        if (minRtt > this.min_rtt_max) this.min_rtt_max = minRtt

        if (rtt < 2)
            this.rtt_0_2++
        else if (rtt < 5)
            this.rtt_2_5++
        else if (rtt < 10)
            this.rtt_5_10++
        else if (rtt < 15)
            this.rtt_10_15++
        else if (rtt < 20)
            this.rtt_15_20++
        else if (rtt < 30)
            this.rtt_20_30++
        else if (rtt < 40)
            this.rtt_30_40++
        else
            this.rtt_gt_40++
    }

    rttAvg(){
        return this.rtt_sum / this.numEntries
    }

    get stats(){
        return {
            numEntries: this.numEntries,
            rtt_0_2: this.rtt_0_2,
            rtt_2_5: this.rtt_2_5,
            rtt_5_10: this.rtt_5_10,
            rtt_10_15: this.rtt_10_15,
            rtt_15_20: this.rtt_15_20,
            rtt_20_30: this.rtt_20_30,
            rtt_30_40: this.rtt_30_40,
            rtt_gt_40: this.rtt_gt_40,
            rtt_min: this.rtt_min,
            rtt_max: this.rtt_max,
            rtt_avg: this.rttAvg(),
            min_rtt_min: this.min_rtt_min,
            min_rtt_max: this.min_rtt_max
        }
    }

    printStats(){
        console.log()
        console.log(this.stats)
        console.log()
    }

    printNumEntries(){
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(this.numEntries.toString())
    }
}
