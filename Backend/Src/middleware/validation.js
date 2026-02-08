import { check, validationResult } from "express-validator";


export const Register = [

    
    check('fullName')
        .notEmpty()
        .withMessage('Full name is required')
        

        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long'),
        


    
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        

        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email format'),
        


    
    check('phone')
        .notEmpty()
        

        .matches(/^\d{10}$/)
        .withMessage('Phone number must be 10 digits'),
        


           
    check('country')
        .notEmpty()
        .withMessage('Country is required'),
            


  
    check('role')
        .notEmpty()
        .withMessage('Role is required')

        .isIn(['tourist', 'admin', 'serviceProvider'])
        .withMessage('Invalid role, must be tourist, admin, or serviceProvider'),
       


    
    check('password')
        .isLength({ min: 8 })
        .withMessage("Password should be at least 8 characters long")
        

        .matches(/[A-Z]/)
        .withMessage("Password must contain one uppercase letter")
        

        .matches(/[a-z]/)
        .withMessage("Password must contain one lowercase letter")

        .matches(/[0-9]/)
        .withMessage("Password must contain one number")

        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain one special character")
        

        .trim(),
        



    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors,"validation errors");

        if (!errors.isEmpty()) {
           
            return res.status(400).json({ errors: errors.array() });
        }

        next();
       
    }
];
