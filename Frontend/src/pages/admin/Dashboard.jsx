import { getAllBookings } from "@/API/bookingApi";
import { getAllProviders } from "@/API/provider";

import { getAllReviews } from "@/API/reviewApi";
import { getAllServices } from "@/API/serviceApi";
import { useQuery } from "@tanstack/react-query";


const Dashboard = () => {
  const { data: providers } = useQuery({
    queryKey: ["providers"],
    queryFn: getAllProviders,
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card title="Providers" value={providers?.data?.length || 0} />
        <Card title="Services" value={services?.data?.length || 0} />
        <Card title="Bookings" value={bookings?.data?.length || 0} />
        <Card title="Reviews" value={reviews?.data?.length || 0} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl font-bold mt-4">{value}</p>
  </div>
);

export default Dashboard;
