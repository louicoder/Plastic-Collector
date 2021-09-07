const Router = require('express').Router();
const { account } = require('../controllers');

Router.post('/register', account.register);
Router.post('/update/:uid', account.updateAccount);
Router.post('/login', account.login);
Router.get('/district/:district', account.getCollectorsByDistrict);
Router.get('/all', account.getAllCollectors);
Router.get('/:uid', account.getAccount);

module.exports = Router;
