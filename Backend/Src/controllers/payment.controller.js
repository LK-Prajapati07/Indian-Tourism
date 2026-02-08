import Stripe from "stripe";
import { Booking } from "../models/booking.model.js";
import { Payment } from "../models/payment.model.js";
import { ENV } from "../config/env.js";

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

/* =========================
   CREATE CHECKOUT SESSION
   (TOURIST ONLY)
========================= */
export const checkoutSession = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user._id;

    // Validate booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ownership check
    if (booking.userRef.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized booking access" });
    }

    // Prevent double payment
    if (booking.bookingStatus !== "pending") {
      return res.status(400).json({ message: "Booking is not payable" });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Tour Booking Payment",
            },
            unit_amount: booking.totalPrice * 100, // server-trusted price
          },
          quantity: 1,
        },
      ],
      success_url: `${ENV.FRONTEND_URL}/payment-success`,
      cancel_url: `${ENV.FRONTEND_URL}/payment-cancelled`,
      metadata: {
        bookingId: booking._id.toString(),
        userId: userId.toString(),
      },
    });

    // Store pending payment
    await Payment.create({
      booking: booking._id,
      user: userId,
      stripeTransactionId: session.id,
      amount: booking.totalPrice,
      currency: "INR",
      paymentStatus: "pending",
    });

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error("Checkout session error:", error);
    return res.status(500).json({ message: "Failed to create checkout session" });
  }
};


/* =========================
   STRIPE WEBHOOK HANDLER
   (SOURCE OF TRUTH)
========================= */
export const webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      ENV.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const bookingId = session.metadata.bookingId;

    // Update payment
    await Payment.findOneAndUpdate(
      { stripeTransactionId: session.id },
      {
        paymentStatus: "success",
        paidAt: new Date(),
      }
    );

    // Update booking
    await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: "confirmed",
    });
  }

  // Handle failed payment
  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object;

    await Payment.findOneAndUpdate(
      { stripeTransactionId: intent.id },
      { paymentStatus: "failed" }
    );
  }

  res.json({ received: true });
};


/* =========================
   GET PAYMENT DETAILS
   (OWNER OR ADMIN)
========================= */
export const paymentDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const payment = await Payment.findOne({ booking: bookingId })
      .populate("booking")
      .populate("user", "fullName email");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Ownership or admin check
    if (
      payment.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({
      success: true,
      payment,
    });

  } catch (error) {
    console.error("Payment details error:", error);
    return res.status(500).json({ message: "Failed to fetch payment details" });
  }
};


/* =========================
   REFUND PAYMENT
   (ADMIN ONLY)
========================= */
export const refundPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Refund via Stripe
    await stripe.refunds.create({
      payment_intent: payment.stripeTransactionId,
    });

    // Update payment & booking
    payment.paymentStatus = "refunded";
    payment.refundStatus = "processed";
    await payment.save();

    await Booking.findByIdAndUpdate(payment.booking, {
      bookingStatus: "cancelled",
    });

    return res.status(200).json({
      success: true,
      message: "Payment refunded successfully",
    });

  } catch (error) {
    console.error("Refund error:", error);
    return res.status(500).json({ message: "Refund failed" });
  }
};
