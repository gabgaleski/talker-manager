const express = require('express');
// const readAndWriteFile = require('../utils/readAndWriteFile');
const generateToken = require('../utils/generateToken');

const route = express.Router();

route.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) return res.status(200).json({ token: generateToken() });
});

module.exports = route;