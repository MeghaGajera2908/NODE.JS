const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    username: String,
    password: Number,
    email: String,
});
module.exports = mongoose.model("App", AppSchema);