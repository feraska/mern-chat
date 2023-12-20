import express from "express"
import { getAllUsers, login, register, setAvatar } from "../controllers/usersController.js"
export const userRoutes = express.Router()
userRoutes.post('/register',register)
userRoutes.post('/login',login)
userRoutes.post('/setAvatar/:id',setAvatar)
userRoutes.get('/allusers/:id',getAllUsers)
