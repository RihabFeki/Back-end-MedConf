'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SeanceSchema = new Schema({
    ticket_selection:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    date_debut: {
        type: Date
    },
    date_fin: {
        type: Date
    }
});

module.exports = mongoose.model('Seance', SeanceSchema);