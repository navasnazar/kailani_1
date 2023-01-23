const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const ServiceDB = mongoose.model('Service', {
    title: { type: String, required: true},
    service: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    adult:{type: Number},
    child:{type: Number},
    rooms:{type: Number},
    booking:[{type:Date}],
    img1_url:{type: String},
    img2_url:{type: String},
    img3_url:{type: String},
    img4_url:{type: String},
});             


module.exports = ServiceDB