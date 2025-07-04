# GitHub Pagesへのデプロイ手順

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

## 初回セットアップ

1. GitHubリポジトリの設定で、以下を確認してください：
   - **Settings** > **Pages** > **Source** を "GitHub Actions" に設定
   - **Actions** > **General** > **Workflow permissions** で "Read and write permissions" を有効化

2. カスタムドメインを使用しない場合、通常はサブパス設定は不要です。
   サブパス（例：`https://username.github.io/repository-name/`）が必要な場合は、
   `next.config.js` の `basePath` と `assetPrefix` のコメントアウトを解除し、適切なリポジトリ名に変更してください。

## デプロイプロセス

1. `main` または `master` ブランチにプッシュすると、自動的にビルドとデプロイが開始されます
2. 手動でワークフローを実行することも可能です（Actions タブから）
3. GitHub Actionsのワークフローが以下を実行します：
   - Node.js環境のセットアップ
   - 依存関係のインストール
   - Next.jsプロジェクトのビルド（静的エクスポート）
   - GitHub Pagesへのデプロイ

## 設定ファイル

- `.github/workflows/deploy.yml`: GitHub Actionsワークフロー
  - `main` と `master` ブランチの両方に対応
  - 手動実行（workflow_dispatch）に対応
  - ビルドとデプロイを分離したジョブ構成
- `next.config.js`: GitHub Pages用のNext.js設定
  - `output: 'export'`: 静的エクスポート
  - `trailingSlash: true`: GitHub Pages用
  - `images.unoptimized: true`: 画像最適化を無効化
- `public/.nojekyll`: Jekyll処理を無効化

## 注意事項

- このプロジェクトは静的サイトとしてエクスポートされるため、サーバーサイド機能（API Routes、SSR等）は使用できません
- 画像最適化は無効化されています
- 全てのリンクは相対パスまたは適切なベースパスを使用してください

## トラブルシューティング

- デプロイが失敗する場合は、GitHub Actionsのログを確認してください
- ワークフローが実行されない場合は、ブランチ名が `main` または `master` であることを確認してください
- 404エラーが発生する場合は、リンクのパスが正しいか確認してください
- サブパスが必要な場合は、`next.config.js` の該当行のコメントアウトを解除してください