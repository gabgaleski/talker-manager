const express = require('express');
const readAndWriteFile = require('../utils/readAndWriteFile');

const route = express.Router();

route.get('/', async (_req, res) => {
    const talkers = await readAndWriteFile.readFile();
    if (!talkers) return res.status(200).json([]);
    return res.status(200).json(talkers);
});

module.exports = route;