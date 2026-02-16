import { approveProvider, getAllProviders, rejectProvider } from "@/API/provider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Providers = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: getAllProviders,
  });

  const approveMutation = useMutation({
    mutationFn: approveProvider,
    onSuccess: () => queryClient.invalidateQueries(["providers"]),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectProvider,
    onSuccess: () => queryClient.invalidateQueries(["providers"]),
  });

  if (isLoading) return <div>Loading...</div>;

  const providers = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Service Providers</h1>

      <div className="space-y-4">
        {providers.map((provider) => (
          <div key={provider._id} className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold">{provider.serviceProviderName}</h2>
            <p>{provider.serviceType}</p>
            <p>Status: {provider.adminApproved ? "Approved" : "Pending"}</p>

            {!provider.adminApproved && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => approveMutation.mutate(provider._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectMutation.mutate(provider._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
