const chatRouter = require('express').Router()
const Chat = require('../model/chat-model')
import { getChats } from "../controllers/chat-controller"

chatRouter.get('/', getChats)
module.exports = chatRouter