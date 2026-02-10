import express from 'express'
import { checkoutSession, paymentDetails, refundPayment, webhookHandler } from '../controllers/payment.controller.js'
import { authenticate } from "../middleware/authentication.js"
import { isAdmin, isTourist } from "../middleware/authorization.js"
const paymentRoute=express.Router()
paymentRoute.post('/webhook',webhookHandler)
// tourist
paymentRoute.post("/checkout",authenticate,isTourist,checkoutSession)
paymentRoute.get("/:bookingId",authenticate,isTourist,paymentDetails)

// Admin
paymentRoute.post("/refund",authenticate,isAdmin,refundPayment)
export default paymentRoute