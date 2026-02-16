import { getAllDestinations } from "@/API/destinationApi";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";

const Destinations = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["destinations"],
    queryFn: getAllDestinations,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading destinations...</div>;
  }

  if (isError) {
    return <div className="text-center py-10">Failed to load destinations.</div>;
  }

  const destinations = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore Destinations
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest._id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={dest.images?.[0]}
              alt={dest.destinationName}
              className="h-52 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {dest.destinationName}
              </h2>
              <p className="text-gray-500">{dest.state}</p>

              <Link
                to={`/destinations/${dest._id}`}
                className="inline-block mt-4 text-blue-600 font-semibold"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
