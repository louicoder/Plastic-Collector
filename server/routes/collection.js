const Router = require('express').Router();
const { collection: COLL } = require('../controllers');

Router.post('/register', COLL.createCollection);
Router.get('/all', COLL.getAllCollections);
Router.get('/district/:district', COLL.getCollectionsByDistrict);
Router.get('/dropper/:dropperId', COLL.getCollectionsByDistrict);
Router.get('/attendant/:attendantId', COLL.getCollectionsByDistrict);

module.exports = Router;
