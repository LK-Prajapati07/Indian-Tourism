import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    destinationName: {
      type: String,
      required: true,
      trim: true
    },

    state: {
      type: String,
      required: true,
      trim: true
    },
    city:{
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: ["heritage", "spiritual", "nature", "adventure"],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    bestTimeToVisit: {
      type: String,
      required: true
    },

    images: [
      {
        type: String
      }
    ],

    videos: [
      {
        type: String
      }
    ],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

export const Destination = mongoose.model("Destination", destinationSchema);
