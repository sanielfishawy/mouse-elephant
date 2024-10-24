export default class Stats{
    static numRequests = 0
    static l_2 = 0
    static b_2_5 = 0
    static g_5 = 0
    static min = 100000
    static max = 0
    static sum = 0


    static recordDelay(delay){
        this.numRequests++

        sum += delay

        if (delay < this.min) this.min = delay
        if (delay > this.max) this.max = delay

        if (delay <= 2)
            this.l_2++
        else if (delay <= 5)
            this.b_2_5++
        else
            this.g_5++
    }

    static get numRequests(){
        return this.numRequests
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
            g_5: this.g_5
        }
    }

    static resetStats(){
        this.f_0_2 = 0
        this.b_2_5 = 0
        this.g_5 = 0
    }
    

}