import Client from '../models/Client.js'
import Config from '../config/Config.js'

new Client({host: Config.serverIp, port: 6000, size: Config.smallName, gapUs: 0, numRequests: 100000})