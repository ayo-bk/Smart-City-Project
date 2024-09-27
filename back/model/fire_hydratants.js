const mongoose = require('mongoose');

const fire_hydratants = mongoose.model('fire_hydratants', {
    object_name : String,
    Type : String,
    "Geo Point": {
        type: [Number],
        required: true,
      }
});

module.exports = fire_hydratants;