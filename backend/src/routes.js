const express = require('express');


const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


//const connection = require('./database/connection')

const routes =  express.Router();

//Definindo rota
//o express precisa de dois parametros
// estamos usando uma função como segundo parametro  (requisição e resposta)

//login
routes.post('/sessions',SessionController.create)

//listagem----------------------------------------
routes.get('/ongs',OngController.index)
//cadastro-----------------------------------------
routes.post('/ongs', OngController.create) 

//cadastra casos
routes.post('/incidents',IncidentController.create)
//lista casos
routes.get('/incidents',IncidentController.index)
//deleta
routes.delete('/incidents/:id',IncidentController.delete);
//pesquisa especifica
routes.get('/profile',ProfileController.index);



module.exports = routes; // exporta alguma variavel para dentro de um arquivo 

