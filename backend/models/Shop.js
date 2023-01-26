const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopSchema = new Schema({
    category: { type: String, required: true },
    shopName: { type: String, required: true },
    personName: { type: String, required: true },
    primaryMobile: { type: Number, required: true, unique: true },
    alternateMobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    openingTime: { type: String },
    closingTime: { type: String },
    coupon: { type: String },
    status: { type: String },
    password: { type: String },
    imagePath: { type: String },
    signature: { type: String },
    services: { type: String },
    state: {type: String},
    address: {type: String},
    district: {type: String},
    city: {type: String},
    locality: {type: String},
    pincode: {type: String},
    latitude: {type: String},
    longitude: {type: String},
})

module.exports = mongoose.model('shop', shopSchema);