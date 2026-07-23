// ==========================================
// CCSOLUTION CRM BACKEND
// ZADARMA CLICK TO CALL
// ==========================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Api } = require("zadarma-api");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ==========================================
// ZADARMA
// ==========================================

const api = new Api(
    process.env.ZADARMA_KEY,
    process.env.ZADARMA_SECRET
);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("CCSolution Backend Running");
});

// ==========================================
// START CALL
// ==========================================

app.post("/api/call", async (req, res) => {

    const phone = req.body.phone;

    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Phone number missing"
        });
    }

    try {

        console.log("Calling:", phone);

        const result = await api.requestCallback(
            process.env.ZADARMA_SIP,
            phone
        );

        console.log("Zadarma Response:", result);

        res.json({
            success: true,
            message: "Call started",
            data: result
        });

    } catch (err) {

        console.error("Zadarma Error:", err);

        res.status(500).json({
            success: false,
            message: "Zadarma call failed",
            error: err.message || err
        });

    }

});

// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {

    console.log("----------------------------------");
    console.log("CCSolution Backend Running");
    console.log("Port:", PORT);
    console.log("ZADARMA_KEY:", process.env.ZADARMA_KEY ? "Loaded" : "Missing");
    console.log("ZADARMA_SECRET:", process.env.ZADARMA_SECRET ? "Loaded" : "Missing");
    console.log("ZADARMA_SIP:", process.env.ZADARMA_SIP);
    console.log("----------------------------------");

});