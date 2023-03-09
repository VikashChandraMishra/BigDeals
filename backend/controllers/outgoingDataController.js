const MOU = require("../models/MOU");
const Shop = require("../models/Shop");

exports.fetchShopData = async (req, res) => {
    try {
        const shop = await Shop.findById(req.id);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "shop is not registered"
            });
        }

        return res.status(200).json({
            success: true,
            shop: shop,
            message: "shop data fetched successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.fetchShopDataForAdmin = async (req, res) => {
    try {

        const shop = await Shop.findById(req.header('_id'));

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "shop is not registered"
            });
        }

        return res.status(200).json({
            success: true,
            shop: shop,
            message: "shop data fetched successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.fetchAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();

        if (!shops) {
            return res.status(404).json({
                success: false,
                message: "no shop found"
            });
        }

        return res.status(200).json({
            success: true,
            shops: shops,
            message: "shops' data fetched successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

// exports.fetchAllMOUs = async (req, res) => {
//     try {
//         const mous = await MOU.find();

//         if(!mous) {
//             return res.status(404).json({
//                 success: false,
//                 message: "no mou found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             mous: mous,
//             message: "mous' data fetched successfully"
//         });

//     } catch(error) {
//         console.log(error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

// exports.fetchSelectedMOU = async (req, res) => {
//     try {
//         const mou = await MOU.findOne({selected: true});

//         if(!mou) {
//             return res.status(404).json({
//                 success: false,
//                 message: "no mou selected"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             mou: mou,
//             message: "fetched selected mou successfully"
//         });

//     } catch(error) {
//         console.log(error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

exports.fetchMOU = async (req, res) => {
    try {
        const mou = await MOU.findOne();

        if (!mou) {
            return res.status(404).json({
                success: false,
                message: "no mou found"
            });
        }

        return res.status(200).json({
            success: true,
            mou: mou,
            message: "mou fetched successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}