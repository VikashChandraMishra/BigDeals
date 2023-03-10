const MOU = require("../models/MOU");
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

exports.saveMOU = async (req, res) => {
    try {
        const {
            text,
            boldWord,
            underlinedWord
        } = req.body;

        const existingMOUs = await MOU.find();

        if(existingMOUs.length == 0) {
            let textArray = [];
            let boldWordsArray = [];
            let underlinedWordsArray = [];

            textArray.push(text);
            boldWordsArray.push(boldWord);
            underlinedWordsArray.push(underlinedWord);

            const mou = await MOU.create({
                text: textArray,
                boldWords: boldWordsArray,
                underlinedWords: underlinedWordsArray
            });

            return res.json({
                success: true,
                message: "mou saved successfully",
                mou: mou
            });
        } 

        const mou = await MOU.findOne();

        mou.text.push(text);
        mou.boldWords.push(boldWord);
        mou.underlinedWords.push(underlinedWord);
        await mou.save();

        return res.json({
            success: true,
            message: "mou edited successfully",
            mou: mou
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}

exports.deleteMOU = async (req, res) => {
    try{
        await MOU.deleteOne();
        return res.json({success: true, message: "mou deleted successfully"});
    } catch(error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}

exports.deleteShopData = async (req, res) => {
    try{
        await Shop.findByIdAndDelete(req.header('_id'));
        return res.json({success: true, message: "shop data deleted successfully"});
    } catch(error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}

exports.editShopData = async (req, res) => {
    try{
        const {
            category,
            shopName,
            personName,
            primaryMobile,
            email,
            password,
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

        let shop = await Shop.findById(req.header('_id'));

        if(!shop) {
        return res.json({
            success: false,
            message: "partner does not exist"
        });

        }

        if(category) {
            shop.category = category;
        }

        if(shopName) {
            shop.shopName = shopName;
        }
        
        if(personName) {
            shop.personName = personName;
        }
        
        if(primaryMobile) {
            shop.primaryMobile = primaryMobile;
        }
        
        if(email) {
            shop.email = email;
        }

        if(password) {
            shop.password = password;
        }
        
        if(openingTime) {
            shop.openingTime = openingTime;
        }
        
        if(closingTime) {
            shop.closingTime = closingTime;
        }
        
        if(coupon) {
            shop.coupon = coupon;
        }
        
        if(status) {
            shop.status = status;
        }
        
        if(services) {
            shop.services = services;
        }
        
        if(state) {
            shop.state = state;
        }
        
        if(address) {
            shop.address = address;
        }
        
        if(district) {
            shop.district = district;
        }

        if(city) {
            shop.city = city;
        }

        if(locality) {
            shop.locality = locality;
        }

        if(pincode) {
            shop.pincode = pincode;
        }

        if(latitude) {
            shop.latitude = latitude;
        }

        if(longitude) {
            shop.longitude = longitude;
        }
        
        if(req.files['image']){
            shop.imagePath = 'uploads/' + req.files['image'][0].filename;
        }

        shop = await shop.save();

        return res.json({
            success: true,
            message: "shop data updated successfully"
        });
    } catch(error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error!");
    }
}
// exports.setMOU = async (req, res) => {
//     try {
//         await MOU.updateMany({}, { selected: false });
        
//         const mou = MOU.findOne({_id: req.header('_id')});
//         mou.selected = true;

//         return res.json({
//             success: true,
//             message: "mou set successfully"
//         });

//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).send("Internal Server Error!");
//     }
// }