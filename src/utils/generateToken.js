const generateToken = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 1; i <= 16; i += 1) {
        token += letters[Math.floor(Math.random() * letters.length)];
    }
    return token;
};

module.exports = generateToken;