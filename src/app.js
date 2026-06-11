const express = require("express");
require("dotenv").config();

const verificationRoutes = require("./routes/verification.routes");

const app = express();

app.use(express.json());

app.use("/api", verificationRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Aadhaar API running"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});