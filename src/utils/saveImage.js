const fs = require("fs");
const path = require("path");

const saveImage = (base64String, fileName) => {

    const matches = base64String.match(/^data:image\/\w+;base64,(.+)$/);

    if (!matches) {
        throw new Error("Invalid image format");
    }

    const imageBuffer = Buffer.from(matches[1], "base64");

    const imagePath = path.join(
        __dirname,
        "../../data/images",
        `${fileName}.jpg`
    );

    fs.writeFileSync(imagePath, imageBuffer);

    return imagePath;
};

module.exports = saveImage;