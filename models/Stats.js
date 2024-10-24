export default class Stats{
    static numRequests = 0
    static f_0_2 = 0
    static f_2_5 = 0
    static g_5 = 0


    static recordDelay(delay){
        this.numRequests++

        if (delay <= 2)
            this.f_0_2++
        else if (delay <= 5)
            this.f_2_5++
        else
            this.g_5++
    }

    static get numRequests(){
        return this.numRequests
    }

    static getStats(){
        return {
            f_0_2: this.f_0_2,
            f_2_5: this.f_2_5,
            g_5: this.g_5
        }
    }

    static resetStats(){
        this.f_0_2 = 0
        this.f_2_5 = 0
        this.g_5 = 0
    }
    

}