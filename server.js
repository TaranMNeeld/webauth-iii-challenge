const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./data/users/user-router.js');
const authRouter = require('./data/auth/auth-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;