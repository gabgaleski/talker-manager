const fs = require('fs/promises');

const path = 'src/talker.json';

const readFile = async () => {
    try {
        const file = await fs.readFile(path, 'utf-8');
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

const postTalker = async (talker) => {
    try {
        const allTalkers = await readFile();
        const newTalker = { ...talker, id: allTalkers.length + 1 };
        allTalkers.push(newTalker);
        await fs.writeFile(path, JSON.stringify(allTalkers));
        return newTalker;
    } catch (error) {
        return null;
    }
};

const updateTalker = async (id, infos) => {
    try {
        const allTalkers = await readFile();
        const talkerSelect = allTalkers.find((talker) => talker.id === Number(id));
        if (!talkerSelect) return null;
        const talkerIndex = allTalkers.indexOf(talkerSelect);
        const talkerUpdated = { ...talkerSelect, ...infos };
        allTalkers[talkerIndex] = talkerUpdated;
        await fs.writeFile(path, JSON.stringify(allTalkers));
        return talkerUpdated;
    } catch (error) {
        return null;
    }
};

const updateRate = async (id, rate) => {
    try {
        const allTalkers = await readFile();
        const talkerSelect = allTalkers.find((talker) => talker.id === Number(id));
        if (!talkerSelect) return null;
        const talkerIndex = allTalkers.indexOf(talkerSelect);
        talkerSelect.talk.rate = rate;
        allTalkers[talkerIndex] = talkerSelect;
        await fs.writeFile(path, JSON.stringify(allTalkers));
        return talkerSelect;
    } catch (error) {
        return null;
    }
};

const deleteTalker = async (id) => {
    try {
      const allTalkers = await readFile();
      const newList = allTalkers.filter((talker) => talker.id !== Number(id));
      await fs.writeFile('src/talker.json', JSON.stringify(newList));
    } catch (error) {
        return null;
    }
};

module.exports = { 
    readFile,
    getById,
    postTalker,
    updateTalker,
    deleteTalker,
    updateRate,
};
