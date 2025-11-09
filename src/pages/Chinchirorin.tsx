import { useState } from 'react';
import DiceScene from '../components/3d/DiceScene';

interface RollResult {
  dice: [number, number, number];
  timestamp: number;
}

export default function Chinchirorin() {
  const [results, setResults] = useState<RollResult[]>([]);
  const [currentRoll, setCurrentRoll] = useState<[number, number, number]>([
    1, 1, 1,
  ]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const dice: [number, number, number] = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setCurrentRoll(dice);
      setResults(prev => [...prev, { dice, timestamp: Date.now() }]);
      setIsRolling(false);
    }, 2000);
  };

  const autoRoll = (count: number) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const dice: [number, number, number] = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1,
        ];
        setCurrentRoll(dice);
        setResults(prev => [...prev, { dice, timestamp: Date.now() }]);
      }, i * 100);
    }
  };

  const reset = () => {
    setResults([]);
    setCurrentRoll([1, 1, 1]);
  };

  // 統計計算
  const totalRolls = results.length;
  const diceCounts = [0, 0, 0, 0, 0, 0];
  results.forEach(r => {
    r.dice.forEach(d => {
      diceCounts[d - 1]++;
    });
  });

  const expectedPerFace = (totalRolls * 3) / 6;
  const maxDeviation = Math.max(
    ...diceCounts.map(count => Math.abs(count - expectedPerFace))
  );
  const deviationRate =
    expectedPerFace > 0 ? (maxDeviation / expectedPerFace) * 100 : 0;

  // ゾロ目の検出
  const triples = results.filter(
    r => r.dice[0] === r.dice[1] && r.dice[1] === r.dice[2]
  ).length;
  const triplesRate = totalRolls > 0 ? (triples / totalRolls) * 100 : 0;
  const expectedTriplesRate = (1 / 36) * 100; // 理論値：1/36 ≈ 2.78%

  // 偏り検出（カイ二乗検定の簡易版）
  let chiSquare = 0;
  diceCounts.forEach(count => {
    if (expectedPerFace > 0) {
      chiSquare += Math.pow(count - expectedPerFace, 2) / expectedPerFace;
    }
  });
  const isBiased = chiSquare > 12.592; // 自由度5、有意水準5%

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">
          チンチロリン：3Dサイコロシミュレーター
        </h1>
        <p className="text-boundary-cyan text-lg">3D Dice Physics Simulation</p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「サイコロは、最も古典的な確率装置だ。」</p>
          <p className="monologue">
            「物理法則に従って転がり、6つの面のいずれかに落ち着く。」
          </p>
          <p className="monologue">
            「それは本当にランダムなのか？偏りは存在するのか？」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          3D物理シミュレーション
        </h2>

        <DiceScene />

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="button-primary disabled:opacity-50"
          >
            {isRolling ? '振っています...' : 'サイコロを振る'}
          </button>
          <button onClick={() => autoRoll(100)} className="button-secondary">
            100回自動実行
          </button>
          <button onClick={() => autoRoll(1000)} className="button-secondary">
            1000回自動実行
          </button>
          <button onClick={reset} className="button-secondary">
            リセット
          </button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">現在の出目</h2>

        <div className="simulator-container">
          <div className="flex justify-center gap-4">
            {currentRoll.map((value, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-boundary-dark rounded-lg flex items-center justify-center border-2 border-boundary-cyan"
              >
                <span className="text-4xl text-boundary-silver font-bold">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {currentRoll[0] === currentRoll[1] &&
            currentRoll[1] === currentRoll[2] && (
              <div className="mt-4 text-center">
                <p className="text-yellow-400 text-xl">
                  🎉 ゾロ目！ {currentRoll[0]}のスリーカード
                </p>
              </div>
            )}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">統計分析</h2>

        <div className="simulator-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">総試行回数</p>
              <p className="text-2xl text-boundary-silver font-mono">
                {totalRolls}
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">期待値/面</p>
              <p className="text-2xl text-boundary-cyan font-mono">
                {expectedPerFace.toFixed(1)}
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">最大偏差</p>
              <p className="text-2xl text-yellow-400 font-mono">
                {maxDeviation.toFixed(1)}
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">偏差率</p>
              <p className="text-2xl text-red-400 font-mono">
                {deviationRate.toFixed(1)}%
              </p>
            </div>
          </div>

          {totalRolls > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-boundary-cyan">各面の出現回数</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {diceCounts.map((count, i) => {
                  const deviation = Math.abs(count - expectedPerFace);
                  const intensity =
                    expectedPerFace > 0 ? deviation / expectedPerFace : 0;
                  return (
                    <div
                      key={i}
                      className="bg-boundary-dark p-3 rounded"
                      style={{
                        backgroundColor: `rgba(74, 124, 140, ${0.2 + intensity * 0.8})`,
                      }}
                    >
                      <p className="text-boundary-silver text-center text-lg">
                        {i + 1}
                      </p>
                      <p className="text-boundary-cyan text-center font-mono">
                        {count}
                      </p>
                      <p className="text-xs text-boundary-mist text-center">
                        {((count / (totalRolls * 3)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {totalRolls > 0 && (
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <h3 className="text-boundary-cyan mb-2">ゾロ目の出現</h3>
                <p className="text-2xl text-boundary-silver font-mono">
                  {triples}回 / {totalRolls}回
                </p>
                <p className="text-sm text-boundary-mist mt-2">
                  出現率: {triplesRate.toFixed(2)}%
                </p>
                <p className="text-xs text-boundary-mist">
                  理論値: {expectedTriplesRate.toFixed(2)}%
                </p>
              </div>

              <div
                className={`p-4 rounded border-2 ${
                  isBiased
                    ? 'bg-red-900/20 border-red-400'
                    : 'bg-green-900/20 border-green-400'
                }`}
              >
                <h3 className="text-boundary-cyan mb-2">偏り検出</h3>
                <p className="text-sm text-boundary-mist">
                  カイ二乗値: {chiSquare.toFixed(2)}
                </p>
                <p className="text-lg font-bold mt-2">
                  {isBiased ? (
                    <span className="text-red-400">
                      ⚠️ 偏りが検出されました
                    </span>
                  ) : (
                    <span className="text-green-400">✓ 偏りは検出されず</span>
                  )}
                </p>
                <p className="text-xs text-boundary-mist mt-2">
                  {totalRolls < 100 && '※ 100回以上の試行で精度が上がります'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">
              「試行回数が少ないうちは、大きな偏りが見られる。」
            </p>
            <p className="monologue">
              「しかし、回数を重ねるごとに、各面の出現率は均等に近づく。」
            </p>
            <p className="monologue">
              「これが『大数の法則』——確率は、収束する。」
            </p>
            <p className="monologue">
              「ゾロ目の理論確率は約2.78%。つまり36回に1回。」
            </p>
            <p className="monologue">
              「偏りを検出できても、次の出目を予測することはできない。」
            </p>
            <p className="monologue text-boundary-cyan">
              「それが、確率の本質だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          偏り検出について
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>• カイ二乗検定：統計的手法で偏りの有無を判定（有意水準5%）</li>
            <li>
              • 偏りが検出されても、それは過去のデータであり、未来を予測できない
            </li>
            <li>• もし予測できるなら、カジノで勝ち続けられるはずだ</li>
            <li>
              • 物理的なサイコロには製造誤差があり、わずかな偏りが存在し得る
            </li>
            <li className="text-boundary-cyan">
              • しかし、その偏りを利用して利益を得ることは極めて困難
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
