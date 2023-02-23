const Shop = require("../models/Shop");

exports.register = async (req, res) => {
    try {

        const {
            personName,
            primaryMobile,
            email,
            password,
        } = req.body;

        const existingShop = await Shop.findOne({
            $or: [{ primaryMobile: primaryMobile }, { email: email }]
        });

        if (existingShop) {
            return res.json({
                success: false,
                message: "shop already registered"
            });

        }

        await Shop.create({
            personName: personName,
            primaryMobile: primaryMobile,
            email: email,
            password: password,
        });

        return res.json({
            success: true,
            message: "successfully registered"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}

exports.saveShopData = async (req, res) => {
    try {
        const {
            category,
            shopName,
            openingTime,
            closingTime,
            coupon,
            status,
            services,
            state,
            address,
            district,
            city,
            locality,
            pincode,
            latitude,
            longitude
        } = req.body;


        const shop = await Shop.findById(req.id);

        shop.category = category;
        shop.shopName = shopName;
        shop.openingTime = openingTime;
        shop.closingTime = closingTime;
        shop.coupon = coupon;
        shop.status = status;
        shop.imagePath = 'uploads/' + req.files['image'][0].filename;
        shop.services = services;
        shop.state = state;
        shop.address = address;
        shop.district = district;
        shop.city = city;
        shop.locality = locality;
        shop.pincode = pincode;
        shop.latitude = latitude;
        shop.longitude = longitude;

        await shop.save();

        return res.json({
            success: true,
            message: "shop details successfully saved"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}

exports.saveSignature = async (req, res) => {
    try {

        const {
            signature,
            data
        } = req.body;

        const {
            name,
            designation,
            date
        } = data;

        const shop = await Shop.findById(req.id);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "shop is not registered"
            });
        }

        shop.signature = signature;
        shop.partnerName = name;
        shop.partnerDesignation = designation;
        shop.date = date;
        await shop.save();

        return res.status(200).json({
            success: true,
            message: "signature saved successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}