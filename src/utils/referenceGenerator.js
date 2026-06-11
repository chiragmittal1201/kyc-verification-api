const crypto = require("crypto");

const generateReference = () => {
    return `REF_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;
};

module.exports = { generateReference };