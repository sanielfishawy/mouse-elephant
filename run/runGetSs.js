import SsGetter from '../models/SsGetter.js'

new SsGetter({periodMs: 100}).runOnce()
console.log(new SsGetter().getSsOutput())