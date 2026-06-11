const express = require("express");
const router = express.Router();

const {
    getToken,
    sendOtp,
    verifyOtp,
    verifyBank
} = require("../controllers/verification.controller");
router.post("/token", getToken);

router.post("/aadhaar/send-otp", sendOtp);

router.post("/token", getToken);

router.post("/aadhaar/verify-otp", verifyOtp);

router.post("/bank/verify", verifyBank);

module.exports = router;