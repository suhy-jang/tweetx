import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getPresignedUrl = async (fileName, fileType) => {
  try {
    const key = `tweetx/profile/${fileName}`;
    const signedUrlExpireSeconds = 60 * 5; // 5 minutes

    const presignedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
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
    throw new Error('Error generating presigned URL');
  }
};

export { getPresignedUrl as default };
