import "dotenv/config";
import AWS, {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ResponseError } from "../errors/response.error.js";

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;

const r2Client = new AWS.S3({
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  signatureVersion: "v4",
  region: "auto",
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

export const getUrl = async (key) => {
  try {
    return String(
      getSignedUrl(
        r2Client,
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        }),
        { expiresIn: 3600 }
      )
    ).toString();
  } catch (error) {
    throw new ResponseError(400, "Url gagal dibuat!");
  }
};

export const uploadFile = async (file, folder) => {
  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${folder}/${file.filename}`,
        Body: file,
        ContentType: file.mimetype,
      })
    );

    return await getUrl(`${folder}/${file.filename}`);
  } catch (error) {
    throw new ResponseError(400, "Upload file gagal!");
  }
};

export const deleteFile = async (file, folder) => {
  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${folder}/${file.filename}`,
      })
    );

    return "Hapus file berhasil!";
  } catch (error) {
    throw new ResponseError(400, "Hapus file gagal!");
  }
};
