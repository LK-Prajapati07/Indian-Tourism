import { createReview } from "@/API/reviewApi";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "sonner";

const WriteReview = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        bookingId,
        rating,
        comment,
      });

      toast.success("Review submitted successfully!");
      navigate("/bookings");
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold">Write Review</h2>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
