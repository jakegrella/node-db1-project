const express = require('express');
const server = express();

const AccountRouter = require('./accounts/account-router');

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (_, res) => {
	res.status(200).json({ api: 'online' });
});

module.exports = server;
