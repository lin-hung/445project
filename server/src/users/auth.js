import Express,{Router} from 'express'
import socketioConfig from '../config/socketioConfig'
import User from "../models/User"
//console.log(socketioConfig.addSocketIdToSession)

module.exports = Router