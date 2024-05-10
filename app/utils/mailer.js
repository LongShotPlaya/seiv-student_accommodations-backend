const nodemailer = require("nodemailer");

exports.sendEmail = async (fromUser, toUsers, message) => {
    // Creating transporter to send emails
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });

    // Parsing to prevent injection
    const parsedMessage = {
        subject: message.subject,
        html: message.html,
        text: message.text,
    };

    // Send the email
    return transporter.sendMail({
        from: `"${fromUser}" <${process.env.MAIL_USER}>`,
        to: `${toUsers}`,
        ...parsedMessage
    });
  };