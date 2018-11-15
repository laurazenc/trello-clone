const nodemailer = require("nodemailer");
require("dotenv").config();

export const handleErrors = (path, message) => ({
  errors: [
    {
      path,
      message
    }
  ]
});

export const formatYupErrors = err => {
  const errors = [];
  if (err && err.inner) {
    err.inner.forEach(e => {
      errors.push({
        path: e.path,
        message: e.message
      });
    });
  }

  return errors;
};

export const sendEmail = async (recipient, url, linkText) => {
  const transporter = nodemailer.createTransport({
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS
    }
  });
  const message = {
    from: `Trello Clone app <sender@example.com>`,
    to: `Recipient <${recipient}>`,
    subject: "Nodemailer is unicode friendly ✔",
    text: "Hello to myself!",
    html: `<html>
        <body>
        <a href="${url}">${linkText}</a>
        </body>
        </html>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(`Error occurred. ${err.message}`);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

const hexRegex = new RegExp("^[0-9a-fA-F]{24}$");
export const isValidId = id => {
  return hexRegex.test(id);
};
