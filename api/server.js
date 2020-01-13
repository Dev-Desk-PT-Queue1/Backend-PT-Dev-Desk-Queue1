const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const authRouter = require('../routes/authRouter');
const ticketsRouter = require('../routes/ticketsRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/', authRouter);
server.use('/api/', ticketsRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend-PT-Dev-Desk-Queue1' });
});

module.exports = server;
