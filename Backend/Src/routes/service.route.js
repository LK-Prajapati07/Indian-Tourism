import express from 'express'
import { authenticate } from "../middleware/authentication.js"
import { isAdmin, isServiceProvider } from "../middleware/authorization.js"
import { createService, deleteService, getServiceById, getServices, updateService } from "../controllers/service.controller.js"
const serviceRoute=express.Router()
// public
serviceRoute.get("/",getServices)
serviceRoute.get("/:id",getServiceById)

// service Provider
serviceRoute.post("/",authenticate,isServiceProvider,createService)
serviceRoute.put("/:id",authenticate,isServiceProvider,updateService)

// admin
serviceRoute.delete("/:id",authenticate,isAdmin,deleteService)
export default serviceRoute