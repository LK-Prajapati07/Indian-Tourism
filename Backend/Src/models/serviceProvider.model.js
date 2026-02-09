import mongoose from "mongoose";

const serviceProviderModel = new mongoose.Schema({
    serviceProviderName: {
        type: String,
        required: true,
    },
    serviceProviderEmail: {
        type: String,
        required: true,
    },
    serviceProviderPhone: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        enum: ["transportation", "accommodation", "tour guide"],
        required: true,
    },
    adminApproved: {
        type: Boolean,
        default: false,
    },
    accountStatus: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    }
    

},
     { timestamps: true, }
)
export const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderModel);