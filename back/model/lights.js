const mongoose = require('mongoose');

const lights = mongoose.model('lights', {
    "Libellé de la famille de luminaire" : String,
    geo_point_2d : {
        type: [Number],
        required: true,
      }
});

module.exports = lights;