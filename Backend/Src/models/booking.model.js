import mongoose from "mongoose";

const bookingModel = new mongoose.Schema({
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
    destinationRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true,
    },
    travelDates: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            return value > this.travelDates.startDate;
          },
          message: "endDate must be after startDate",
        },
      },
    }
    ,
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending",
    },

},
    { timestamps: true, }
)
export const Booking = mongoose.model("Booking", bookingModel);