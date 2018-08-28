'use strict';

let mongoose = require('mongoose'),
    Contrubtions = mongoose.model('Contribution');

exports.read_all_soumissions = function (req, res) {
    var id = req.param('congresId')
    Contrubtions.find({id_congres:id})
        .populate({path:'id_congres',model:'Congres',select:'titre'}).populate({path:'id_user',model:'User',select:'nom prenom'})
        .exec(function (err, contributions) {

            if (err) {

                res.send(err);

            } res.json(contributions);




        });
};