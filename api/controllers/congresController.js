'use strict';

let mongoose = require('mongoose'),
    Congres = mongoose.model('Congres');

exports.create_congres=function (req,res) {
    Congres.create(req.body,function (err,congres) {
        if (err) {
            res.send(err);
        }
        res.send(congres)
    });
};

exports.read_all_congres = function (req, res) {
    Congres.find({active:1})
        .populate({path:'president',model:'User',select:'nom prenom'})
        .exec(function (err, congres) {
        if (err) {

            res.send(err);

        }        res.json(congres);
    });
};
exports.read = function (req, res) {
    var congres = req.congres;

    res.json(congres)
};

exports.findById_congres=function (req, res, next, id) {
    Congres.findById(id).exec(function (err, congres) {
        if (err) {
            return next(err);
        } else if (!congres) {
            return res.status(404).send({
                message: 'No congres with that identifier has been found'
            });
        } else {
            req.congres = congres;
            next();

        }
    });

};

    exports.update_congres = function(req, res){
    var id = req.param('congresId')
        Congres.findOneAndUpdate({_id:id}, req.body, {new: true}, function(err, congres) {
            if (err)
                return res.send(err);
            ;
            res.json(congres);

        });
    };





