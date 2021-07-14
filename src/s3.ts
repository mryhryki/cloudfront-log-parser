import fs from "fs/promises";
import path from "path";
import { S3 } from "aws-sdk";
import { ListObjectsV2Output, Object } from "aws-sdk/clients/s3";

const s3 = new S3({ apiVersion: "2006-03-01" });

export const syncLogs = async (bucket: string, prefix: string, directoryPath: string): Promise<string[]> => {
  const filePaths: string[] = [];
  let nextToken: string | undefined = undefined;
  do {
    const result: ListObjectsV2Output = await s3.listObjectsV2({
      Bucket: bucket,
      Prefix: prefix,
      ContinuationToken: nextToken,
    }).promise();
    nextToken = result.NextContinuationToken;
    await Promise.all((result.Contents ?? []).map(async (content: Object): Promise<void> => {
      if (content.Key != null) {
        filePaths.push(await downloadFile(bucket, content.Key, directoryPath));
      }
    }));
  } while (nextToken != null);
  return filePaths;
};

const downloadFile = async (bucket: string, key: string, directoryPath: string): Promise<string> => {
  const downloadFilePath = path.resolve(directoryPath, path.basename(key));
  const stat = await fs.stat(downloadFilePath).catch(() => null);
  if (stat != null) {
    console.log(`Skip Download: ${key}`);
    return downloadFilePath;
  }
  console.log(`Download: s3://${bucket}/${key} -> ${downloadFilePath}`);
  const result = await s3.getObject({ Bucket: bucket, Key: key }).promise();
  await fs.writeFile(downloadFilePath, result.Body as Buffer);
  return downloadFilePath;
};
