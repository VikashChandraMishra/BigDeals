const mongoose = require('mongoose');
const { Schema } = mongoose;

const mouSchema = new Schema({
    text: {
        type: [String]
    },
    boldWords: {
        type: [String]
    },
    underlinedWords: {
        type: [String]
    }
    // selected: {
    //     type: Boolean,
    //     default: false
    // }
})

module.exports = mongoose.model('mou', mouSchema);