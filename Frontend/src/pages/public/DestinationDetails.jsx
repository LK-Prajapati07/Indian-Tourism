import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetDestinationById } from "@/API/destinationApi";


const DestinationDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => GetDestinationById(id),
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10">Error loading data.</div>;

  const destination = data?.data;

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        {destination.destinationName}
      </h1>

      <img
        src={destination.images?.[0]}
        alt={destination.destinationName}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <p className="text-gray-700 mb-4">{destination.description}</p>

      <p className="font-semibold">
        Best Time to Visit: {destination.bestTimeToVisit}
      </p>
    </div>
  );
};

export default DestinationDetails;
