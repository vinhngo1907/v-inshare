const mongoose = require("mongoose");
const URLSchema = new mongoose.Schema({
    slug: { type: String, required: true },
    url: { type: String, required: [true, "Điền thông tin có tâm đi bạn êi!"] }
}, {
    timestamps: true
});

module.exports = mongoose.model("urls", URLSchema);