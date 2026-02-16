import { getAllBookings } from "@/API/bookingApi";
import { useQuery } from "@tanstack/react-query";


const Bookings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  if (isLoading) return <div>Loading...</div>;

  const bookings = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white p-6 rounded shadow mb-4">
          <p>User: {booking.userRef?.fullName}</p>
          <p>Service: {booking.serviceRef?.serviceName}</p>
          <p>Status: {booking.bookingStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
