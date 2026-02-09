import { ServiceProvider } from "../models/serviceProvider.model.js";

export const createServiceProvider = async (req, res) => {
    try {
        const { serviceProviderName, serviceProviderEmail, serviceProviderPhone, serviceType } = req.body;
      
        const useRef=req.user._id;
        const existingProvider = await ServiceProvider.findOne({ userRef: useRef });
        if (existingProvider) {
            return res.status(400).json({ message: "User already has a service provider profile" });
        }
          const newServiceProvider = new ServiceProvider({
            serviceProviderName,
            serviceProviderEmail,
            serviceProviderPhone,
            serviceType,
            userRef: useRef,
            accountStatus: "inactive",
            adminApproved: false
        });
        await newServiceProvider.save();
        res.status(201).json({ message: "Service provider created successfully", serviceProvider: newServiceProvider});
        
    } catch (error) {
        console.error("Error creating service provider:", error);
        res.status(500).json({ message: "Error creating service provider", error });
    }
};

export const getServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find().populate("userRef", "fullName email role");
        res.status(200).json(serviceProviders);
    } catch (error) {
        console.error("Error fetching service providers:", error);
        res.status(500).json({ message: "Error fetching service providers", error });
    }
};