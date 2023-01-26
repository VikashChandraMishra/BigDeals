const express = require('express');
const router = express.Router();
const outgoingDataController = require('../controllers/outgoingDataController.js');
const {
    fetchShopData
} = outgoingDataController;
const fetchShop = require('../middleware/fetchShop.js');

router.get('/fetch-shop-data', fetchShop, fetchShopData);


module.exports = router;