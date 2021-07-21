import fs from "fs/promises";
import path from "path";
import { syncLogs } from "./s3";
import { S3Bucket, S3Prefix, parseLogLine, editResult } from "./config";
import { LogLine, parseLogFile } from "./log";
import { ParseResult } from "./config.template";
import { stderr } from "./util";

const DataDirectory = path.resolve(__dirname, ".data");
const LogDirectory = path.resolve(DataDirectory, "cloudfront_logs");
const ResultFilePath = path.resolve(DataDirectory, "result.json");

const main = async () => {
  let totalBytes = 0;
  let totalFiles = 0;
  const startTime = new Date().getTime();
  const parseResult: ParseResult = {};
  const parseLogFileCallback = (log: LogLine) => parseLogLine(log, parseResult)

  const logFilesPaths = await syncLogs(S3Bucket, S3Prefix, LogDirectory);
  for await (const filePath of logFilesPaths) {
    await parseLogFile(filePath, parseLogFileCallback);
    const stat = await fs.stat(filePath);
    if (stat != null) {
      totalFiles += 1
      totalBytes += stat.size
    }
  }

  stderr("")
  const result = editResult(parseResult);
  if (result != null) {
    await fs.writeFile(ResultFilePath, JSON.stringify(result, null, 2));
    stderr(`Write result to ${ResultFilePath}`)
  }

  const endTime = new Date().getTime();
  stderr(`Parsed: ${(endTime - startTime) / 1000} sec, ${totalFiles} files, ${totalBytes} bytes`)
};

main();
