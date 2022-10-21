const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const sendEmail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: "smtpout.secureserver.net",
      secureConnection: false,
      tls: {
        rejectUnauthorized: false,
      },
      port: 587,
      auth: {
        user: process.env.EMAIL_SEND_SESSION,
        pass: process.env.EMAIL_SEND_PASSWORD,
      },
    })
  );

  // send mail with defined transport object
  let message = {
    from: process.env.EMAIL_SEND_SESSION, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    // html: html, // html body
  };

  const info = await transporter.sendMail(message);

  console.log(("Message sent: %s", info.messageId));
};

module.exports = sendEmail;
