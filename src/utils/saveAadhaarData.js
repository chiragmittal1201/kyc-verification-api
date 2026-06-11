const fs = require("fs");
const path = require("path");

const saveAadhaarData = (fileName, data) => {

    const filePath = path.join(
        __dirname,
        "../../data/aadhaar",
        `${fileName}.json`
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 4)
    );

    return filePath;
};

module.exports = saveAadhaarData;