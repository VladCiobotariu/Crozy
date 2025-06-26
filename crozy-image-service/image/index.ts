import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const Validator = require("fastest-validator");
import { BlobServiceClient } from "@azure/storage-blob";
import sharp = require("sharp");

const v = new Validator();

const schema = {
  width: { type: "number", positive: true, integer: true, convert: true, optional: true },
  height: { type: "number", positive: true, integer: true, convert: true, optional: true },
  name: { type: "string" },
};

const check = v.compile(schema);

const connString = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connString) throw Error("Azure Storage Connection string not found");
const client = BlobServiceClient.fromConnectionString(connString);

const cacheControl = 30 /*days*/ * 24 /*hours*/ * 60 /*minutes*/ * 60 /*seconds*/;

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const reqParams = {
    width: context.bindingData.width,
    height: context.bindingData.height,
    name: context.bindingData.name,
  };

  const errors = await check(reqParams);
  console.log("errors: ", errors);
  if (errors !== true) {
    context.res = {
      status: 400,
      body: errors,
    };
    return;
  }

  const name = reqParams.name;

  const blockBlobClient = await client.getContainerClient("images");
  const blobClient = blockBlobClient.getBlobClient(name);
  try {
    const inputBuffer = await blobClient.downloadToBuffer();
    const image = await getImage(
      inputBuffer,
      reqParams.width,
      reqParams.height
    );

     
    context.res = {
      status: 200 /* Defaults to 200 */,
      headers: { "content-type": "image/jpeg", "Cache-Control": `public, max-age=${cacheControl}, immutable` },
      body: Buffer.from(image),
      isRaw: true,
    };
  } catch (error) {
    if (error.statusCode === 404) {
      context.res = {
        status: 400,
        body: {
          message: "image not found",
        },
      };
    } else {
      throw error;
    }
  }
};

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

export default httpTrigger;
