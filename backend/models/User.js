const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    transactionId: { type: String },
    collegeName: { type: String },
    yearOfStudy: { type: String },
    branch: { type: String },
    isDualBooted: { type: Boolean, default: false },
    referralCode: { type: String },
    paymentImg: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
