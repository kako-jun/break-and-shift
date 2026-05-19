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
│   └── ComingSoon.tsx             # experiment 未実装のプレースホルダ（PixiJS 実装まで一時表示）
└── styles/
    └── globals.css                # グローバルスタイル + Tailwind directives
```

## 技術詳細

### Astro Islands 構成

- Astro ページ（`*.astro`）はファイルベースルーティングを提供する SSG
- 各ページは Layout.astro で共通装飾を巻き、React コンポーネントを `<Component client:load />` で島として埋め込む
- ルーティングは Astro が担当、`react-router-dom` は撤去済み
- ページ内のリンクは `import.meta.env.BASE_URL` ベース（CF Pages 配信では `/`）に解決

### Experiment（旧 HSP3Dish.js 統合）

- 旧構成: HSP3Dish JS（OpenHSP v3.7）を iframe で埋め込み。OpenHSP の Emscripten ポートが Emscripten 1.34.1 時代のままで現代 Emscripten 3.1.x と非互換 → 「Startup failed」で動かず撤去
- 現構成: **PixiJS を React コンポーネントとして各ページに直接埋め込む**方針（chinchirorin の 3D 物理だけ Three.js + cannon-es）
- 各 experiment コンポーネント (`src/react/Chinchirorin.tsx` 等) は現在 `<ComingSoon />` プレースホルダ。本実装は別 Issue で順次対応
- iframe ラッパー (`HspEmbed.tsx`) は削除済み。Astro Islands で React コンポーネントを直接 hydrate するので iframe 不要

### 統計検定

- カイ二乗検定でサイコロの偏りを検出
- 有意水準5%、自由度5で判定（臨界値: 12.592）

### 世界観

- 主人公「境界ユウ」が確率と割合の世界を調査する物語
- ダークでミステリアスなトーン
- 教育的かつエンタメ性のあるコンテンツ

## 依存パッケージ

| パッケージ        | 用途                                                     |
| ----------------- | -------------------------------------------------------- |
| astro             | SSG + Islands                                            |
| @astrojs/react    | React 統合                                               |
| @astrojs/tailwind | Tailwind 統合                                            |
| @astrojs/sitemap  | sitemap 生成                                             |
| react / react-dom | Islands 本体                                             |
| tailwindcss       | スタイリング                                             |
| pixi.js (予定)    | インタラクティブシミュレーション（React 内に直接 mount） |
| three.js (予定)   | chinchirorin の 3D サイコロ物理（+ cannon-es）           |

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

- **CF Pages git 連携**: main への push で Astro ビルド → `break-and-shift.llll-ll.com` に自動デプロイ
- **Husky + lint-staged**: pre-commit hooks（eslint + prettier）

## 将来計画

- さらなるシミュレーターの追加
- モンテカルロシミュレーション
- 多言語対応（日本語・英語）

## デザインシステム

UIの生成・修正時は `DESIGN.md` に定義されたデザインシステムに従うこと。定義外の色・フォント・スペーシングを勝手に使わない。
