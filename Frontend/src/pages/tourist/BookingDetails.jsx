import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/API/bookingApi";


const BookingDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10">Error loading booking</div>;

  const booking = data?.data;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Booking Details</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <p><strong>Service:</strong> {booking.serviceRef?.serviceName}</p>
        <p><strong>Destination:</strong> {booking.destinationRef?.destinationName}</p>

        <p>
          <strong>Travel Dates:</strong>{" "}
          {new Date(booking.travelDates.startDate).toDateString()} -{" "}
          {new Date(booking.travelDates.endDate).toDateString()}
        </p>

        <p><strong>Total Price:</strong> ₹ {booking.totalPrice}</p>
        <p><strong>Status:</strong> {booking.bookingStatus}</p>
      </div>
    </div>
  );
};

export default BookingDetails;
