import { getAllServices } from "@/API/serviceApi";


const Services = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  if (isLoading) return <div className="text-center py-10">Loading services...</div>;
  if (isError) return <div className="text-center py-10">Failed to load services.</div>;

  const services = data?.data || [];

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Services</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{service.serviceName}</h2>
            <p className="text-gray-500">₹ {service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
