import { ServiceProvider } from "../models/serviceProvider.model.js";
import { User } from "../models/user.models.js";

export const applyProvider = async (req, res) => {
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
export const getMyProviderProfile = async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({
      userRef: req.user._id,
    }).populate("userRef", "fullName email");

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    res.json({
      success: true,
      data: provider,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const approveProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const { status } = req.body; // active | blocked

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Service provider not found" });
    }

    provider.accountStatus = status;
    provider.adminApproved = status === "active";
    await provider.save();

    await User.findByIdAndUpdate(provider.userRef, {
      accountStatus: status
    });

    res.status(200).json({
      success: true,
      message: `Service provider ${status}`,
      provider
    });

  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};

export const rejectProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await ServiceProvider.findById(id);
    if (!provider) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    provider.accountStatus = "rejected";
    await provider.save();

    await User.findByIdAndUpdate(provider.userRef, {
      accountStatus: "blocked",
    });

    res.json({
      success: true,
      message: "Provider rejected",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
