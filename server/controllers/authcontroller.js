"use strict";
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

require("dotenv").config();

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    try {
        const user = await userModel.findOne({ email });
        console.log(user);

        // Check if the user exists and the password matches
        if (user && user.password === password) {
            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
            const userObj = user.toObject()
            console.log("user object", userObj);
            delete userObj.password
            res.status(200).json({ user: userObj, token });
        } else {
            res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = { login };










// "use strict";
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");


// require("dotenv").config()

// const login = async (req, res) => {
//     const { email, password } = req.body
//     console.log(email)
//     console.log(password)
//     try {
//         const user = await userModel.findOne({ email, password })
//         console.log(user)
//         if (user) {
//             const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: "3s" })
//             res.status(200).json({ user, token })
//         }
//         else {
//             res.status(401).json({ error: "Invalid Credentials" })
//         }
//     }
//     catch (err) {
//         res.status(500).json({ error: "Server Error" })
//     }
// }

// module.exports = { login }