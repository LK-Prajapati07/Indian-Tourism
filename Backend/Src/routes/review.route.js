import express from 'express'
import { authenticate } from '../middleware/authentication.js'
import { isAdmin, isTourist } from '../middleware/authorization.js'
import { createReview, getAllReviews, getMyReviews, getServiceReviews, updateReviewStatus } from '../controllers/review.controller.js'
const reviewRoute=express.Router()
reviewRoute.post("/",authenticate,isTourist,createReview)
reviewRoute.get("/my",authenticate,getMyReviews)

//public
reviewRoute.get("/service/:serviceId",getServiceReviews)

//admin
reviewRoute.get("/",authenticate,isAdmin,getAllReviews)
reviewRoute.put("/:reviewId",authenticate,isAdmin,updateReviewStatus)

export default reviewRoute