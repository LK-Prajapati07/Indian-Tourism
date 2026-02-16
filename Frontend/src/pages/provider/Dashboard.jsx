import { useQuery } from "@tanstack/react-query";
import { getMyServices } from "@/API/serviceApi";
import { getMyProviderProfile } from "@/API/provider";

const Dashboard = () => {
  const { data: profile } = useQuery({
    queryKey: ["providerProfile"],
    queryFn: getMyProviderProfile,
  });

  const { data: services } = useQuery({
    queryKey: ["myServices"],
    queryFn: getMyServices,
  });

  const provider = profile?.data;
  const serviceList = services?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium">Total Services</h2>
          <p className="text-3xl font-bold mt-2">{serviceList.length}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium">Account Status</h2>
          <p className="text-xl mt-2">{provider?.accountStatus}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-medium">Service Type</h2>
          <p className="text-xl mt-2">{provider?.serviceType}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
