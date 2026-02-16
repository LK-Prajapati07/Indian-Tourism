import { getBooking } from "@/API/bookingApi";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";

const MyBookings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myBookings"],
    queryFn: getBooking,
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10">Error loading bookings</div>;

  const bookings = data?.data || [];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                {booking.serviceRef?.serviceName}
              </h2>

              <p>
                Travel:{" "}
                {new Date(booking.travelDates.startDate).toDateString()} -{" "}
                {new Date(booking.travelDates.endDate).toDateString()}
              </p>

              <p>Status: {booking.bookingStatus}</p>

              <div className="mt-4 flex gap-4">
                <Link to={`/bookings/${booking._id}`} className="text-blue-600">
                  View Details
                </Link>

                {booking.bookingStatus === "confirmed" && (
                  <Link
                    to={`/review/${booking._id}`}
                    className="text-green-600"
                  >
                    Write Review
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
