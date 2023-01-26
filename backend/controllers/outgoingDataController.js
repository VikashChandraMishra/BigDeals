const Shop = require("../models/Shop");

exports.fetchShopData = async (req, res) => {
    try {
        const shop = await Shop.findById(req.id);

        if(!shop) {
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

    } catch(error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}