const Router = require('express').Router();
const { dropper: DR } = require('../controllers');

Router.post('/register', DR.register);
Router.get('/all', DR.getAllDroppers);
Router.get('/district/:district', DR.getDroppersByDistrict);
// Router.get('/register', DR.register);

module.exports = Router;
