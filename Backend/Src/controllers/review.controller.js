import { Review } from "../models/review.model.js";
import { Booking } from "../models/booking.model.js";

/* =========================
   CREATE REVIEW (TOURIST)
========================= */
export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const userId = req.user._id;

    // Check booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ownership check
    if (booking.userRef.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized review access" });
    }

    // Only completed bookings can be reviewed
    if (booking.bookingStatus !== "completed") {
      return res.status(400).json({
        message: "You can review only after trip completion"
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({ bookingRef: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: "Review already submitted" });
    }

    const review = await Review.create({
      userRef: userId,
      serviceRef: booking.serviceRef,
      bookingRef: bookingId,
      rating,
      comment,
      reviewStatus: "pending" // admin moderation
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted and awaiting approval",
      review
    });

  } catch (error) {
    console.error("Create review error:", error);
    return res.status(500).json({ message: "Failed to submit review" });
  }
};


/* =========================
   GET REVIEWS BY SERVICE
   (PUBLIC – APPROVED ONLY)
========================= */
export const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.find({
      serviceRef: serviceId,
      reviewStatus: "approved"
    })
      .populate("userRef", "fullName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      reviews
    });

  } catch (error) {
    console.error("Fetch reviews error:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};


/* =========================
   GET MY REVIEWS (USER)
========================= */
export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user._id;

    const reviews = await Review.find({ userRef: userId })
      .populate("serviceRef", "serviceName")
      .populate("bookingRef");

    return res.status(200).json({
      success: true,
      reviews
    });

  } catch (error) {
    console.error("Fetch user reviews error:", error);
    return res.status(500).json({ message: "Failed to fetch your reviews" });
  }
};


/* =========================
   GET ALL REVIEWS (ADMIN)
========================= */
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userRef", "fullName email")
      .populate("serviceRef", "serviceName")
      .populate("bookingRef");

    return res.status(200).json({
      success: true,
      reviews
    });

  } catch (error) {
    console.error("Fetch all reviews error:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};


/* =========================
   APPROVE / REJECT REVIEW
   (ADMIN ONLY)
========================= */
export const updateReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { status } = req.body; // approved / rejected

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid review status" });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { reviewStatus: status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Review ${status} successfully`,
      review
    });

  } catch (error) {
    console.error("Update review error:", error);
    return res.status(500).json({ message: "Failed to update review" });
  }
};
