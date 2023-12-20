import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import {userRoutes} from "./routes/userRoutes.js"
import { messageRoutes } from "./routes/messagesRoute.js"
import {Server } from "socket.io"
const app = express()
dotenv.config()//load .env to process.env
app.use(cors())// middleware cors
app.use(express.json());//request json
app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)
mongoose.connect(process.env.MONGODB_URL,{
    
}).then(()=>{
    console.log("success connection form db")
}).catch((err)=>{
    console.log(err.message)
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server run in port ${process.env.PORT}`)
})
const io =  new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
})
global.onlineUsers = new Map();
io.on("connection",(socket)=> {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
       // console.log(onlineUsers)
      });
     
      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
      });
})