const mongoose = require('mongoose');

const toilets = mongoose.model('Toilettes', {
    Type : String,
    ACCES_PMR : String,
    geo_point_2d : {
        type: String,
        required: true,
      }
}, 'Toilettes');

module.exports = toilets;