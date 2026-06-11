const fs = require("fs");
const path = require("path");

const saveBankData = (fileName, data) => {

    const filePath = path.join(
        __dirname,
        "../../data/bank",
        `${fileName}.json`
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 4)
    );

    return filePath;
};

module.exports = saveBankData;