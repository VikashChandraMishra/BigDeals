const jwt = require('jsonwebtoken');
const Shop = require("../models/Shop.js");
const {
    SECRET_KEY
} = process.env;

exports.login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        const existingShop = await Shop.findOne({email: email, password: password});


        if(!existingShop) {
            return res.status(200).json({
                success: false,
                message: "shop not registered"
            });
        }

        const authToken = jwt.sign(existingShop.id, SECRET_KEY);
        
        return res.status(200).json({
            success: true,
            authToken: authToken,
            message: "successfully logged in"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error!");
    }
}