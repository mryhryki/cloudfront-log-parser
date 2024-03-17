import fs from "fs/promises";
import path from "path";
import { editResult, getInitialParseResult, parseLogLine, ParseResult, s3ObjectFilter } from "./config";
import { LogLine, parseLogFile } from "./lib/log";
import { getLogDirectory, getResultFilePath, stderr } from "./lib/util";

const format = (num: number): string => new Intl.NumberFormat("ja-JP").format(num);
const parseLogs = async () => {
  let totalBytes = 0;
  let totalFiles = 0;
  let totalLogLines = 0;

  const LogDirectory = getLogDirectory();
  const ResultFilePath = getResultFilePath();

  const startTime = new Date().getTime();
  const parseResult: ParseResult = getInitialParseResult();
  const parseLogFileCallback = (log: LogLine) => {
    totalLogLines++;
    parseLogLine(log, parseResult)
  }


  const logFilesPaths = (await fs.readdir(LogDirectory)).filter(s3ObjectFilter);

  for await (const filePath of logFilesPaths) {
    const absoluteFilePath = path.resolve(LogDirectory, filePath);
    await parseLogFile(absoluteFilePath, parseLogFileCallback);
    totalFiles += 1;
    const stat = await fs.stat(absoluteFilePath);
    if (stat != null) {
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
  stderr(`Parsed: ${(endTime - startTime) / 1000} sec, ${format(totalFiles)} files, ${format(totalLogLines)} logs, ${format(totalBytes)} bytes`)
};

parseLogs();
