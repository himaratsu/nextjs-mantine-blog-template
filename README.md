microCMS を利用したブログのテンプレートです。

![](https://images.microcms-assets.io/assets/bc8d294480f849c1999b5e57accb2172/873cb703f310489b96231e3a7456767e/CleanShot%202023-04-27%20at%2009.39.09%402x.png)

## プレビューサイト

https://nextjs-mantine-blog-template.vercel.app/

## 主な機能

- 記事一覧
- 記事詳細ページ
- ページング
- カテゴリ
- 検索
- カルーセルバナー

Jamstack 構成で作られているため、ページは高速に表示されます。

## 環境変数の設定

ルート直下に`.env.local`ファイルを作成し、下記の情報を入力してください。

```
MICROCMS_API_KEY=xxxxxxxxxx
MICROCMS_SERVICE_DOMAIN=xxxxxxxxxx
```

`MICROCMS_API_KEY`  
microCMS 管理画面の「サービス設定 > API キー」から確認することができます。

`MICROCMS_SERVICE_DOMAIN`  
microCMS 管理画面の URL（https://xxxxxxxx.microcms.io）の xxxxxxxx の部分です。

## 開発の仕方

1. パッケージのインストール

```bash
yarn install
```

2. 開発環境の起動

```bash
yarn dev
```

3. 開発環境へのアクセス  
   [http://localhost:3000](http://localhost:3000)にアクセス

## Vercel へのデプロイ

[Vercel Platform](https://vercel.com/new?filter=next.js)から簡単にデプロイが可能です。

リポジトリを紐付け、環境変数を Environment Variables に登録しましょう。
