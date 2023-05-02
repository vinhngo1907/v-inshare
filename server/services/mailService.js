const nodemailer = require("nodemailer");
// const {google} = require("googleapis");
// const {oauth2} = google;
// const oAuth2Client = new oauth2();
const {
    MAIL_CLIENT_ID,
    MAIL_CLIENT_SECRET,
    MAIL_REFRESH_TOKEN,
    MAIL_SENDER,
    OAUTH_PLAYGROUND
} = process.env
const { OAuth2Client } = require("google-auth-library")

module.exports = async ({ from, to, subject, text, html }) => {
    // const mailHost = 'smtp.gmail.com'
    // const mailPort = 587
    const oAuth2Client = new OAuth2Client(
        MAIL_CLIENT_ID,
        MAIL_CLIENT_SECRET,
        OAUTH_PLAYGROUND,
        MAIL_REFRESH_TOKEN
    );
    oAuth2Client.setCredentials({ refresh_token: MAIL_REFRESH_TOKEN });
    try {
        const access_token = await oAuth2Client.getAccessToken();
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: MAIL_SENDER,
                clientId: MAIL_CLIENT_ID,
                clientSecret: MAIL_CLIENT_SECRET,
                refreshToken: MAIL_REFRESH_TOKEN,
                access_token,
            },
            // host: process.env.mailHost,
            // port: process.env.mailPort,
            // secure: false, // true for 465, false for other ports
            // auth: {
            //     user: process.env.EMAIL,
            //     pass: process.env.PASSWORD
            // }
        })
        // send mail with defined transport object
        const result = await transporter.sendMail({
            from: `shareIt <${from}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}