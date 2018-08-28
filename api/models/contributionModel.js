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
    description: {
        type: String,
        trim: true
    },
    etat: {
        type: Number
    },
    /*  contenu: [{
          cle: {
              type: String
          },
          valeur: {
              type: String
          }
      }],*/
    date_publication: {
        type: Date,
        default: Date.now
    },

    id_comite_scientifique: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    id_congres: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Congres'
    }
});

module.exports = mongoose.model('Contribution', ContributionSchema);