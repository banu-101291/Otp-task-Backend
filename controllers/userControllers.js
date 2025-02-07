// const users = require("../models/userSchema");
// const userotp = require("../models/userOtp");
// const nodemailer = require("nodemailer");


// // email config
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })


// exports.userregister = async (req, res) => {
//     const { fname, email, password } = req.body;

//     if (!fname || !email || !password) {
//         res.status(400).json({ error: "Please Enter All Input Data" })
//     }

//     try {
//         const presuer = await users.findOne({ email: email });

//         if (presuer) {
//             res.status(400).json({ error: "This User Already exist in our db" })
//         } else {
//             const userregister = new users({
//                 fname, email, password
//             });

//             // here password hasing

//             const storeData = await userregister.save();
//             res.status(200).json(storeData);
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error })
//     }

// };



// // user send otp
// exports.userOtpSend = async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         res.status(400).json({ error: "Please Enter Your Email" })
//     }


//     try {
//         const presuer = await users.findOne({ email: email });

//         if (presuer) {
//             const OTP = Math.floor(100000 + Math.random() * 900000);

//             const existEmail = await userotp.findOne({ email: email });


//             if (existEmail) {
//                 const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
//                     otp: OTP
//                 }, { new: true }
//                 );
//                 await updateData.save();

//                 const mailOptions = {
//                     from: process.env.EMAIL,
//                     to: email,
//                     subject: "Sending Eamil For Otp Validation",
//                     text: `OTP:- ${OTP}`
//                 }


//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log("error", error);
//                         res.status(400).json({ error: "email not send" })
//                     } else {
//                         console.log("Email sent", info.response);
//                         res.status(200).json({ message: "Email sent Successfully" })
//                     }
//                 })

//             } else {

//                 const saveOtpData = new userotp({
//                     email, otp: OTP
//                 });

//                 await saveOtpData.save();
//                 const mailOptions = {
//                     from: process.env.EMAIL,
//                     to: email,
//                     subject: "Sending Email For Otp Validation",
//                     text: `OTP:- ${OTP}`
//                 }

//                 transporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log("error", error);
//                         res.status(400).json({ error: "email not send" })
//                     } else {
//                         console.log("Email sent", info.response);
//                         res.status(200).json({ message: "Email sent Successfully" })
//                     }
//                 })
//             }
//         } else {
//             res.status(400).json({ error: "This User Not Exist In our Db" })
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error })
//     }
// };


// exports.userLogin = async(req,res)=>{
//     const {email,otp} = req.body;n

//     if(!otp || !email){
//         res.status(400).json({ error: "Please Enter Your OTP and email" })
//     }

//     try {
//         const otpverification = await userotp.findOne({email:email});

//         if(otpverification.otp === otp){
//             const preuser = await users.findOne({email:email});

//             // token generate
//             const token = await preuser.generateAuthtoken();
//            res.status(200).json({message:"User Login Succesfully Done",userToken:token});

//         }else{
//             res.status(400).json({error:"Invalid Otp"})
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error })
//     }
// }

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const users = require('../models/userSchema');
// const userotp = require('../models/userOtp');
// const nodemailer = require('nodemailer');

// // Email Config
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     },
// });

// // Send Email Function
// const sendEmail = async (to, subject, text) => {
//     const mailOptions = { from: process.env.EMAIL, to, subject, text };
//     return transporter.sendMail(mailOptions);
// };

// // Register User
// exports.userregister = async (req, res) => {
//     const { fname, email, password } = req.body;

//     if (!fname || !email || !password) {
//         return res.status(400).json({ error: 'Please provide all required fields' });
//     }

//     try {
//         const existingUser = await users.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new users({ fname, email, password: hashedPassword });
//         const savedUser = await newUser.save();

//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(500).json({ error: 'Registration failed' });
//     }
// };

// // Send OTP
// exports.userOtpSend = async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: 'Please provide an email' });
//     }

//     try {
//         const existingUser = await users.findOne({ email });
//         if (!existingUser) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         const OTP = Math.floor(100000 + Math.random() * 900000);

//         const existingOtp = await userotp.findOne({ email });
//         if (existingOtp) {
//             existingOtp.otp = OTP;
//             await existingOtp.save();
//         } else {
//             const newOtp = new userotp({ email, otp: OTP });
//             await newOtp.save();
//         }

//         await sendEmail(email, 'OTP Verification', `Your OTP is: ${OTP}`);
//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to send OTP' });
//     }
// };

// // Login User
// exports.userLogin = async (req, res) => {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//         return res.status(400).json({ error: 'Please provide email and OTP' });
//     }

//     try {
//         const otpVerification = await userotp.findOne({ email });
//         if (!otpVerification || otpVerification.otp !== otp) {
//             return res.status(400).json({ error: 'Invalid OTP' });
//         }

//         const user = await users.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         const token = await user.generateAuthtoken();
//         res.status(200).json({ message: 'Login successful', token, user });
//     } catch (error) {
//         res.status(500).json({ error: 'Login failed' });
//     }
// };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/userSchema");
const userotp = require("../models/userOtp");
const nodemailer = require("nodemailer");

// Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Utility function to send email
const sendEmail = async (to, subject, text) => {
    const mailOptions = { from: process.env.EMAIL, to, subject, text };
    return transporter.sendMail(mailOptions);
};

// User Registration
exports.userregister = async (req, res) => {
    const { fname, email, password } = req.body;

    if (!fname || !email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new users({ fname, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({ message: "Registration successful", user: savedUser });
    } catch (error) {
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
};

// Send OTP
exports.userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please provide an email" });
    }

    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

        const existingOtp = await userotp.findOne({ email });

        if (existingOtp) {
            existingOtp.otp = OTP;
            existingOtp.expiry = otpExpiry;
            await existingOtp.save();
        } else {
            const newOtp = new userotp({ email, otp: OTP, expiry: otpExpiry });
            await newOtp.save();
        }

        await sendEmail(email, "OTP Verification", `Your OTP is: ${OTP}. It expires in 5 minutes.`);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP", details: error.message });
    }
};

// Login User
exports.userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "Please provide email and OTP" });
    }

    try {
        const otpVerification = await userotp.findOne({ email });
        if (!otpVerification || otpVerification.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        // Check OTP expiry
        if (otpVerification.expiry < new Date()) {
            return res.status(400).json({ error: "OTP has expired" });
        }

        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message });
    }
};
