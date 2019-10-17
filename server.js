const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//routers

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
//use routers

module.exports = server;