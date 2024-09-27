const mongoose = require('mongoose');

const toilets = mongoose.model('toilets', {
    Type : String,
    ACCES_PMR : String,
    geo_point_2d : {
        type: [Number],
        required: true,
      }
});

module.exports = toilets;