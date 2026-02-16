import express from 'express'
import { authenticate } from "../middleware/authentication.js"
import { isAdmin, isServiceProvider } from "../middleware/authorization.js"
import { createService, deleteService, getMyServices, getServiceById, getServices, updataServiceStatus, updateService } from "../controllers/service.controller.js"
const serviceRoute=express.Router()
// public
serviceRoute.get("/",getServices)
serviceRoute.get("/:id",getServiceById)

// service Provider
serviceRoute.post("/",authenticate,isServiceProvider,createService)
serviceRoute.put("/:id",authenticate,isServiceProvider,updateService)
serviceRoute.get("/my", authenticate,isServiceProvider, getMyServices);

// admin
serviceRoute.delete("/:id",authenticate,isAdmin,deleteService)
serviceRoute.put("/approvedAdminService",authenticate,isAdmin,updataServiceStatus)
export default serviceRoute