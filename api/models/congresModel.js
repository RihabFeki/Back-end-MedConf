'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CongresSchema = new Schema({
    titre: {
        type: String,
        required: true,
        trim: true
    },
    specialite: {
        type: String,
       // required: true,
        trim: true
    },
    theme: {
        type: String,
        required: true,
        trim: true
    },
    date_debut_evenement: {
        type: Date
    },
    date_fin_evenement: {
        type: Date
    },
    date_debut_soumission: {
        type: Date,
        default: Date.now
    },
    date_fin_soumission: {
        type: Date
    },
    date_debut_evaluation: {
        type: Date
    },
    date_fin_evaluation: {
        type: Date
    },
    date_debut_selection: {
        type: Date
    },
    date_fin_selection: {
        type: Date
    },
    hotel: {
        nom: {
            type: String,
            required: true,
            trim: true
        },
        ville: {
            type: String,
            required: true,
            trim: true
        }
    },
    active : {
        type : Number
    },
    president:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comite_scientifique:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    comite_organisation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seances: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Seance'
    }
});

module.exports = mongoose.model('Congres', CongresSchema);