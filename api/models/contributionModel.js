'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContributionSchema = new Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    theme: {
        type: String,
        required: true,
        trim: true
    },
    contenu: [{
        cle: {
            type: String
        },
        valeur: {
            type: String
        }
    }],
    date_publication: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contribution', ContributionSchema);