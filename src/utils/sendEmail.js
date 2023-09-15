const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (msg) => {
  // msg.from = 'test_user@tweetx.org';
  // await sgMail.send(msg);
};

export { sendEmail as default };
