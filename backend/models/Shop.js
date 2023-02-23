const mongoose = require('mongoose');
const { Schema } = mongoose;

const shopSchema = new Schema({
    category: { type: String },
    shopName: { type: String },
    personName: { type: String },
    primaryMobile: { type: Number, unique: true },
    alternateMobile: { type: Number },
    email: { type: String, unique: true },
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
    partnerName: {type: String},
    partnerDesignation: {type: String},
    date: {type: String}
})

module.exports = mongoose.model('shop', shopSchema);