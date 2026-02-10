import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";

/* =========================
   CREATE BOOKING (TOURIST)
========================= */
export const createBooking = async (req, res) => {
  try {
    const {
      serviceRef,
      destinationRef,
      travelDates,
      quantity,
      totalPrice
    } = req.body;

    // userRef MUST come from authenticated user
    const userRef = req.user._id;

    const newBooking = new Booking({
      userRef,
      serviceRef,
      destinationRef,
      travelDates,
      quantity,
      totalPrice,
      bookingStatus: "pending" // default booking state
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating booking"
    });
  }
};


/* =========================
   GET MY BOOKINGS (TOURIST)
========================= */
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ userRef: userId })
      .populate("serviceRef", "serviceName price")
      .populate("destinationRef", "destinationName");

    return res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching bookings"
    });
  }
};


/* =========================
   GET ALL BOOKINGS (ADMIN)
========================= */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userRef", "fullName email")
      .populate("serviceRef", "serviceName price")
      .populate("destinationRef", "destinationName");

    return res.status(200).json({
      success: true,
      bookings
    });

  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching bookings"
    });
  }
};


/* =========================
   GET BOOKING BY ID
   (OWNER OR ADMIN)
========================= */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID"
      });
    }

    const booking = await Booking.findById(id)
      .populate("userRef", "fullName email")
      .populate("serviceRef", "serviceName price")
      .populate("destinationRef", "destinationName");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Ownership or admin check
    if (
      booking.userRef._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    return res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching booking"
    });
  }
};


/* =========================
   CANCEL BOOKING (SOFT)
========================= */
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Ownership check
    if (booking.userRef.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can cancel only your own booking"
      });
    }

    // Prevent cancelling completed booking
    if (booking.bookingStatus === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed bookings cannot be cancelled"
      });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully"
    });

  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(500).json({
      success: false,
      message: "Error cancelling booking"
    });
  }
};


export const adminUpdateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body; // cancelled | completed

    if (!["cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: `Booking marked as ${status}`,
      booking
    });

  } catch (error) {
    res.status(500).json({ message: "Booking update failed" });
  }
};