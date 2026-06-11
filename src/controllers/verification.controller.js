const alopnaService = require("../services/alopna.service");
const saveBankData = require("../utils/saveBankData");
const {
    createToken,
    sendAadhaarOtp,
    verifyAadhaar,
    verifyBankAccount
} = require("../services/alopna.service");
const {
    createReference,
    updateReferenceStatus
} = require("../utils/referenceManager");
const saveImage = require("../utils/saveImage");
const saveAadhaarData = require("../utils/saveAadhaarData");

const getToken = async (req, res) => {
    try {
        const result = await alopnaService.createToken();

        res.status(200).json(result);
    } catch (error) {
        console.log("FULL ERROR");

        console.log(error.response?.data);

        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
};

const sendOtp = async (req, res) => {
    try {

        const { aadhaarNumber } = req.body;

        const reference = createReference();

        const result = await sendAadhaarOtp(aadhaarNumber);

        res.json({
            reference,
            ...result
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
};

const verifyOtp = async (req, res) => {

    try {

        const {
            clientId,
            otp,
            reference
        } = req.body;

        const result = await verifyAadhaar({
            clientId,
            otp,
            reference
        });

        updateReferenceStatus(
            reference,
            "AADHAAR_VERIFIED"
        );

        if (
            result.data.biometric_info &&
            result.data.biometric_info.profile_image
        ) {

            const imagePath = saveImage(
    result.data.biometric_info.profile_image,
    reference
);

            result.data.biometric_info.profile_image = imagePath;
        }

        saveAadhaarData(reference, result);

        res.json(result);

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
};

const verifyBank = async (req, res) => {

    try {

        const {
            accountNumber,
            ifscCode,
            reference
        } = req.body;

        const result = await verifyBankAccount({
            accountNumber,
            ifscCode,
            reference
        });

        updateReferenceStatus(
            reference,
            "BANK_VERIFIED"
        );

        saveBankData(reference, result);

        res.json(result);
    } catch (error) {

        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
};

module.exports = {
    getToken,
    sendOtp,
    verifyOtp,
    verifyBank
};