import path from "path";

export const stderr = (log: string): void => {
  console.error(log)
}

const DataDirectory = path.resolve(__dirname, ".data");
export const getLogDirectory = (): string => path.resolve(DataDirectory, "cloudfront_logs")
export const getResultFilePath = (): string => path.resolve(DataDirectory, "result.md")
