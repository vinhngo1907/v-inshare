const path = require("path");
const nanoid = require("nanoid");
const urlModel = require("../models/Url");
const { convertValidationErrorsToMessage } = require("../utils/error")

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
    async create(req, res) {
        try {
            const { body } = req;
            // urlModel.validate(body).catch(err => {
            //     const message = convertValidationErrorsToMessage(error?.errors);
            //     return res.status(400).json({ message, success: false });
            // });

            await urlModel.validate(body);

            const { slug } = body;
            if (!slug || slug === "") {
                body.slug = nanoid();
            }

            const existUrl = await urlModel.findOne({
                slug: body.slug
            });
            if (existUrl) {
                return res.status(400).json({ success: false, message: "" })
            }

            const newUrl = new urlModel({
                ...body
            });

            await newUrl.save();

            res.json({ message: "Successfully", success: true, slug: newUrl.slug })

        } catch (error) {
            const message = convertValidationErrorsToMessage(err.errors);
            return res.status(500).json({ success: false, message });
        }
    }
}

module.exports = urlCtrl;