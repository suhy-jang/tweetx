import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const S3_BUCKET = process.env.S3_BUCKET;

const signS3 = async (fileName, fileType) => {
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `tweetx/Upload/${fileName}`,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read',
  };

  try {
    const command = new AbortMultipartUploadCommand(s3Params);
    const res = await s3Client.send(command);

    const url = `https://${S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/tweetx/Upload/${fileName}`;

    return {
      res,
      url: url,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export { signS3 as default };
