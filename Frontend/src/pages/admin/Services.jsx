import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllServices, updataServiceStatus } from "@/API/serviceApi";

const Services = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({ 
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  const approveMutation = useMutation({
    mutationFn: updataServiceStatus,
    onSuccess: () => queryClient.invalidateQueries(["services"]),
  });

  if (isLoading) return <div>Loading...</div>;

  const services = data?.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Services</h1>

      {services.map((service) => (
        <div key={service._id} className="bg-white p-6 rounded shadow mb-4">
          <h2>{service.serviceName}</h2>
          <p>Status: {service.serviceStatus}</p>

          {service.serviceStatus === "inactive" && (
            <button
              onClick={() => approveMutation.mutate(service._id)}
              className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            >
              Activate
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Services;
