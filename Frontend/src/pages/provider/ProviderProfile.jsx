import { getMyProviderProfile } from "@/API/provider";
import { useQuery } from "@tanstack/react-query";


const ProviderProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["providerProfile"],
    queryFn: getMyProviderProfile,
  });

  if (isLoading) return <div>Loading...</div>;

  const provider = data?.data;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Provider Profile</h1>

      <div className="bg-white p-4 shadow rounded">
        <p><strong>Name:</strong> {provider?.serviceProviderName}</p>
        <p><strong>Email:</strong> {provider?.userRef?.email}</p>
        <p><strong>Service Type:</strong> {provider?.serviceType}</p>
        <p><strong>Status:</strong> {provider?.accountStatus}</p>
      </div>
    </div>
  );
};

export default ProviderProfile;
