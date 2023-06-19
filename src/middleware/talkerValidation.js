const createRegexData = (data) => {
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
    return regex.test(data);
  };
  
const nameValidation = (req, res, next) => {
    const { name, age } = req.body;

    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    next();
};

const talkValidation = (req, res, next) => {
    const { age, talk } = req.body;
  
    if (Number.isInteger(age) === false || age < 18) {
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    if (!talk.watchedAt) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' }); 
    }
    next();
  };

const dataValidation = (req, res, next) => {
    const { talk } = req.body;

    if (createRegexData(talk.watchedAt) === false) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (!talk.rate && talk.rate !== 0) {
 return res.status(400)
    .json({ message: 'O campo "rate" é obrigatório' }); 
}
    next();
};

const rateValidation = (req, res, next) => {
    const { talk } = req.body;
    const valor = talk.rate;
    if (!(Number.isInteger(valor) && valor >= 1 && valor <= 5)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = {
    nameValidation,
    talkValidation,
    dataValidation,
    rateValidation,
};