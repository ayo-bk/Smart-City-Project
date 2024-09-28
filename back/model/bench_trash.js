const mongoose = require('mongoose');

const bench_trash = mongoose.model('Bancs_poubelles', {
    OBJECTID : Number,
    LIB_LEVEL : String,
    geo_point_2d: {
        type: String,
        required: true,
    }
}, 'Bancs_poubelles');

module.exports = bench_trash;