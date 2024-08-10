const mongoose = require("mongoose");

const { Schema } = mongoose;

const warGameUserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    curlevel: { type: Number, default: 1 },
    lastsubmit: { type: Date, default: Date.now },
});

const WarGameUser = mongoose.model("WarGameUser", warGameUserSchema);

module.exports = WarGameUser;
