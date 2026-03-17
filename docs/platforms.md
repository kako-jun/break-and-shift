# 動作環境・配布

## 対応プラットフォーム

### ブラウザ

すべての機能はブラウザ上で完結する。インストール不要。

- Chrome / Edge（推奨）
- Firefox
- Safari

3Dシーン（チンチロリンページ）にはWebGL 2.0が必要。
すべてのモダンブラウザでサポートされているが、モバイルでは動作が重い場合がある。

Canvas描画（スロット・じゃんけん・クレーンゲーム）はどのブラウザでも動作する。

---

### GitHub Pages

公開URLにて配信。

- リポジトリ：`https://github.com/kako-jun/break-and-shift`
- 公開URL：`https://kako-jun.github.io/break-and-shift/`
- ベースパス：`/break-and-shift`（Vite設定およびBrowserRouterのbasename）

デプロイは `.github/workflows/deploy.yml` による自動化。
`main` ブランチへのプッシュで、ビルドとGitHub Pagesへのデプロイが走る。

---

## ローカルでの動作確認

```bash
git clone https://github.com/kako-jun/break-and-shift.git
cd break-and-shift
npm install
npm run dev
```

開発サーバーは `http://localhost:5173/break-and-shift/` で起動する。

---

## ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが生成される。

---

## 技術スタック

| 用途              | 採用技術                                          |
| ----------------- | ------------------------------------------------- |
| UI フレームワーク | React 18 + TypeScript                             |
| ビルドツール      | Vite                                              |
| ルーティング      | react-router-dom v6                               |
| 3D描画            | Three.js + @react-three/fiber + @react-three/drei |
| 2D描画            | HTML Canvas（ブラウザ標準）                       |
| グラフ            | Recharts                                          |
| スタイリング      | Tailwind CSS                                      |
| コード品質        | ESLint + Prettier + Husky（pre-commit）           |

---

## 制約・注意事項

- モバイルでの3Dシーンは動作が重い可能性がある
- スロットおよびじゃんけんの自動実行は非同期で逐次処理するため、大量実行（100回以上）は時間がかかる
- すべての計算はクライアントサイドで完結する。サーバー通信なし
- GitHub Pagesのベースパスは `/break-and-shift` に固定されている
