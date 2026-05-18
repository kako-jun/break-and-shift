# 動作環境・配布

## 対応プラットフォーム

### ブラウザ

すべての機能はブラウザ上で完結する。インストール不要。

- Chrome / Edge（推奨）
- Firefox
- Safari

HSP3Dish.js iframe による物理演算・3D 描画（チンチロリン / クレーンゲーム / じゃんけん / 雨の中の歩行 / 生存者バイアス / 先祖の確率）には WebGL が必要だが、すべてのモダンブラウザでサポートされている。モバイルでは動作が重い場合がある。

Canvas 描画（スロット）も同様にどのブラウザでも動作する。

---

### GitHub Pages

公開URLにて配信。

- リポジトリ：`https://github.com/kako-jun/break-and-shift`
- 公開URL：`https://kako-jun.github.io/break-and-shift/`
- ベースパス：`/break-and-shift`（Astro `base` 設定および iframe `import.meta.env.BASE_URL`）

デプロイは `.github/workflows/deploy.yml` による自動化。
`main` ブランチへのプッシュで、ビルド（`pnpm install` → `pnpm build`）と GitHub Pages へのデプロイが走る。

HSP 実験の `.data` バンドル（`hsp/{experiment}/index.html` 配下）は `.github/workflows/build-hsp.yml` で別途コンパイルされ、deploy.yml が artifact を `dist/hsp/{experiment}/` に展開する。

---

## ローカルでの動作確認

```bash
git clone https://github.com/kako-jun/break-and-shift.git
cd break-and-shift
pnpm install
pnpm dev
```

開発サーバーは `http://localhost:4321/break-and-shift/` で起動する。

> HSP iframe をローカルで動かしたい場合は、HSP の `.data` バンドルを別途コンパイルして `public/hsp/{experiment}/` に配置する。CI なしのローカル開発では iframe が 404 になるが、UI 側の動作確認には支障ない。

---

## ビルド

```bash
pnpm build
```

`dist/` ディレクトリに静的ファイルが生成される（`astro check` + `astro build`）。

---

## 技術スタック

| 用途               | 採用技術                                    |
| ------------------ | ------------------------------------------- |
| 静的サイト生成     | Astro 5 + TypeScript                        |
| インタラクティブ層 | React 18 (Astro Islands、`client:load`)     |
| ルーティング       | Astro ファイルベースルーティング            |
| 物理演算・3D / 2D  | HSP3Dish.js（iframe 埋め込み、`hsp/` 配下） |
| スタイリング       | Tailwind CSS                                |
| パッケージ管理     | pnpm                                        |
| コード品質         | ESLint + Prettier + Husky（pre-commit）     |
| デプロイ           | GitHub Pages（base: `/break-and-shift`）    |

---

## 制約・注意事項

- モバイルでの HSP3Dish.js iframe は動作が重い可能性がある
- 大量実行（100 回以上のシミュレーション）はクライアント計算で時間がかかる
- すべての計算はクライアントサイドで完結する。サーバー通信なし
- GitHub Pages のベースパスは `/break-and-shift` に固定されている
- React Islands はすべて `client:load` で hydration（軽量化したい場合は `client:visible` / `client:idle` への切替が候補）
