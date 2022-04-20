const router = require("express").Router();
const path = require("path")
const multer = require("multer")
const File = require("../models/File")
const { v4: uuidv4 } = require("uuid")
const apiUrl = require("../contexts/constants");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 } //100mb
});

// @route POST api/files/
// @Upload a file
// @access Public
router.post("/", upload.single('myFile'), async(req, res) => {
    // console.log(req.file)

    // const base_url = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://mern-inshare-app.herokuapp.com';
    // const base_url = apiUrl;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a file" });
        }
        if (req.file.size >= (100 * 1024 * 1024)) return res.status(401).json({ success: false, message: 'Max file size is 100MB' })
        const newFile = await new File({
            filename: req.file.filename,
            path: req.file.path.split(path.sep).slice(0).join('/'),
            size: req.file.size,
            uuid: uuidv4()
        })
        await newFile.save()
            // res.json({ success: true, file: `/files/${newFile.uuid}` })
        res.json({
            success: true,
            file: newFile,
            filePath: `${apiUrl}/files/${newFile.uuid}`,
            message: 'Happy sharing!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.get("/:uuid", async(req, res) => {
    // console.log(req.params)
    try {
        const getFile = await File.findOne({ uuid: req.params.uuid })
        if (!getFile) {
            return res.status(400).json({ success: false, message: "Link has been expired." })
        }
        // const base_url = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : 'https://mern-inshare-app.herokuapp.com';
        // const base_url = apiUrl;
        res.json({
            success: true,
            message: "Get file success",
            file: {
                fileName: getFile.filename,
                uuid: getFile.uuid,
                size: getFile.size,
                downloadLink: `${apiUrl}/files/download/${getFile.uuid}`
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
});

// @route POST api/files/send
// @Send file others
// @access Public

router.post("/send", async(req, res) => {
    const { uuid, fromEmail, toEmail } = req.body
    try {
        if (!uuid || !fromEmail || !toEmail) return res.status(400).json({ success: false, message: 'All fields is required.' });

        const file = await File.findOne({ uuid });
        if (file.sender) {
            return res.status(422).json({ success: false, message: "Email already sent once" })
        }
        file.sender = fromEmail,
            file.receiver = toEmail
        await file.save();
        const sendMail = require("../services/mailService")
            // let app_base_url = process.env.NODE_ENV !== "production" ? process.env.APP_BASE_URL : "https://mern-share-it-app.herokuapp.com"
        sendMail({
            from: fromEmail,
            to: toEmail,
            subject: 'shareIt file sharing',
            text: `${fromEmail} shared a file with you.`,
            html: require('../services/emailTemplate')({
                fromEmail,
                downloadLink: `${apiUrl}/files/${file.uuid}?source=email`,
                size: parseInt(file.size / 1000) + ' KB',
                expires: '24 hours'
            })
        }).then(function() {
            return res.json({ success: true, message: "Email sent successfully" });
        }).catch(function(err) {
            return res.status(500).json({ error: 'Error in email sending.' });
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

module.exports = router