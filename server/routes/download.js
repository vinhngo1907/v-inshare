const express = require("express");
const router = express.Router();
const File = require("../models/File");

// @route GET files/download/
// @access Public
router.get("/download/:uuid", async(req, res) => {
    // const uuid = req.body.uuid
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.status(400).json({ success: false, message: "Link has been expired." });
        }
        await file.save();
        const filePath = `${__dirname}/../${file.path}`
        console.log(filePath);
        res.download(filePath);
        // res.json({ success: true, file, message: "Excellent progress." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router