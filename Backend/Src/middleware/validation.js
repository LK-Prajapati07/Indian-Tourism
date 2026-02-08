import { check, validationResult } from "express-validator";

export const validationRegister = [

    // Full Name Validation
    check("fullName")
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters long")
        .trim(),

    // Email Validation
    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),

    // Phone Validation
    check("phone")
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^\d{10}$/)
        .withMessage("Phone number must be exactly 10 digits"),

    // Country Validation
    check("country")
        .notEmpty()
        .withMessage("Country is required")
        .trim(),

    // Role Validation
    check("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn(["tourist", "admin", "serviceProvider"])
        .withMessage("Role must be tourist, admin, or serviceProvider"),

    // Password Validation
    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain at least one special character")
        .trim(),

    // Final Middleware to Handle Errors
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        next();
    }
];
