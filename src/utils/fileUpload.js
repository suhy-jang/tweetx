import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const S3_REGION = process.env.S3_REGION;
const S3_BUCKET = process.env.S3_BUCKET;

const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  },
});

const getPresignedUrl = async (fileName, fileType) => {
  try {
    const key = `tweetx/profile/${fileName}`;
    const signedUrlExpireSeconds = 60 * 5; // 5 minutes

    const presignedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
        ContentType: fileType,
        ACL: 'public-read',
      }),
      {
        expiresIn: signedUrlExpireSeconds,
      },
    );

    return presignedUrl;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).send('Error generating presigned URL');
  }
};

export { getPresignedUrl as default };
