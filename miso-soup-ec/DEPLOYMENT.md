# GitHub Pagesへのデプロイ手順

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

## 初回セットアップ

1. GitHubリポジトリの設定で、以下を確認してください：
   - **Settings** > **Pages** > **Source** を "GitHub Actions" に設定
   - **Actions** > **General** > **Workflow permissions** で "Read and write permissions" を有効化

2. リポジトリ名が `miso-soup-ec` でない場合は、`next.config.js` の `basePath` と `assetPrefix` を適切なリポジトリ名に変更してください。

## デプロイプロセス

1. `main` ブランチにプッシュすると、自動的にビルドとデプロイが開始されます
2. GitHub Actionsのワークフローが以下を実行します：
   - Node.js環境のセットアップ
   - 依存関係のインストール
   - Next.jsプロジェクトのビルド（静的エクスポート）
   - GitHub Pagesへのデプロイ

## 設定ファイル

- `.github/workflows/deploy.yml`: GitHub Actionsワークフロー
- `next.config.js`: GitHub Pages用のNext.js設定
  - `output: 'export'`: 静的エクスポート
  - `trailingSlash: true`: GitHub Pages用
  - `images.unoptimized: true`: 画像最適化を無効化
  - `basePath` と `assetPrefix`: サブパス設定

## 注意事項

- このプロジェクトは静的サイトとしてエクスポートされるため、サーバーサイド機能（API Routes、SSR等）は使用できません
- 画像最適化は無効化されています
- 全てのリンクは相対パスまたは適切なベースパスを使用してください

## トラブルシューティング

- デプロイが失敗する場合は、GitHub Actionsのログを確認してください
- 404エラーが発生する場合は、リンクのパスが正しいか確認してください
- リポジトリ名を変更した場合は、`next.config.js` の設定も更新してください