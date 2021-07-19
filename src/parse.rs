use flate2::read::GzDecoder;
use regex::Regex;
use serde::Serialize;
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;
use std::{fs, io};

fn decompress(log_file_path: &Path) -> String {
    let file = File::open(log_file_path).unwrap();
    let mut log = String::new();
    GzDecoder::new(file).read_to_string(&mut log).unwrap();
    log
}

pub fn parse(cb: fn(log: LogData)) -> io::Result<()> {
    let log_directory = "/Users/moriya/cloudfront_logs";
    let file_matcher = Regex::new(r"\.gz$").unwrap();

    for entry in fs::read_dir(log_directory)? {
        let path = entry?.path();
        if !path.is_file() || !file_matcher.is_match(path.to_str().unwrap()) {
            continue;
        }

        let log = decompress(path.as_path());
        for line in log.split("\n") {
            if line.is_empty() || line.starts_with("#") {
                continue;
            }
            let elements: Vec<&str> = line.split("\t").collect();
            let log_data = LogData {
                date: elements.get(0).unwrap().to_string(),
                time: elements.get(1).unwrap().to_string(),
                x_edge_location: elements.get(2).unwrap().to_string(),
                sc_bytes: elements.get(3).unwrap().to_string(),
                c_ip: elements.get(4).unwrap().to_string(),
                cs_method: elements.get(5).unwrap().to_string(),
                cs_host: elements.get(6).unwrap().to_string(),
                cs_uri_stem: elements.get(7).unwrap().to_string(),
                sc_status: elements.get(8).unwrap().to_string(),
                cs_referer: elements.get(9).unwrap().to_string(),
                cs_user_agent: elements.get(10).unwrap().to_string(),
                cs_uri_query: elements.get(11).unwrap().to_string(),
                cs_cookie: elements.get(12).unwrap().to_string(),
                x_edge_result_type: elements.get(13).unwrap().to_string(),
                x_edge_request_id: elements.get(14).unwrap().to_string(),
                x_host_header: elements.get(15).unwrap().to_string(),
                cs_protocol: elements.get(16).unwrap().to_string(),
                cs_bytes: elements.get(17).unwrap().to_string(),
                time_taken: elements.get(18).unwrap().to_string(),
                x_forwarded_for: elements.get(19).unwrap().to_string(),
                ssl_protocol: elements.get(20).unwrap().to_string(),
                ssl_cipher: elements.get(21).unwrap().to_string(),
                x_edge_response_result_type: elements.get(22).unwrap().to_string(),
                cs_protocol_version: elements.get(23).unwrap().to_string(),
                fle_status: elements.get(24).unwrap().to_string(),
                fle_encrypted_fields: elements.get(25).unwrap().to_string(),
                c_port: elements.get(26).unwrap().to_string(),
                time_to_first_byte: elements.get(27).unwrap().to_string(),
                x_edge_detailed_result_type: elements.get(28).unwrap().to_string(),
                sc_content_type: elements.get(29).unwrap().to_string(),
                sc_content_len: elements.get(30).unwrap().to_string(),
                sc_range_start: elements.get(31).unwrap().to_string(),
                sc_range_end: elements.get(32).unwrap().to_string(),
            };
            cb(log_data);
        }
    }

    Ok(())
}

// https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-analyzing
#[derive(Debug, Serialize)]
pub struct LogData {
    pub date: String,               // イベントが発生した日付。YYYY-MM-DD 形式です。
    pub time: String, // CloudFront サーバーがリクエストへの対応を完了した時刻 (UTC) (01:42:39 など)
    pub x_edge_location: String, // リクエストを処理したエッジロケーション。通常、エッジロケーションの地理的場所の近くにある空港の、国際航空運送協会 (IATA) の空港コードに対応します。
    pub sc_bytes: String, // サーバーがリクエストに応じてビューワーに送信したデータ (ヘッダーを含む) のバイトの合計数。
    pub c_ip: String, // リクエスト元のビューワーの IP アドレス (192.0.2.183 または 2001:0db8:85a3:0000:0000:8a2e:0370:7334 など)。
    pub cs_method: String, // ビューワーから受信した HTTP リクエストメソッド。
    pub cs_host: String, // CloudFront ディストリビューションのドメイン名 (d111111abcdef8.cloudfront.net など)。
    pub cs_uri_stem: String, // パスとオブジェクトを識別するリクエスト URL の部分 (/images/cat.jpg など)。URL 内の疑問符 (?) およびクエリ文字列はログに含まれません。
    pub sc_status: String, // サーバーのレスポンスの HTTP ステータスコード (例: 200)。000は、サーバーがリクエストに応答する前に、ビューワーが接続を閉じたことを示します。
    pub cs_referer: String, // リクエスト内の Referer ヘッダーの値。
    pub cs_user_agent: String, // クエスト内の User-Agent ヘッダーの値。
    pub cs_uri_query: String, // リクエスト URL のクエリ文字列の部分 (ある場合)。URL にクエリ文字列が含まれない場合、このフィールドの値はハイフン (-) です。
    pub cs_cookie: String, // 名前と値のペアおよび関連属性を含む、リクエスト内の Cookie ヘッダー。
    pub x_edge_result_type: String, // サーバーが、最後のバイトを渡した後で、レスポンスを分類した方法。
    pub x_edge_request_id: String, // リクエストを一意に識別する不透明な文字列。CloudFront では、この文字列を x-amz-cf-id レスポンスヘッダーでも送信します。
    pub x_host_header: String,     // ビューワーが、このリクエストの Host ヘッダーに追加した値。
    pub cs_protocol: String, // ビューワーリクエストのプロトコル (http、https、ws、wss のいずれか)。
    pub cs_bytes: String, // ビューワーがリクエストに含めたデータ (ヘッダーを含む) のバイトの合計数。
    pub time_taken: String, // サーバーが、ビューワーのリクエストを受信してからレスポンスの最後のバイトを出力キューに書き込むまでの秒数。サーバーで 1000 分の 1 秒単位まで測定されます (例: 0.082)。
    pub x_forwarded_for: String, // ビューワーが HTTP プロキシまたはロードバランサーを使用してリクエストを送信した場合、c-ip フィールドの値はプロキシまたはロードバランサーの IP アドレスです。
    pub ssl_protocol: String, // リクエストが HTTPS を使用した場合、このフィールドには、リクエストとレスポンスを送信するためにビューワーとサーバーがネゴシエートした SSL/TLS プロトコルが含まれます。
    pub ssl_cipher: String, // リクエストが HTTPS を使用した場合、このフィールドには、リクエストとレスポンスを暗号化するためにビューワーとサーバーがネゴシエートした SSL/TLS 暗号が含まれます。
    pub x_edge_response_result_type: String, // ビューワーにレスポンスを返す直前にサーバーがレスポンスを分類した方法
    pub cs_protocol_version: String, // ビューワーがリクエストで指定した HTTP バージョン。指定できる値には、HTTP/0.9、HTTP/1.0、HTTP/1.1、および HTTP/2.0 などがあります。
    pub fle_status: String, // フィールドレベル暗号化がディストリビューション用に設定されている場合、このフィールドにはリクエストボディが正常に処理されたかどうかを示すコードが含まれます。
    pub fle_encrypted_fields: String, // サーバーが暗号化してオリジンに転送したフィールドレベル暗号化フィールドの数。
    pub c_port: String,               // 閲覧者からのリクエストのポート番号。
    pub time_to_first_byte: String, // サーバー上で測定される、要求を受信してから応答の最初のバイトを書き込むまでの秒数。
    pub x_edge_detailed_result_type: String, // x-edge-totalBytesPerPath-type フィールドが Error でない場合、このフィールドには x-edge-totalBytesPerPath-type と同じ値が含まれます。
    pub sc_content_type: String,             // レスポンスの HTTP Content-Type ヘッダーの値。
    pub sc_content_len: String,              // レスポンスの HTTP Content-Length ヘッダーの値。
    pub sc_range_start: String, // レスポンスに HTTP Content-Range ヘッダーが含まれている場合、このフィールドには範囲の開始値が含まれます。
    pub sc_range_end: String, // レスポンスに HTTP Content-Range ヘッダーが含まれている場合、このフィールドには範囲の終了値が含まれます。
}
