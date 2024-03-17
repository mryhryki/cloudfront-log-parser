import { S3 } from "aws-sdk";
import { ListObjectsV2Output } from "aws-sdk/clients/s3";
import fs from "fs/promises";
import path from "path";
import { S3Bucket, s3ObjectFilter, S3Prefix } from "./config";
import { getLogDirectory, stderr } from "./util";

const s3 = new S3({ apiVersion: "2006-03-01" });

const main = async () => {
  let totalFiles = 0;
  let skipFiles = 0;

  const LogDirectory = getLogDirectory();
  await fs.mkdir(LogDirectory, { recursive: true });

  const startTime = new Date().getTime();
  let continuationToken: string | undefined = undefined;
  do {
    stderr(`ListObjectsV2: s3://${S3Bucket}/${S3Prefix} (ContinuationToken: ${continuationToken})`);
    const result: ListObjectsV2Output = await s3.listObjectsV2({
      Bucket: S3Bucket,
      Prefix: S3Prefix,
      ContinuationToken: continuationToken,
    }).promise();
    continuationToken = result.NextContinuationToken;

    await Promise.all((result.Contents ?? [])
      .map((object): string => object.Key ?? "")
      .filter((key) => key !== "" && s3ObjectFilter(key))
      .map(async (key): Promise<void> => {
        const downloadFilePath = path.resolve(LogDirectory, path.basename(key));
        const stat = await fs.stat(downloadFilePath).catch(() => null);
        if (stat != null) {
          stderr(`Skip Download: ${key}`);
          skipFiles += 1;
          return;
        }
        stderr(`Download: s3://${S3Bucket}/${key} -> ${downloadFilePath}`);
        const result = await s3.getObject({ Bucket: S3Bucket, Key: key }).promise();
        await fs.writeFile(downloadFilePath, result.Body as Buffer);
        totalFiles += 1;
      }),
    );
  } while (continuationToken != null);

  const endTime = new Date().getTime();
  stderr(`Synced: ${(endTime - startTime) / 1000} sec, ${totalFiles} files (Skip: ${skipFiles} files) `);
};

main();
