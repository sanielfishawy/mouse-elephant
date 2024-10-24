export default class Stats{
    static numRequests = 0
    static l_2 = 0
    static b_2_5 = 0
    static b_5_10 = 0
    static b_10_15 = 0
    static b_15_20 = 0
    static b_20_200 = 0
    static b_200_250 = 0
    static g_250 = 0
    static min = 100000
    static max = 0
    static sum = 0


    static recordDelay(delay){
        this.numRequests++

        if (this.numRequests % 1000 === 0) this.printNumRequests()

        this.sum += delay

        if (delay < this.min) this.min = delay
        if (delay > this.max) this.max = delay

        if (delay <= 2)
            this.l_2++
        else if (delay <= 5)
            this.b_2_5++
        else if (delay <= 10)
            this.b_5_10++
        else if (delay <= 15)
            this.b_10_15++
        else if (delay <= 20)
            this.b_15_20++
        else if (delay <= 200)
            this.b_20_200++
        else if (delay <= 250)
            this.b_200_250++
        else
            this.g_250++
    }

    static printNumRequests(){
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(this.numRequests.toString())
    }

    static get numRequests(){
        return this.numRequests
    }

    static get sum(){
        return this.sum
    }

    static get avg(){
        return this.sum / this.numRequests
    }

    static get stats(){
        return {
            min: this.min,
            max: this.max,
            avg: this.avg,
            l_2: this.l_2,
            b_2_5: this.b_2_5,
            b_5_10: this.b_5_10,
            b_10_15: this.b_10_15,
            b_15_20: this.b_15_20,
            b_20_200: this.b_20_200,
            b_200_250: this.b_200_250,
            g_250: this.g_250,
        }
    }

    static resetStats(){
        this.f_0_2 = 0
        this.b_2_5 = 0
        this.g_5 = 0
    }
    

}