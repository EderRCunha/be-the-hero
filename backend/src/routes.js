const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get ('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/incident', IncidentController.list);
routes.post('/incident', IncidentController.create);
routes.delete('/incident/:id', IncidentController.delete);

routes.get('/profile', ProfileController.listForOng);

routes.post('/session', SessionController.create);

module.exports = routes;