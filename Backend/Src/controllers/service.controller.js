import { Service } from "../models/service.model.js";

export const createService = async (req, res) => {
    try {
        const { serviceName,  price, Availability, capacity, mediaUrl ,destinationId} = req.body;
        const providerId = req.user._id;

        const newService = new Service({
            serviceName,
            destinationRef: destinationId,
            providerRef: providerId,
            price,
            Availability,
            capacity,
            mediaUrl,
            serviceStatus: "inactive",
        });
        await newService.save();
        res.status(201).json({ message: "Service created successfully", service: newService,success:true });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ error: "An error occurred while creating the service." });

    }
}
export const getServices = async (req, res) => {
    try {
        const services = await Service.find({serviceStatus:"active"})
            .populate("destinationRef", "destinationName")
            .populate("providerRef", "serviceProviderName");
        res.status(200).json({
            success:true,
            services
        });
    }
    catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ error: "An error occurred while fetching services." });
    }
}
export const getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service
            .findById(serviceId)
                .populate("destinationRef", "destinationName")
                .populate("providerRef", "serviceProviderName");
        if (!service || service.serviceStatus !== "active") {
            return res.status(404).json({ error: "Service not found or inactive.", success: false });
        }
        res.status(200).json({ service, success: true });
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ error: "An error occurred while fetching the service." });
    }
}
export const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const { serviceName, price, Availability, capacity, mediaUrl } = req.body;
        const service = await Service
            .findByIdAndUpdate(serviceId, { serviceName, price, Availability, capacity, mediaUrl }, { new: true })
            .populate("destinationRef", "destinationName")
            .populate("providerRef", "serviceProviderName");
        if (!service) {
            return res.status(404).json({ error: "Service not found." });
        }
        res.status(200).json({ message: "Service updated successfully", service });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ error: "An error occurred while updating the service." });
    }
}
export const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findByIdAndDelete(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service not found." });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ error: "An error occurred while deleting the service." });
    }
}
export const updataServiceStatus=async (req,res)=>{
    try {
        const {serviceId}=req.params
        const {status}=req.body
        if(!["active","inactive"].includes(status)){
            return res.status(400).json({
                message:"invalid status "
            })
        }
        const service=await Service.findByIdAndUpdate(
            serviceId,
            {
                serviceStatus:status
            },
            {new:true}
        )
        if(!service){
            return res.status(404).json({
                message:"Service not found"
            })
        }
        res.status(200).json({
            success:true,
            message:`Service ${status==="active"?"approvad":"disabled"}`,
            service
        })

    } catch (error) {
        console.log("Error Createing Update ServiceStatus")
        res.status(500).json({
            message:"Service Approval Failed"
        })
    }
}
