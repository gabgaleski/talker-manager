const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM TalkerDB.talkers');
    const changeResult = result.map((talker) => {
        const { id, name, age, talk_watched_at: talk1, talk_rate: talk2 } = talker;
        return {
            id,
            name,
            age,
            talk: {
                watchedAt: talk1,
                rate: talk2,
            },
        };
    });
    return changeResult;
};

module.exports = {
    getAll,
};