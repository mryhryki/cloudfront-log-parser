import { LogLine } from "./log";

/**
 * CloudFront のログが出力されているバケット
 */
export const S3Bucket = '(CloudWatch Log Bucket)'

/**
 * CloudFront のログファイルが存在するプレフィックス
 */
export const S3Prefix = '(CloudWatch Log Prefix)'

/**
 * 集計結果（基本的に編集しない）
 */
export const parseResult: ParseResult = {};

/**
 * 集計結果の型定義
 */
interface ParseResult {
  [date: string]: /* request count */number
}

/**
 * １行単位でパースしたログデータに何らかの処理をするための関数
 *
 * @param logLine １行単位でパースしたログデータ
 */
export const parseLogLine = (logLine: LogLine): void => {
  // ここに集計処理を入れて `parseResult` に値をセットする
  // 以下はパスごとのリクエスト回数をカウントする例
  const { csUriStem } = logLine;
  parseResult[csUriStem] ??= 0;
  parseResult[csUriStem] += 1;
};

/**
 * 集計結果の編集
 *
 * @param result 最終的な出力データ
 */
export const editResult = (result: ParseResult): any => {
  // ここでデータの整形や形式の変更、フィルタリングやソートなど必要な処理があれば実行する
  return result
}
