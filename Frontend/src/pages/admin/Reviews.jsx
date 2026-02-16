import { getAllReviews } from "@/API/reviewApi";
import { useQuery } from "@tanstack/react-query";


const Reviews = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });

  if (isLoading) return <div>Loading...</div>;

  const reviews = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Reviews</h1>

      {reviews.map((review) => (
        <div key={review._id} className="bg-white p-6 rounded shadow mb-4">
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
