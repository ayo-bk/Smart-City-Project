const mongoose = require('mongoose');

const fire_hydratants = mongoose.model('Bouche_incendie', {
    object_name : String,
    Type : String,
    "Geo Point": {
        type: String,
        required: true,
      }
}, 'Bouche_incendie');

module.exports = fire_hydratants;