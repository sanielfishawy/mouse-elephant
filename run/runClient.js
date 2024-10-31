import Client from '../models/Client.js'
import Config from '../config/Config.js'

const serverIp = process.argv[2] || Config.serverIp
new Client({host: serverIp, port: 6000, size: Config.smallName, gapUs: 0, numRequests: 10000000})