# フリーズドライ味噌汁専門ECサイト

Next.js + TypeScript + IndexedDBを使用したフリーズドライ味噌汁専門のECサイトです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI**: Material-UI (@mui/material)
- **状態管理**: Zustand
- **データベース**: IndexedDB (idb)
- **認証**: NextAuth.js
- **バリデーション**: Zod
- **HTTP クライアント**: Axios
- **フォーム**: React Hook Form

## プロジェクト構造

```
miso-soup-ec/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API ルート
│   │   ├── admin/             # 管理画面
│   │   ├── auth/              # 認証ページ
│   │   │   ├── login/         # ログインページ
│   │   │   └── register/      # 新規登録ページ
│   │   ├── (user)/            # ユーザー向けページ
│   │   ├── globals.css        # グローバルスタイル
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # ホームページ
│   ├── components/            # Reactコンポーネント
│   │   ├── ui/                # 汎用UIコンポーネント
│   │   │   └── Button.tsx     # ボタンコンポーネント
│   │   └── layout/            # レイアウトコンポーネント
│   │       └── Header.tsx     # ヘッダーコンポーネント
│   ├── lib/                   # ユーティリティ・ライブラリ
│   │   └── indexeddb.ts       # IndexedDB操作
│   ├── types/                 # TypeScript型定義
│   │   └── index.ts           # 共通型定義
│   └── hooks/                 # カスタムフック
│       └── useIndexedDB.ts    # IndexedDB操作フック
├── .env.example               # 環境変数テンプレート
├── .eslintrc.json            # ESLint設定
├── next.config.js            # Next.js設定
├── package.json              # 依存関係
├── postcss.config.js         # PostCSS設定
├── tailwind.config.js        # Tailwind CSS設定
└── tsconfig.json             # TypeScript設定
```

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env.local`にコピーして、必要な環境変数を設定してください。

```bash
cp .env.example .env.local
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 主な機能

### 実装済み機能

- ✅ プロジェクト初期セットアップ
- ✅ Next.js + TypeScript環境構築
- ✅ Tailwind CSS設定
- ✅ IndexedDBスキーマ定義
- ✅ 基本的なコンポーネント（Button, Header）
- ✅ 認証ページ（ログイン・新規登録）
- ✅ カスタムフック（IndexedDB操作）
- ✅ 型定義

### 今後実装予定の機能

- 🔄 商品一覧ページ
- 🔄 商品詳細ページ
- 🔄 ショッピングカート機能
- 🔄 注文・決済機能
- 🔄 注文履歴
- 🔄 管理画面（商品管理・注文管理）
- 🔄 ユーザープロフィール管理

## データベース設計（IndexedDB）

### テーブル構造

1. **users** - ユーザー情報
2. **products** - 商品情報
3. **orders** - 注文情報
4. **cart** - カート情報

詳細なスキーマは `src/lib/indexeddb.ts` を参照してください。

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# ESLintチェック
npm run lint
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。