# Break and Shift 開発者向けドキュメント

確率と割合の違いを体験するインタラクティブ学習サイト。

## プロジェクト構造

```
src/
├── main.tsx                     # エントリーポイント
├── App.tsx                      # ルーティング定義
├── components/
│   ├── Layout.tsx               # 共通レイアウト
│   └── 3d/
│       ├── Dice.tsx             # 3Dサイコロコンポーネント
│       └── DiceScene.tsx        # サイコロシーン
├── pages/
│   ├── Home.tsx                 # ホームページ
│   ├── Chapter1.tsx             # 確率と割合の境界線
│   ├── Chapter2.tsx             # 祈りは確率を変えない
│   ├── Chapter3.tsx             # 進化のトーナメント
│   ├── Chapter4.tsx             # ガチャの天井
│   ├── Chapter5.tsx             # 確率の森で迷う
│   ├── Chinchirorin.tsx         # 3Dサイコロシミュレーター
│   ├── ClawMachine.tsx          # クレーンゲーム
│   ├── SlotMachine.tsx          # スロット
│   ├── Janken.tsx               # じゃんけん
│   ├── RainWalk.tsx             # 雨の中を走るか歩くか
│   ├── SurvivorBias.tsx         # 生存者バイアス
│   └── AncestorProbability.tsx  # 前世と先祖
└── styles/
    └── index.css                # グローバルスタイル
```

## 技術詳細

### 3Dサイコロシミュレーション

- Three.js + React Three Fiber で物理シミュレーション
- 重力・反発・摩擦を簡易実装
- @react-three/drei の `RoundedBox` で丸みのあるサイコロ

### 統計検定

- カイ二乗検定でサイコロの偏りを検出
- 有意水準5%、自由度5で判定（臨界値: 12.592）

### 世界観

- 主人公「境界ユウ」が確率と割合の世界を調査する物語
- ダークでミステリアスなトーン
- 教育的かつエンタメ性のあるコンテンツ

## 依存パッケージ

| パッケージ         | 用途                   |
| ------------------ | ---------------------- |
| react              | UI                     |
| react-router-dom   | ルーティング           |
| three              | 3Dレンダリング         |
| @react-three/fiber | React + Three.js統合   |
| @react-three/drei  | Three.jsユーティリティ |
| cannon-es          | 物理エンジン           |
| recharts           | グラフ表示             |
| tailwindcss        | スタイリング           |

## ビルド

```bash
npm run dev          # 開発サーバー
npm run build        # プロダクションビルド
npm run lint         # ESLint
npm run format       # Prettier
```

## CI/CD

- **deploy.yml**: GitHub Pagesへ自動デプロイ
- **Husky + lint-staged**: pre-commit hooks

## 将来計画

- さらなるシミュレーターの追加
- モンテカルロシミュレーション
- 多言語対応（日本語・英語）
