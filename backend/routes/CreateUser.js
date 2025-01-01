const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret ="sjkdhfjsjdlqjdoJKJHDKJFBJDHCBKAJNDjnskjdnckjkjbv"
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash( req.body.password , salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })

            return res.json({ success: true });
        } catch (error) {
            console.log(error)
            return res.json({ success: false });
        }
    })
router.post("/loginuser", [
    body('email').isEmail()],
    async (req, res) => {

        let email = req.body.email

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" })
            }
            let comparePass = await bcrypt.compare( req.body.password , userdata.password)
            if (!comparePass) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" })
            }
            data={
                name:{
                    id:userdata.id
                }
            }
            const authToken = jwt.sign( data , jwtSecret)
            return res.json({ success: true , authToken:authToken })

        } catch (error) {
            console.log(error)
            return res.json({ success: false });
        }
    })

module.exports = router;

