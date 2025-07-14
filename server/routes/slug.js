const router = require("express").Router();
const urlCtrl = require("../controllers/url");

router.get("/:slug", urlCtrl.read)

module.exports = router;