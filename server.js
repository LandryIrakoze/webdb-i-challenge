const express = require('express');

const db = require('./data/dbConfig.js');

const AccountRouter = require('./accounts/accountsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send({ message: 'api up...'})
})

module.exports = server;