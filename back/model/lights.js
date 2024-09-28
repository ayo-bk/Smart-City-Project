const mongoose = require('mongoose');

const lights = mongoose.model('Lights', {
    "Libellé de la famille de luminaire" : String,
    geo_point_2d : {
        type: String,
        required: true,
      }
}, 'Lights');

module.exports = lights;