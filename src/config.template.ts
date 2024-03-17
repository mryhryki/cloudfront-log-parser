import { LogLine } from "./lib/log";

/**
 * CloudFront のログが出力されているバケット
 */
export const S3Bucket = "your-bucket-name";

/**
 * CloudFront のログファイルが存在するプレフィックス
 */
export const S3Prefix = "your/cloudfront/log/prefix/";

/**
 * S3オブジェクトが分析対象か判定するフィルタ
 */
export const s3ObjectFilter = (key: string): boolean => {
  // オブジェクトのキーが `.gz` で終わるオブジェクトのみ分析する例
  return key.endsWith(".gz");
};

/**
 * 集計結果の型定義
 */
export interface ParseResult {
  // パスをキー、リクエストされた回数を値として持つ構造の例
  [date: string]: /* request count */number
}
export const getInitialParseResult = (): ParseResult => ({})

/**
 * パースしたログデータに１行単位で処理をするための関数
 *
 * ここに集計処理を入れて `parseResult` に値をセットする
 *
 * @param logLine １行単位でパースしたログデータ
 * @param result 集計結果（必要に応じて直接内容を編集する）
 */
export const parseLogLine = (logLine: LogLine, result: ParseResult): void => {
  // パスごとのリクエスト回数をカウントする例
  const { csUriStem } = logLine;
  result[csUriStem] ??= 0;
  result[csUriStem] += 1;
};

/**
 * 集計結果の編集
 *
 * ここでデータの整形や形式の変更、フィルタリングやソートなど必要な処理があれば実行する。
 * null を返却するとファイル出力されません。
 *
 * @param result 集計結果
 * @return string 最終的な出力内容
 */
export const editResult = (result: ParseResult): string => {
  return JSON.stringify(result, null, 2);
};
