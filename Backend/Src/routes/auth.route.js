import express from "express";
import {validationRegister} from "../middleware/validation.js"
import {authenticate} from '../middleware/authentication.js'
import {getUserProfile, Login, Logout, Register} from '../controllers/auth.controller.js'
const authRoutes = express.Router()
authRoutes.post('/register',validationRegister,Register)
authRoutes.post('/login',Login)
authRoutes.get('/userProfile',authenticate,getUserProfile)
authRoutes.post('/logout',authenticate,Logout)
export default authRoutes 