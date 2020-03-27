const express = require('express'); // variavel express esta recebendo o modo express, importação
const cors= require('cors');
const routes = require('./routes') // importou as rotas ( precisamos  utilizar o "./" para saber que é um arquivo e não um pacote)


const app = express(); // armazena a aplicação, intancia a aplicação
app.use(cors());
app.use(express.json()); // informa que utilizaremos json nas requisiçoes, e para que transforme essa requisição em js  
app.use(routes);

app.listen(3333);