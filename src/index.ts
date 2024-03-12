import fs from "fs/promises";
import path from "path";
import { syncLogs } from "./s3";
import { S3Bucket, S3Prefix, parseLogLine, editResult, ParseResult } from "./config";
import { LogLine, parseLogFile } from "./log";
import { stderr } from "./util";

const DataDirectory = path.resolve(__dirname, ".data");
const LogDirectory = path.resolve(DataDirectory, "cloudfront_logs");
const ResultFilePath = path.resolve(DataDirectory, "result.txt");

const main = async () => {
  let totalBytes = 0;
  let totalFiles = 0;
  const startTime = new Date().getTime();
  const parseResult: ParseResult = {};
  const parseLogFileCallback = (log: LogLine) => parseLogLine(log, parseResult)

  await fs.mkdir(LogDirectory, { recursive: true })

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
    await fs.writeFile(ResultFilePath, result);
    stderr(`Write result to ${ResultFilePath}`)
  }

  const endTime = new Date().getTime();
  stderr(`Parsed: ${(endTime - startTime) / 1000} sec, ${totalFiles} files, ${totalBytes} bytes`)
};

main();
