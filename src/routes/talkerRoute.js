const express = require('express');
const readAndWriteFile = require('../utils/readAndWriteFile');

const route = express.Router();

route.get('/', async (_req, res) => {
    const talkers = await readAndWriteFile.readFile();
    if (!talkers) return res.status(200).json([]);
    return res.status(200).json(talkers);
});

route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readAndWriteFile.getById(id);
    if (!talker) {
 return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
    return res.status(200).json(talker);
});

module.exports = route;