'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TicketSchema = new Schema({
    type:{
        type: String,
        enum: ['Evaluation', 'Sélection']
    },
    contribution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution'
    },
    congres:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Congres'
    },
    envoyeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receveur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },    
    etat:{
        type: String,
        enum: ['En cours', 'Acceptée', 'Refusée']
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);