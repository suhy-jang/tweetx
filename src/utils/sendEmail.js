// const AWS = require('aws-sdk');
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const sendEmail = async ({ ToAddresses, subject, body }) => {
  const params = {
    Destination: {
      ToAddresses: ToAddresses,
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: process.env.SES_SENDER,
  };

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log('Email sent:', data);
  } catch (err) {
    console.error(err, err.stack);
  }
};

export { sendEmail as default };
