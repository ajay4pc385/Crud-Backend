const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors")
const app = express();
const requireToken = require("./Middlewares/AuthTokenRequired")
require("./db");
require("dotenv").config;

const PORT  = 6060;

app.use(cors());
app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

app.get("/",requireToken, (req, res) => {
    res.json({
        message: "Api is working"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}.`);
});