const Router = require('express').Router();
const { regcodes: RC } = require('../controllers');

Router.post('/create', RC.createCode);
Router.get('/verify/:code', RC.verifyCode);

module.exports = Router;
