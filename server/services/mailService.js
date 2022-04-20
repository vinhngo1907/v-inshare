const nodemailer = require("nodemailer");
module.exports = async({ from, to, subject, text, html }) => {
    // const mailHost = 'smtp.gmail.com'
    // const mailPort = 587
    let transporter = nodemailer.createTransport({
            host: process.env.mailHost,
            port: process.env.mailPort,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        // send mail with defined transport object
    await transporter.sendMail({
        from: `shareIt <${from}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });
}