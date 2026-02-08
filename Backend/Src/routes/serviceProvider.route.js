import express from 'express'
import { authenticate } from "../middleware/authentication.js"
import { isAdmin, isServiceProvider } from "../middleware/authorization.js"
import { createServiceProvider, getServiceProviders } from "../controllers/serviceProvider.controller.js"
const serviceProviderRoute=express.Router()
serviceProviderRoute.post("/",authenticate,isServiceProvider,createServiceProvider)
serviceProviderRoute.get("/",authenticate,isAdmin,getServiceProviders)
export default serviceProviderRoute