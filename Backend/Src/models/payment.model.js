import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        stripeTransactionId: {
            type: String,
            required: true,
            unique: true
        },

        amount: {
            type: Number,
            required: true
        },

        currency: {
            type: String,
            required: true,
            default: "INR"
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "success", "failed", "refunded"],
            default: "pending"
        },

        refundStatus: {
            type: String,
            enum: ["not_requested", "requested", "processed"],
            default: "not_requested"
        },

        paidAt: {
            type: Date,
            required: function () {
                return this.paymentStatus === "success";
            }
        }

    },
    {
        timestamps: true
    }
);

export const Payment = mongoose.model("Payment", PaymentSchema);
