import express from "express";
import { authenticate } from '../middleware/authentication.js'
import { isAdmin, isTourist } from '../middleware/authorization.js'
import { adminUpdateBookingStatus, cancelBooking, createBooking, getAllBookings, getBookingById, getMyBookings } from '../controllers/booking.controller.js'
const bookingRoute=express.Router()

// Tourist 
bookingRoute.post("/",authenticate,isTourist,createBooking)
bookingRoute.get("/my",authenticate,isTourist,getMyBookings)
bookingRoute.get("/:id",authenticate,isTourist,getBookingById)
bookingRoute.put("/cancel/:id",authenticate,isTourist,cancelBooking)

//admin
bookingRoute.get("/",authenticate,isAdmin,getAllBookings)
bookingRoute.put('/approvedAdmin',authenticate,isAdmin,adminUpdateBookingStatus)
export default bookingRoute