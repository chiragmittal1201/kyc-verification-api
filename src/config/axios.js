const axios = require("axios");

const api = axios.create({
    baseURL: "https://partner.alopna.in/api/v1",
    timeout: 30000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

module.exports = api;