import { Destination } from "../models/destination.js";
import cloudinary from "../config/cloudinary.js";
export const createDestination = async (req, res) => {
    try {
        const { destinationName, state, city, category, description, bestTimeToVisit, } = req.body;
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        const images = req.file;
    
        let imageUri = "";
        const base64 = `data:${images.mimetype};base64,${images.buffer.toString(
            "base64"
        )}`;
        const uploadedImage = await cloudinary.uploader.upload(base64, {
            folder: "destinations",
        })
        imageUri = uploadedImage.secure_url;
        const newDestination = new Destination({
            destinationName,
            state,
            city,
            category,
            description,
            bestTimeToVisit,
            images: [imageUri],
            status: "active"

        });
        await newDestination.save();
        return res.status(201).json({
            success: true,
            message: "Destination created successfully",
            data: newDestination
        });

    } catch (error) {
        console.error("Error creating destination:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the destination"
        });
    }

}
export const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find({status: "active"});
        return res.status(200).json({
            success: true,
            message: "Destinations retrieved successfully",
            data: destinations
        });
    
    } catch (error) {
        console.error("Error retrieving destinations:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving destinations"
        });
    }   
}

export const getDestinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findById(id);
        if (!destination || destination.status !== "active") {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Destination retrieved successfully",
            data: destination
        });
    } catch (error) {
        console.error("Error retrieving destination:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the destination"
        });
    }
}
export const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const { destinationName, state, city, category, description, bestTimeToVisit } = req.body;
        const images = req.file;
        let imageUri = "";
        if (images) {
            const base64 = `data:${images.mimetype};base64,${images.buffer.toString(
                "base64"
            )}`;
            const uploadedImage = await cloudinary.uploader.upload(base64, {
                folder: "destinations",
            })
            imageUri = uploadedImage.secure_url;
        }
        const updatedDestination = await Destination.findByIdAndUpdate(
            id,
            {
                destinationName,
                state,
                city,
                category,
                description,
                bestTimeToVisit,
                ...(imageUri && { images: [imageUri] })
            },
            { new: true }
        );
        if (!updatedDestination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            data: updatedDestination
        });
    }
    catch (error) {
        console.error("Error updating destination:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the destination"
        });
    }
}

export const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDestination = await Destination.findByIdAndDelete(id);
        if (!deletedDestination) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Destination deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting destination:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the destination"
        });
    }
} 