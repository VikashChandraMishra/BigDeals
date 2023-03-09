const express = require('express');
const router = express.Router();
const outgoingDataController = require('../controllers/outgoingDataController.js');
const {
    fetchShopData,
    fetchAllShops,
    fetchShopDataForAdmin,
    fetchMOU
} = outgoingDataController;
const fetchShop = require('../middleware/fetchShop.js');

router.get('/fetch-shop-data', fetchShop, fetchShopData);

router.get('/fetch-shop-data-for-admin', fetchShopDataForAdmin);

router.get('/fetch-all-shops', fetchAllShops);

router.get('/fetch-mou', fetchMOU);

module.exports = router;