const api = require("../config/axios");

const createToken = async () => {
    try {
        const response = await api.post(
            "/auth/token/create",
            {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            },
            {
                headers: {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET
                }
            }
        );

        return response.data.data.token;
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};

const sendAadhaarOtp = async (aadhaarNumber) => {

    const token = await createToken();
    
    const response = await api.post(
        "/verification/aadhaar/otp/send",
        {
            aadhaar_number: aadhaarNumber
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }
    );

    return response.data;
};

const verifyAadhaar = async ({ clientId, otp, reference }) => {

    const token = await createToken();

    const response = await api.post(
        "/verification/aadhaar/verify",
        {
            client_id: clientId,
            otp: otp,
            reference: reference
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }
    );

    return response.data;
};

const verifyBankAccount = async ({
    accountNumber,
    ifscCode,
    reference
}) => {

    const tokenResponse = await createToken();

    const token = tokenResponse;

    const response = await api.post(
        "/verification/bank-account",
        {
            reference,
            account_number: accountNumber,
            ifsc_code: ifscCode
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        }
    );

    return response.data;
};

module.exports = {
    createToken,
    sendAadhaarOtp,
    verifyAadhaar,
    verifyBankAccount
};