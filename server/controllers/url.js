const path = require("path");
const nanoid = require("nanoid");
const urlModel = require("../models/Url");
const fileModel = require("../models/File");
const { convertValidationErrorsToMessage } = require("../utils/error");
const apiUrl = require("../contexts/constants");

const urlCtrl = {
    async read(req, res) {
        try {
            const { slug } = req.params;
            const _url = await urlModel.findOne({ slug });
            if (!_url) {
                const viewPath = path.join(path.resolve(), "pulic/404.html");
                return res.status(404).sendFile(viewPath);
            }

            // res.redirect(_url.url);
            res.json({ data: _url });
        } catch (error) {
            console.log(error?.message);
            return res.status(500).json(error.message);
        }
    },
    // async create(req, res) {
    //     try {
    //         const { body } = req;

    //         await urlModel.validate(body);

    //         const { slug } = body;
    //         if (!slug || slug === "") {
    //             body.slug = nanoid();
    //         }

    //         const existUrl = await urlModel.findOne({
    //             slug: body.slug
    //         });
    //         if (existUrl) {
    //             return res.status(400).json({ success: false, message: "" })
    //         }

    //         const newUrl = new urlModel({
    //             ...body
    //         });

    //         await newUrl.save();

    //         res.json({ message: "Successfully", success: true, file: newUrl.slug })

    //     } catch (error) {
    //         const message = convertValidationErrorsToMessage(err.errors);
    //         return res.status(500).json({ success: false, message });
    //     }
    // }
    async create(req, res) {
        try {
            const { slug, url } = req.body;

            if (!url) {
                return res.status(400).json({ success: false, message: 'Missing URL' });
            }

            const segments = url.split('/');
            const uuid = segments[segments.length - 1];

            if (!uuid) {
                return res.status(400).json({ success: false, message: 'Invalid URL format' });
            }

            // Tìm file theo uuid
            const file = await fileModel.findOne({ uuid });
            if (!file) {
                return res.status(404).json({ success: false, message: 'File not found' });
            }

            const shortSlug = slug && slug.trim() !== '' ? slug : nanoid();

            const existUrl = await urlModel.findOne({ slug: shortSlug });
            if (existUrl) {
                return res.status(400).json({ success: false, message: 'Slug already exists' });
            }

            // Lưu short link
            const newUrl = new urlModel({
                slug: shortSlug,
                uuid: file.uuid
            });

            await newUrl.save();

            return res.json({
                success: true,
                message: 'Successfully created',
                file: {
                    ...file.toObject(),
                    shortLink: `${req.headers.origin || 'http://localhost:3000'}/${shortSlug}`
                }
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }

}

module.exports = urlCtrl;