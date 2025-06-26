import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const connString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connString) throw Error("Azure Storage Connection string not found");
  const client = BlobServiceClient.fromConnectionString(connString);
  const blockBlobClient = await client.getContainerClient("images");

  context.res = {
    status: 200, /* Defaults to 200 */
  };
};

export default httpTrigger;
