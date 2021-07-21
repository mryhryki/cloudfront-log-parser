import fs from "fs/promises";
import path from "path";
import { S3 } from "aws-sdk";
import { ListObjectsV2Output, Object } from "aws-sdk/clients/s3";
import { s3ObjectFilter } from "./config.template";
import { stderr } from "./util";

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

    await Promise.all((result.Contents ?? [])
      .filter((object) => {
        const key = object.Key;
        return (key != null) && s3ObjectFilter(key);
      })
      .map(async (content: Object): Promise<void> => {
        if (content.Key != null) {
          const localFilePath = await downloadFile(bucket, content.Key, directoryPath);
          filePaths.push(localFilePath);
        }
      }),
    );
  } while (nextToken != null);

  return filePaths;
};

const downloadFile = async (bucket: string, key: string, directoryPath: string): Promise<string> => {
  const downloadFilePath = path.resolve(directoryPath, path.basename(key));
  const stat = await fs.stat(downloadFilePath).catch(() => null);
  if (stat != null) {
    stderr(`Skip Download: ${key}`);
    return downloadFilePath;
  }
  stderr(`Download: s3://${bucket}/${key} -> ${downloadFilePath}`);
  const result = await s3.getObject({ Bucket: bucket, Key: key }).promise();
  await fs.writeFile(downloadFilePath, result.Body as Buffer);
  return downloadFilePath;
};
