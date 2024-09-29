const mongoose = require('mongoose');

const signalement = mongoose.model('Signalement', {
    Type: String,
    Description: String,
}, 'Signalement');

module.exports = signalement;
