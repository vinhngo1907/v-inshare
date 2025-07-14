const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const urlCtrl = require("../controllers/url");

const limiter = rateLimit({
    windownMs: 15 * 1000,
    max: 3,
    message: "Dmm, Press more and I'll kick your ass!"
});

const speedLimiter = slowDown({
    windownMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500
});

router.post("/", limiter, speedLimiter, urlCtrl.create);

module.exports = router;