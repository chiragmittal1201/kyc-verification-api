const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const referenceFile = path.join(
    __dirname,
    "../../data/references.json"
);

const generateReference = () => {
    return (
        "VER-" +
        new Date().toISOString().slice(0, 10).replace(/-/g, "") +
        "-" +
        crypto.randomUUID().slice(0, 8).toUpperCase()
    );
};

const createReference = () => {

    const references = JSON.parse(
        fs.readFileSync(referenceFile, "utf8")
    );

    const reference = generateReference();

    references.push({
        reference,
        createdAt: new Date().toISOString(),

        aadhaarStatus: "PENDING",
        bankStatus: "PENDING",

        overallStatus: "CREATED"
    });

    fs.writeFileSync(
        referenceFile,
        JSON.stringify(references, null, 4)
    );

    return reference;
};

const updateReferenceStatus = (
    reference,
    type
) => {

    const references = JSON.parse(
        fs.readFileSync(referenceFile, "utf8")
    );

    const record = references.find(
        item => item.reference === reference
    );

    if (record) {

        if (type === "AADHAAR_VERIFIED") {
            record.aadhaarStatus = "SUCCESS";
        }

        if (type === "BANK_VERIFIED") {
            record.bankStatus = "SUCCESS";
        }

        if (
            record.aadhaarStatus === "SUCCESS" &&
            record.bankStatus === "SUCCESS"
        ) {
            record.overallStatus = "COMPLETED";
        } else {
            record.overallStatus = "IN_PROGRESS";
        }

        record.updatedAt =
            new Date().toISOString();
    }

    fs.writeFileSync(
        referenceFile,
        JSON.stringify(references, null, 4)
    );
};

module.exports = {
    createReference,
    updateReferenceStatus
};