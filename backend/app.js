const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const User = require("./models/User");
const WarGameUser = require("./models/WarGameUser");
require("dotenv").config();

const port = process.env.PORT || 5000;
const flags = JSON.parse(process.env.FLAGS_PASSWORDS).data;
console.log(flags);
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to wargames !");
});

app.post("/api/getUsername", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await WarGameUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ username: user.username });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post("/api/submit", async (req, res) => {
    try {
        const { username, flag } = req.body;
        console.log(username, flag);
        const user = await WarGameUser.findOne({ username });
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
            });
        }
        let curlevel = user.curlevel;

        if (flags[curlevel - 1].flag === flag) {
            curlevel++;
            await WarGameUser.updateOne(
                { username },
                { curlevel, lastsubmit: Date.now() }
            );
            return res.json({
                msg: "Correct Flag",
                success: true,
                password: flags[curlevel].password,
            });
        }
        res.json({ msg: "Incorrect Flag", success: false });
    } catch (err) {
        console.error(err.message);
        res.json({ msg: "Server Error", success: false });
    }
});

app.post("/api/show", async (req, res) => {
    try {
        const { username } = req.body;
        const user = await WarGameUser.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({
            data: user,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/api/leaderboard", async (req, res) => {
    try {
        let users = await WarGameUser.find()
            .sort({ curlevel: -1, lastSubmitted: 1 })
            .limit(15);

        users = users.filter((user) => user.curlevel > 1);
        res.json({ data: users });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
app.post("/api/show", async (req, res) => {
    try {
        const { username } = req.body;
        const user = await WarGameUser.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({
            data: user,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
const start = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

start();
