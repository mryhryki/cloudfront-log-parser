import fs from "fs/promises";
import path from "path";
import { syncLogs } from "./s3";
import { S3Bucket, S3Prefix, parseLogLine, parseResult, editResult } from "./config";
import { parseLogFile } from "./log";

const DataDirectory = path.resolve(__dirname, ".data");
const LogDirectory = path.resolve(DataDirectory, "cloudfront_logs");
const ResultFilePath = path.resolve(DataDirectory, "result.json");

const main = async () => {
  const logFilesPaths = await syncLogs(S3Bucket, S3Prefix, LogDirectory);
  for await (const filePath of logFilesPaths) {
    await parseLogFile(filePath, parseLogLine);
  }
  const result = editResult(parseResult);
  await fs.writeFile(ResultFilePath, JSON.stringify(result, null, 2));
};
main();
