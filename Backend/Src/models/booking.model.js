import { Destination } from "./destination";

const bookingModel = new mongoose.Schema({
    userRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',},
        serviceRf:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required:true,
        },
        destinationRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Destination,
    },
    travelDates:{
        type:Date,
        default:Date.now,
    },
    quintity:{
        type:Number,
        required:true,},
    totalPrice:{
        type:Number,
        required:true,},
    bookingStatus:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending",
    },
    bookingDate:{
        type:Date,
        default:Date.now,
    }
},
    {timestamps:true,}
)
export const Booking = mongoose.model("Booking", bookingModel);