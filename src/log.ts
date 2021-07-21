import fs from "fs/promises";
import { ungzip } from "node-gzip";
import { stderr } from "./util";

// https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-analyzing
export interface LogLine {
  date: string; // イベントが発生した日付。YYYY-MM-DD 形式です。
  time: string; // CloudFront サーバーがリクエストへの対応を完了した時刻 (UTC) (01:42:39 など)
  xEdgeLocation: string; // リクエストを処理したエッジロケーション。通常、エッジロケーションの地理的場所の近くにある空港の、国際航空運送協会 (IATA) の空港コードに対応します。
  scBytes: string; // サーバーがリクエストに応じてビューワーに送信したデータ (ヘッダーを含む) のバイトの合計数。
  cIp: string; // リクエスト元のビューワーの IP アドレス (192.0.2.183 または 2001:0db8:85a3:0000:0000:8a2e:0370:7334 など)。
  csMethod: string; // ビューワーから受信した HTTP リクエストメソッド。
  csHost: string; // CloudFront ディストリビューションのドメイン名 (d111111abcdef8.cloudfront.net など)。
  csUriStem: string; // パスとオブジェクトを識別するリクエスト URL の部分 (/images/cat.jpg など)。URL 内の疑問符 (?) およびクエリ文字列はログに含まれません。
  scStatus: string; // サーバーのレスポンスの HTTP ステータスコード (例: 200)。000は、サーバーがリクエストに応答する前に、ビューワーが接続を閉じたことを示します。
  csReferer: string; // リクエスト内の Referer ヘッダーの値。
  csUserAgent: string; // クエスト内の User-Agent ヘッダーの値。
  csUriQuery: string; // リクエスト URL のクエリ文字列の部分 (ある場合)。URL にクエリ文字列が含まれない場合、このフィールドの値はハイフン (-) です。
  csCookie: string; // 名前と値のペアおよび関連属性を含む、リクエスト内の Cookie ヘッダー。
  xEdgeResultType: string; // サーバーが、最後のバイトを渡した後で、レスポンスを分類した方法。
  xEdgeRequestId: string; // リクエストを一意に識別する不透明な文字列。CloudFront では、この文字列を x-amz-cf-id レスポンスヘッダーでも送信します。
  xHostHeader: string; // ビューワーが、このリクエストの Host ヘッダーに追加した値。
  csProtocol: string; // ビューワーリクエストのプロトコル (http、https、ws、wss のいずれか)。
  csBytes: string; // ビューワーがリクエストに含めたデータ (ヘッダーを含む) のバイトの合計数。
  timeTaken: string; // サーバーが、ビューワーのリクエストを受信してからレスポンスの最後のバイトを出力キューに書き込むまでの秒数。サーバーで 1000 分の 1 秒単位まで測定されます (例: 0.082)。
  xForwardedFor: string; // ビューワーが HTTP プロキシまたはロードバランサーを使用してリクエストを送信した場合、c-ip フィールドの値はプロキシまたはロードバランサーの IP アドレスです。
  sslProtocol: string; // リクエストが HTTPS を使用した場合、このフィールドには、リクエストとレスポンスを送信するためにビューワーとサーバーがネゴシエートした SSL/TLS プロトコルが含まれます。
  sslCipher: string; // リクエストが HTTPS を使用した場合、このフィールドには、リクエストとレスポンスを暗号化するためにビューワーとサーバーがネゴシエートした SSL/TLS 暗号が含まれます。
  xEdgeResponseResultType: string; // ビューワーにレスポンスを返す直前にサーバーがレスポンスを分類した方法
  csProtocolVersion: string; // ビューワーがリクエストで指定した HTTP バージョン。指定できる値には、HTTP/0.9、HTTP/1.0、HTTP/1.1、および HTTP/2.0 などがあります。
  fleStatus: string; // フィールドレベル暗号化がディストリビューション用に設定されている場合、このフィールドにはリクエストボディが正常に処理されたかどうかを示すコードが含まれます。
  fleEncryptedFields: string; // サーバーが暗号化してオリジンに転送したフィールドレベル暗号化フィールドの数。
  cPort: string; // 閲覧者からのリクエストのポート番号。
  timeToFirstByte: string; // サーバー上で測定される、要求を受信してから応答の最初のバイトを書き込むまでの秒数。
  xEdgeDetailedResultType: string; // x-edge-totalBytesPerPath-type フィールドが Error でない場合、このフィールドには x-edge-totalBytesPerPath-type と同じ値が含まれます。
  scContentType: string; // レスポンスの HTTP Content-Type ヘッダーの値。
  scContentLen: string; // レスポンスの HTTP Content-Length ヘッダーの値。
  scRangeStart: string; // レスポンスに HTTP Content-Range ヘッダーが含まれている場合、このフィールドには範囲の開始値が含まれます。
  scRangeEnd: string; // レスポンスに HTTP Content-Range ヘッダーが含まれている場合、このフィールドには範囲の終了値が含まれます。
}

export const parseLogFile = async (logFilePath: string, callback: (log: LogLine) => void) => {
  stderr(`Parse: ${logFilePath}`);
  const logBuffer = await fs.readFile(logFilePath).then(ungzip);

  let position = -1;
  while (true) {
    const nextBreak = logBuffer.indexOf(10, position + 1);
    if (nextBreak < 0) {
      break;
    }

    const log = logBuffer.slice(position, nextBreak).toString("utf-8").trim();
    position = nextBreak;
    if (log === "" || log.startsWith("#")) {
      continue;
    }

    const [
      date,
      time,
      xEdgeLocation,
      scBytes,
      cIp,
      csMethod,
      csHost,
      csUriStem,
      scStatus,
      csReferer,
      csUserAgent,
      csUriQuery,
      csCookie,
      xEdgeResultType,
      xEdgeRequestId,
      xHostHeader,
      csProtocol,
      csBytes,
      timeTaken,
      xForwardedFor,
      sslProtocol,
      sslCipher,
      xEdgeResponseResultType,
      csProtocolVersion,
      fleStatus,
      fleEncryptedFields,
      cPort,
      timeToFirstByte,
      xEdgeDetailedResultType,
      scContentType,
      scContentLen,
      scRangeStart,
      scRangeEnd,
    ] = log.split("\t");
    const logLine: LogLine = {
      date,
      time,
      xEdgeLocation,
      scBytes,
      cIp,
      csMethod,
      csHost,
      csUriStem,
      scStatus,
      csReferer,
      csUserAgent,
      csUriQuery,
      csCookie,
      xEdgeResultType,
      xEdgeRequestId,
      xHostHeader,
      csProtocol,
      csBytes,
      timeTaken,
      xForwardedFor,
      sslProtocol,
      sslCipher,
      xEdgeResponseResultType,
      csProtocolVersion,
      fleStatus,
      fleEncryptedFields,
      cPort,
      timeToFirstByte,
      xEdgeDetailedResultType,
      scContentType,
      scContentLen,
      scRangeStart,
      scRangeEnd,
    };
    callback(logLine);
  }
};
