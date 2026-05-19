# Break and Shift 開発者向けドキュメント

確率と割合の違いを体験するインタラクティブ学習サイト。

## プロジェクト構造

```
src/
├── env.d.ts                       # Astro 型参照
├── astro.config.mjs               # site: break-and-shift.llll-ll.com, integrations
├── layouts/
│   └── Layout.astro               # 共通レイアウト（ヘッダー・サイドバー・フッター）
├── components/
│   └── Sidebar.astro              # サイドバーナビゲーション
├── data/
│   └── chapters.ts                # 章定義（Astro / React 共通参照）
├── pages/                         # ファイルベースルーティング（Astro）
│   ├── index.astro                # トップ
│   ├── chapter1.astro 〜 chapter5.astro
│   ├── chinchirorin.astro / claw-machine.astro / slot-machine.astro
│   ├── janken.astro / rain-walk.astro / survivor-bias.astro / ancestor-probability.astro
│   └── 404.astro
├── react/                         # React Islands（client:load で hydration）
│   ├── Home.tsx
│   ├── Chapter1.tsx 〜 Chapter5.tsx
│   ├── Chinchirorin.tsx 〜 AncestorProbability.tsx
│   ├── NotFound.tsx
│   └── HspEmbed.tsx               # HSP3Dish.js iframe ラッパー（HSP 系 7 ページから利用）
└── styles/
    └── globals.css                # グローバルスタイル + Tailwind directives
```

## 技術詳細

### Astro Islands 構成

- Astro ページ（`*.astro`）はファイルベースルーティングを提供する SSG
- 各ページは Layout.astro で共通装飾を巻き、React コンポーネントを `<Component client:load />` で島として埋め込む
- ルーティングは Astro が担当、`react-router-dom` は撤去済み
- ページ内のリンクは `import.meta.env.BASE_URL` ベース（CF Pages 配信では `/`）に解決

### HSP3Dish.js 統合

- iframe で `${BASE_URL}/hsp/${experiment}/index.html` を読み込む
- `public/hsp/` は空。`build-hsp.yml` で artifact 化される仕組みが残っているが、CF Pages 移行後は連携未配線。HSP 部分は別 Issue で再配線予定

### 統計検定

- カイ二乗検定でサイコロの偏りを検出
- 有意水準5%、自由度5で判定（臨界値: 12.592）

### 世界観

- 主人公「境界ユウ」が確率と割合の世界を調査する物語
- ダークでミステリアスなトーン
- 教育的かつエンタメ性のあるコンテンツ

## 依存パッケージ

| パッケージ        | 用途                                       |
| ----------------- | ------------------------------------------ |
| astro             | SSG + Islands                              |
| @astrojs/react    | React 統合                                 |
| @astrojs/tailwind | Tailwind 統合                              |
| @astrojs/sitemap  | sitemap 生成                               |
| react / react-dom | Islands 本体                               |
| tailwindcss       | スタイリング                               |
| HSP3Dish.js       | インタラクティブシミュレーション（iframe） |

パッケージマネージャは pnpm を採用。

## ビルド

```bash
pnpm dev          # 開発サーバー (Astro)
pnpm build        # astro check + astro build → dist/
pnpm preview      # ビルド結果をローカル確認
pnpm lint         # ESLint
pnpm format       # Prettier
```

## CI/CD

- **deploy.yml**: pnpm でビルド → `dist/hsp/{experiment}/` に HSP artifact 展開 → GitHub Pages
- **build-hsp.yml**: HSP 各 experiment を `hsp-{experiment}` artifact として保存（無変更）
- **Husky + lint-staged**: pre-commit hooks（eslint + prettier）

## 将来計画

- さらなるシミュレーターの追加
- モンテカルロシミュレーション
- 多言語対応（日本語・英語）

## デザインシステム

UIの生成・修正時は `DESIGN.md` に定義されたデザインシステムに従うこと。定義外の色・フォント・スペーシングを勝手に使わない。
