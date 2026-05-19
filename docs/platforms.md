# 動作環境・配布

## 対応プラットフォーム

### ブラウザ

すべての機能はブラウザ上で完結する。インストール不要。

- Chrome / Edge（推奨）
- Firefox
- Safari

PixiJS（実装予定） による物理演算・3D 描画（チンチロリン / クレーンゲーム / じゃんけん / 雨の中の歩行 / 生存者バイアス / 先祖の確率）には WebGL が必要だが、すべてのモダンブラウザでサポートされている。モバイルでは動作が重い場合がある。

Canvas 描画（スロット）も同様にどのブラウザでも動作する。

---

### GitHub Pages

公開URLにて配信。

- リポジトリ：`https://github.com/kako-jun/break-and-shift`
- 公開URL：`https://kako-jun.github.io/break-and-shift/`
- ベースパス：`/break-and-shift`（Astro `base` 設定および iframe `import.meta.env.BASE_URL`）

デプロイは `.github/workflows/deploy.yml` による自動化。
`main` ブランチへのプッシュで、ビルド（`pnpm install` → `pnpm build`）と GitHub Pages へのデプロイが走る。
