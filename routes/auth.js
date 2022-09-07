const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const {JWT_SECRET} = require('../config/keys');


// ROUTE : 1 
// Create a User using: POST "/api/auth/createuser". No Login required
router.post('/createuser', [
    body('name', "Enter A Valir Name").isLength({ min: 3 }),
    body('email', "Enter A Valir Email").isEmail(),
    body('password', "Enter A Password >= 5").isLength({ min: 5 }),

], async (req, res) => {

    // If Error Return bad Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let success = false;
        return res.status(400).json({ success, errors: errors.array() })
    }
    try {
        // Check Wheather the user with this email Exist Already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let success = false;
            return res.status(400).json({ success, Error: "A User With This Email Already Exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })


        const data = {
            user: {
                id: user.id
            }
        }


        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);

        success = true;
        // res.json(user)
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured!!!")
    }
})


// ROUTE: 2
// Authenticate a User using: POST "/api/auth/login". No Login required
router.post('/login', [
    body('email', "Enter A Valir Email").isEmail(),
    body('password', "Password Can`t be Blank").exists(),

], async (req, res) => {
    // If Error Return bad Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let success = false;
        return res.status(400).json({ success, errors: errors.array() })
    }


    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            let success = false;
            return res.status(400).json({ success, error: "Please Put The Correct Details" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            let success = false;

            return res.status(400).json({ success, error: "Please Put The Correct Details" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        let success = true;
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        let success = false;

        res.status(500).send("Internal Server Error!!!")
    }
})




// ROUTE: 3
// Get LoggedIn User using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, [
], async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!!!")
    }
})

module.exports = router