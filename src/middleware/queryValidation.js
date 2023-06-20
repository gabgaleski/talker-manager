const queryRateValidation = (req, res, next) => {
    const { rate } = req.query;
    const numRate = Number(rate);
    if (rate && (!Number.isInteger((numRate)) || numRate < 1 || numRate > 5)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = queryRateValidation;