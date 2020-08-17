import aws from 'aws-sdk';

aws.config.update({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
});

const S3_BUCKET = process.env.S3_BUCKET;

const signS3 = async (fileName, fileType) => {
  const s3 = new aws.S3();

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `tweetx/Upload/${fileName}`,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read',
  };

  try {
    const res = await s3.getSignedUrl('putObject', s3Params);
    return {
      signedRequest: res,
      url: `https://${S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/tweetx/Upload/${fileName}`,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export { signS3 as default };
