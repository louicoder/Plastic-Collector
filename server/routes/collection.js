const Router = require('express').Router();
const { collection: COLL } = require('../controllers');

Router.post('/create', COLL.createCollection);
Router.get('/all', COLL.getAllCollections);
Router.get('/district/:district', COLL.getCollectionsByDistrict);
Router.get('/dropper/:dropperId', COLL.getDropperCollections);
Router.get('/attendant/:attendantId', COLL.getAttendantCollections);
Router.get('/totals', COLL.getCollectionTotals);

module.exports = Router;
