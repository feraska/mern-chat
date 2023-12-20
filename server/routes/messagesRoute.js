import express from "express"
import { addMsg,getAllMessage } from "../controllers/messagesController.js"
export const messageRoutes = express.Router()
messageRoutes.post("/addmsg",addMsg)
messageRoutes.post("/getmsg",getAllMessage)
