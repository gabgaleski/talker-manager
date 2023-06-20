const queryRateValidation = (req, res, next) => {
    const { rate } = req.query;
    const numRate = Number(rate);
    if (rate && (!Number.isInteger((numRate)) || numRate < 1 || numRate > 5)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

const queryDateValidation = (req, res, next) => {
    const { date } = req.query;
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (date && !regex.test(date)) {
        return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

module.exports = {
    queryRateValidation,
    queryDateValidation,
};