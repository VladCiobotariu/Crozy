import { Callback, Context, Event } from "@scaleway/serverless-functions/framework/types/types";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import Validator from "fastest-validator";
import sharp = require("sharp");

dotenv.config(); // for local development

const v = new Validator();

const schema = {
  width: { type: "number", positive: true, integer: true, convert: true, optional: true },
  height: { type: "number", positive: true, integer: true, convert: true, optional: true },
  name: { type: "string" },
};

const check = v.compile(schema);

const s3 = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT, // ex: https://s3.fr-par.scw.cloud
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET;
const cacheControl = 30 * 24 * 60 * 60; // 30 days in seconds

export async function handle(event: Event, context: Context, cb: Callback) {
  const path = event.path;

  const match = path.match(/^\/([^\/]+)\/(\d+)\/(\d+)\/?$/);
  if (!match) {
    cb(undefined, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Invalid URL format. Expected /name/width/height" }),
    });
    return;
  }

  const [, name, widthStr, heightStr] = match;

  const width = parseInt(widthStr, 10);
  const height = parseInt(heightStr, 10);

  if (!name || isNaN(width) || isNaN(height)) {
    cb(undefined, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Missing or invalid parameters" }),
    });
    return;
  }

  try {
    const inputBuffer = await getImageFromS3(name);
    const image = await getImage(
      inputBuffer,
      width,
      height
    );
    
    cb(undefined, {
      status: 200 /* Defaults to 200 */,
      headers: { "content-type": "image/jpeg", "Cache-Control": `public, max-age=${cacheControl}, immutable` },
      body: image.toString('base64'),
      isBase64Encoded: true,
    });
  } catch (error: any) {
    if (error.$metadata?.httpStatusCode === 404) {
      cb(undefined, {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Image not found" }),
      });
    } else {
      cb(error as Error, undefined);
    }
  }
}

async function getImageFromS3(name: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: name,
  });
  const result = await s3.send(command);
  return await streamToBuffer(result.Body as any);
}

function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

async function getImage(inputBuffer: Buffer, width?: number, height?: number) {
  let pipeline = sharp(inputBuffer);
  if(width && height){
    pipeline = pipeline.resize(width, height)
  }
  
  const image = await pipeline
    .webp()
    .toBuffer();
  return image;
}

/* Local test handler */
if (process.env.NODE_ENV === "test") {
  import("@scaleway/serverless-functions").then((scw_fnc_node) => {
    scw_fnc_node.serveHandler(handle, 8089);
  });
}