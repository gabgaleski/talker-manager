const express = require('express');
const readAndWriteFile = require('./utils/readAndWriteFile');
const generateToken = require('./utils/generateToken');
const loginValidation = require('./middleware/loginValidation');
const tokenValidation = require('./middleware/tokenValidation');
const { nameValidation, 
  talkValidation, dataValidation,
  rateValidation, rateChangeValidation, 
  rateChangeContinueValidation } = require('./middleware/talkerValidation');
const { queryRateValidation, queryDateValidation } = require('./middleware/queryValidation');
const talkersDB = require('./talkersDB');
const connection = require('./connection');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/db', async (_req, res) => {
  const result = await talkersDB.getAll();
  return res.status(200).json(result);
});

app.get('/talker', async (_req, res) => {
  const talkers = await readAndWriteFile.readFile();
  if (!talkers) return res.status(200).json([]);
  return res.status(200).json(talkers);
});

app.patch('/talker/rate/:id', tokenValidation, rateChangeValidation,
rateChangeContinueValidation, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talker = await readAndWriteFile.updateRate(id, rate);
  return res.status(204).json(talker);
});

app.get('/talker/search', tokenValidation, 
queryRateValidation, queryDateValidation, async (req, res) => {
  const { q, rate, date } = req.query;
  let talkers = await readAndWriteFile.readFile();
  if (q) {
    const talkersFiltered = talkers.filter((talker) => talker.name.includes(q));
    talkers = talkersFiltered;
  }
  if (rate) {
    const talkersFiltered = talkers.filter((talker) => talker.talk.rate === Number(rate));
    talkers = talkersFiltered;
  }
  if (date) {
    const talkersFiltered = talkers.filter((talker) => talker.talk.watchedAt === date);
    talkers = talkersFiltered;
  }
  return res.status(200).json(talkers);
});

app.post('/talker', tokenValidation, 
nameValidation, 
talkValidation, dataValidation, rateValidation, async (req, res) => {
  const infos = req.body;
  const talker = await readAndWriteFile.postTalker(infos);
  return res.status(201).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readAndWriteFile.getById(id);
  if (!talker) {
return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
  return res.status(200).json(talker);
});

app.put('/talker/:id', tokenValidation,
nameValidation, talkValidation,
dataValidation, rateValidation, async (req, res) => {
  const { id } = req.params;
  const infos = req.body;
  const talker = await readAndWriteFile.updateTalker(id, infos);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  await readAndWriteFile.deleteTalker(id);
  res.status(204).json({});
});

app.post('/login', loginValidation, async (_req, res) => {
  const getToken = await generateToken();
  return res.status(200).json({ token: getToken });
});

app.listen(PORT, async () => {
  const [result] = await connection.execute('SELECT 1');
  if (result) console.log('Online');
});
