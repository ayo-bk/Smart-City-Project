const mongoose = require('mongoose');

const bench_trash = mongoose.model('bench_trash', {
    OBJECTID : Number,
    LIB_LEVEL : String,
    geo_point_2d: {
        type: [Number],
        required: true,
      }
});

module.exports = bench_trash;