const express = require('express');
const router = express.Router();
const incomingDataController = require('../controllers/incomingDataController.js');
const {
    register,
    saveShopData,
    saveSignature
} = incomingDataController;
const multer = require('multer');
const fs = require('fs');
const fetchShop = require('../middleware/fetchShop.js');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        var num;
        fs.readdir('uploads/', (err, files) => {
            num = files.length + 1;
            cb(null, 'image' + String(num) + '.' + file.mimetype.split('/')[1])
        });
    },
});
const upload = multer({ storage: storage });
const pUpload = upload.fields([{ name: 'image', maxCount: 1 }]);

router.post('/register-shop', register);

router.post('/save-shop-data', fetchShop, pUpload, saveShopData);

router.post('/register-signature', fetchShop, pUpload, saveSignature);

module.exports = router;