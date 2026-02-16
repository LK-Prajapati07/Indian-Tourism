import { deleteService, getMyServices} from "@/API/serviceApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

const MyServices = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["myServices"],
    queryFn: getMyServices,
  });

  const mutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      toast.success("Service Deleted");
      queryClient.invalidateQueries(["myServices"]);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const services = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Services</h1>

      {services.map((service) => (
        <div key={service._id} className="p-4 bg-white shadow mb-3 rounded">
          <h2 className="font-semibold">{service.serviceName}</h2>
          <p>Price: ₹{service.price}</p>
          <button
            onClick={() => mutation.mutate(service._id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyServices;
