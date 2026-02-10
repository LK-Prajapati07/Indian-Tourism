import mongoose from "mongoose";

const reviewModel = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    serviceRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    bookingRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        require:true

    },
    
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
   
    reviewStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    }
},
    { timestamps: true, })
export const Review = mongoose.model("Review", reviewModel);