'use strict';

module.exports = function (app) {
    let userHandlers=require('../controllers/userController');
    let congresHandlers = require('../controllers/congresController');

    app.route('/auth/register')
        .post(userHandlers.register);

    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);

    app.route('/')
        .get(userHandlers.loginRequired,userHandlers.hello);

    app.route('/user')
        .get(userHandlers.loginRequired,userHandlers.adminRequired,userHandlers.list_all_users);

    app.route('/congres')
        .post(userHandlers.loginRequired,userHandlers.adminRequired,congresHandlers.create_congres)
        .get(userHandlers.loginRequired,userHandlers.adminRequired,congresHandlers.read_all_congres);

    app.route('/congres/:congresId')
        .get(userHandlers.loginRequired,userHandlers.adminRequired,congresHandlers.findById_congres,congresHandlers.read)
        .post(userHandlers.loginRequired,userHandlers.adminRequired,congresHandlers.update_congres);

    app.param('congresId', congresHandlers.findById_congres);



}