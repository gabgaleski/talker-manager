const fs = require('fs/promises');

const readFile = async () => {
    try {
        const file = await fs.readFile('src/talker.json', 'utf-8');
        return JSON.parse(file);
    } catch (error) {
        return null;
    }
};

const getById = async (id) => {
    try {
        const allTalkers = await readFile();
        const talkerSelect = allTalkers.find((talker) => talker.id === Number(id));
        return talkerSelect;
    } catch (error) {
        return null;
    }
};

module.exports = { 
    readFile,
    getById,
};
