require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`[${NODE_ENV}] App is listening on http://localhost:${PORT}`);
});
