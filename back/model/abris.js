const mongoose = require('mongoose');

const abris = mongoose.model('abris', {
    LIB_LEVEL : String,
    geo_point_2d: {
        type: [Number],
        required: true,
      }
});

module.exports = abris;