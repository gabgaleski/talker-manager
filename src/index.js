const express = require('express');
const readAndWriteFile = require('./utils/readAndWriteFile');
const generateToken = require('./utils/generateToken');
const loginValidation = require('./middleware/loginValidation');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readAndWriteFile.readFile();
  if (!talkers) return res.status(200).json([]);
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readAndWriteFile.getById(id);
  if (!talker) {
return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
  return res.status(200).json(talker);
});

app.post('/login', loginValidation, async (_req, res) => {
  const getToken = await generateToken();
  return res.status(200).json({ token: getToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
