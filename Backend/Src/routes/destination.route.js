import express from "express";
import { createDestination, deleteDestination, getAllDestinations, getDestinationById, updateDestination } from "../controllers/destination.controller.js"
import { isAdmin } from '../middleware/authorization.js'
import { authenticate } from "../middleware/authentication.js";
import { upload } from "../middleware/upload.js";
const destinationRoute=express.Router();
// public Router
destinationRoute.get("/",getAllDestinations) 
destinationRoute.get('/:id',getDestinationById)
//admin  router
destinationRoute.post("/",authenticate,isAdmin,upload.single("images"),createDestination)
destinationRoute.put("/:id",authenticate,isAdmin,updateDestination)
destinationRoute.delete("/:id",authenticate,isAdmin,deleteDestination)

export default destinationRoute