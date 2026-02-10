import express from 'express'
import { authenticate } from "../middleware/authentication.js"
import { isAdmin, isServiceProvider } from "../middleware/authorization.js"
import { approveServiceProvider, createServiceProvider, getServiceProviders } from "../controllers/serviceProvider.controller.js"
const serviceProviderRoute=express.Router()
//Service Provider Route
serviceProviderRoute.post("/",authenticate,isServiceProvider,createServiceProvider)
//Admin Routes
serviceProviderRoute.get("/",authenticate,isAdmin,getServiceProviders)
serviceProviderRoute.put("/adminServiceProvider",authenticate,isAdmin,approveServiceProvider)
export default serviceProviderRoute