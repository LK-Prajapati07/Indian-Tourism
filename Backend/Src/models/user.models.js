import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        // unique: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['tourist', 'admin', 'serviceProvider'],
        default: 'tourist'

    },
    accountStatus: {
        type: String,
        enum: ["active", "blocked", "pending"],
        default: "active"
    },
},{
    timestamps: true
})
export const User = mongoose.model('User', userSchema)