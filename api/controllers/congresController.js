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
    Congres.find({})
        .populate({path:'president',model:'User',select:'nom prenom'})
        .exec(function (err, congres) {
        if (err) {

            res.send(err);
        res.json('hiiiiiiiiiiiiiiii')
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







/*
exports.update_congres = function (req, res) {
  var congres = req.congres;
    var whitelistedFields = ['titre','specialite','theme','date_debut_evenement',
        'date_fin_evenement','date_debut_soumission','date_fin_soumission','date_debut_evaluation'
        ,'date_fin_evaluation','date_debut_selection','date_fin_selection','hotel'];

  if(congres) {
    // Update whitelisted fields only
    congres = _.extend(congres, _.pick(req.body, whitelistedFields));

  //  congres.updated = Date.now();

    congres.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: "Cannot update congres"
        });
      } else {
        res.json(congres);
      }
    });

  } else {
    res.status(401).send({
      message: 'congres not found'
    });
  }

};
*/


// { "titre": "Journées Nationales de Néonatologie", "specialite": "Pédiatrie", "theme": "Néonatologie", "hotel": { "nom": "LeRoyal", "ville": "Hammamet" }, "date_debut_evenement": "28 october 2017 08:00:00", "president": "5ae849b33782d51fe01290ba" }