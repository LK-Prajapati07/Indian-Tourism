import express from 'express'
import { authenticate } from "../middleware/authentication.js"
import { isAdmin, isServiceProvider } from "../middleware/authorization.js"
import { applyProvider, approveProvider, getMyProviderProfile, getServiceProviders, rejectProvider} from "../controllers/serviceProvider.controller.js"
const serviceProviderRoute=express.Router()
//Service Provider Route
serviceProviderRoute.post("/",authenticate,isServiceProvider,applyProvider)
serviceProviderRoute.get('/me',authenticate,isServiceProvider,getMyProviderProfile)
//Admin Routes
serviceProviderRoute.get("/",authenticate,isAdmin,getServiceProviders)
serviceProviderRoute.patch("/approve/:id",authenticate,isAdmin,approveProvider)
serviceProviderRoute.patch('/reject/:id',authenticate,isAdmin,rejectProvider)

export default serviceProviderRoute