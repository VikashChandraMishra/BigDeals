const Shop = require("../models/Shop");

exports.register = async (req, res) => {
    try {

        const {
            category,
            shopName,
            personName,
            primaryMobile,
            alternateMobile,
            email,
            openingTime,
            closingTime,
            coupon,
            status,
            password,
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
            category: category,
            shopName: shopName,
            personName: personName,
            primaryMobile: primaryMobile,
            alternateMobile: alternateMobile,
            email: email,
            openingTime: openingTime,
            closingTime: closingTime,
            coupon: coupon,
            status: status,
            password: password,
            imagePath: 'uploads/' + req.files['image'][0].filename,
            services: services,
            state: state,
            address: address,
            district: district,
            city: city,
            locality: locality,
            pincode: pincode,
            latitude: latitude,
            longitude: longitude
        });

        return res.json({
            success: true,
            message: "shop successfully registered"
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