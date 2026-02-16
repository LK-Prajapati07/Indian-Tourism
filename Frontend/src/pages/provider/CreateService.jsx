import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createService } from "@/API/serviceApi";

const CreateService = () => {
  const [form, setForm] = useState({
    serviceName: "",
    price: "",
    Availability: "rooms",
    capacity: "",
    mediaUrl: "",
  });

  const mutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast.success("Service Created Successfully");
    },
    onError: () => {
      toast.error("Failed to create service");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Service</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Service Name"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, serviceName: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Capacity"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, capacity: e.target.value })
          }
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateService;
