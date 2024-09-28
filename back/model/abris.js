const mongoose = require('mongoose');

const abris = mongoose.model('Abris_voyageurs_abris_bus', {
    LIB_LEVEL: String,
    geo_point_2d: {
        type: String,
        required: true,
    }
},'Abris_voyageurs_abris_bus');

module.exports = abris;
