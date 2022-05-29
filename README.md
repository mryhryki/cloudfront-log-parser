# cloudfront-log-parser

CloudFront の標準ログ（アクセスログ）をパースする TypeScript のソースコードです。
このリポジトリをクローンして、TypeScript を編集する前提で作っています。

CloudFront の標準ログ（アクセスログ）については、以下のドキュメントを参照してください。

[標準ログ (アクセスログ) の設定および使用 - Amazon CloudFront](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html)

## 使い方

### 初期化処理

```bash
$ npm install
$ npm run init
```

### config.ts の編集

`./src/config.ts` で個別の設定を変更できるようになっています。
設定値は以下になります。

- `S3Bucket`: CloudFrontの標準ログが出力されているS3バケット名
- `S3Prefix`: CloudFrontの標準ログが出力されているS3バケット内のプレフィックス
- `s3ObjectFilter`: ログファイル（S3のキー）で解析するか判定するためのフィルター関数
- `ParseResult`: 解析結果の（TypeScript用の）型定義
- `parseLogLine`: ログファイル内の１行ごとに呼ばれる集計用関数
- `editResult`: 集計結果（`ParseResult`）の編集関数

### 実行

```bash
$ npm start
```

### 型チェック

```bash
$ npm start
```
