# Break and Shift

確率と割合の違いを体験するインタラクティブ学習サイト。

**「確率と割合の境界線」— Borderline of Chance and Share**

## 特徴

- 確率と割合の違いをインタラクティブに学習
- 3Dサイコロシミュレーション（Three.js）
- 各種確率シミュレーター
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
npm install
npm run dev
```

http://localhost:5173/break-and-shift/ で開く

## 技術スタック

- React 18 + TypeScript
- Vite
- Three.js (@react-three/fiber, @react-three/drei)
- Tailwind CSS
- Recharts

## ライセンス

MIT
