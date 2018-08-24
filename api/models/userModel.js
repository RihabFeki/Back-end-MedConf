'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt=require('bcrypt');

let UserSchema = new Schema({
    prenom: {
        type: String,
        required: true,
        trim: true
    },
    nom: {
        type: String,
        required: true,
        trim: true
    },
    cin: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    telephone: {
        type: Number,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    specialite: {
        type: String,
        required: true,
        trim: true
    },
    adresse: {
        pays: {
            type: String,
            required: true,
            trim: true
        },
        ville: {
            type: String,
            required: true,
            trim: true
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    contributions:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Contribution'
    },
    requetes:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ticket'
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('User', UserSchema);