'use strict';

let mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
bcrypt=require('bcrypt'),
User=mongoose.model('User');

exports.list_all_users = function (req, res) {
    User.find({},'nom prenom email', function (err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

exports.register = function (req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
};

exports.hello = function (req,res) {
    res.json("Hello there");
}

exports.sign_in = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({ token: jwt.sign({ _id: user._id, admin: user.admin }, 'MedConf'), email: user.email, nom: user.nom, prenom: user.prenom });
            }
        }
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.adminRequired = function (req, res, next) {
    if (req.user.admin==true) {
        next();
    } else {
        return res.status(401).json({ message: 'You must have admin privileges!' });
    }
};