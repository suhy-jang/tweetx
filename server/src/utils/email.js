import {
  SESClient,
  SendEmailCommand,
  VerifyEmailIdentityCommand,
  GetIdentityVerificationAttributesCommand,
} from '@aws-sdk/client-ses';

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

const verifyEmail = async (email) => {
  const params = {
    EmailAddress: email,
  };

  const command = new VerifyEmailIdentityCommand(params);

  try {
    const data = await sesClient.send(command);
    const statusCode = data['$metadata'].httpStatusCode;
    return statusCode === 200;
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

const checkEmailVerificationStatus = async (email) => {
  const params = {
    Identities: [email],
  };

  const command = new GetIdentityVerificationAttributesCommand(params);

  try {
    const data = await sesClient.send(command);
    const attributes = data.VerificationAttributes[email];
    if (attributes) {
      if (attributes.VerificationStatus === 'Success') {
        return { success: true };
      }
      return { success: false, reason: attributes.VerificationStatus };
    } else {
      throw new Error(`No verification data available for ${email}`);
    }
  } catch (error) {
    throw new Error(`Error checking verification status: ${error}`);
  }
};

export { sendEmail, verifyEmail, checkEmailVerificationStatus };
