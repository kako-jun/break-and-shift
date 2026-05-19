# Break and Shift

確率と割合の違いを体験するインタラクティブ学習サイト。

**「確率と割合の境界線」— Borderline of Chance and Share**

## 特徴

- 確率と割合の違いをインタラクティブに学習
- 3Dサイコロシミュレーション（Three.js + cannon-es 予定）
- 各種確率シミュレーター（PixiJS 予定）
- 統計的検定（カイ二乗検定）の可視化

## コンテンツ

### 本編

- 第一章：確率と割合の境界線
- 第二章：祈りは確率を変えない
- 第三章：進化のトーナメント
- 第四章：ガチャの天井と煽り文句
- 第五章：確率の森で迷う

### 特別編

- チンチロリン（3Dサイコロ）
- クレーンゲームの期待値操作
- スロットの演出詐欺
- じゃんけんの後出し必勝法
- 雨の中は走るべきか、歩くべきか
- 生存者バイアスと地球の突然死
- 前世と先祖の確率詐欺

## セットアップ

```bash
git clone https://github.com/kako-jun/break-and-shift.git
cd break-and-shift
pnpm install
pnpm dev
```

http://localhost:4321/ で開く（Astro の既定ポート）

## ビルド

```bash
pnpm build      # astro check + astro build → dist/
pnpm preview    # ビルド結果をローカル確認
```

## 技術スタック

- Astro 5（ファイルベースルーティング）
- React 18 + TypeScript（Astro Islands、`client:load` で hydration）
- PixiJS / Three.js + cannon-es（各 experiment のインタラクティブ実装、順次着手）
- Tailwind CSS 3
- pnpm（lockfile 管理）
- Cloudflare Pages git 連携で `break-and-shift.llll-ll.com` に自動デプロイ

## ライセンス

MIT
