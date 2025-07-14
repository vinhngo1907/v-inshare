const mongoose = require("mongoose");
const URLSchema = new mongoose.Schema({
    slug: { type: String, required: true },
    url: { type: String,}
}, {
    timestamps: true
});

module.exports = mongoose.model("urls", URLSchema);