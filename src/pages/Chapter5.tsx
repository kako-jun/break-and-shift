import { useState, useEffect } from 'react';

type MahjongTile =
  | '1m'
  | '2m'
  | '3m'
  | '4m'
  | '5m'
  | '6m'
  | '7m'
  | '8m'
  | '9m'
  | '1p'
  | '2p'
  | '3p'
  | '4p'
  | '5p'
  | '6p'
  | '7p'
  | '8p'
  | '9p'
  | '1s'
  | '2s'
  | '3s'
  | '4s'
  | '5s'
  | '6s'
  | '7s'
  | '8s'
  | '9s'
  | '東'
  | '南'
  | '西'
  | '北'
  | '白'
  | '發'
  | '中';

const allTiles: MahjongTile[] = [
  '1m',
  '2m',
  '3m',
  '4m',
  '5m',
  '6m',
  '7m',
  '8m',
  '9m',
  '1p',
  '2p',
  '3p',
  '4p',
  '5p',
  '6p',
  '7p',
  '8p',
  '9p',
  '1s',
  '2s',
  '3s',
  '4s',
  '5s',
  '6s',
  '7s',
  '8s',
  '9s',
  '東',
  '南',
  '西',
  '北',
  '白',
  '發',
  '中',
];

export default function Chapter5() {
  const [trials, setTrials] = useState(0);
  const [tileCount, setTileCount] = useState<{ [key: string]: number }>({});
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<'normal' | 'fast' | 'ultra'>('normal');

  const [jankenCount, setJankenCount] = useState(0);
  const [aikoStreak, setAikoStreak] = useState(0);
  const [maxAikoStreak, setMaxAikoStreak] = useState(0);

  const drawTile = () => {
    const tile = allTiles[Math.floor(Math.random() * allTiles.length)];
    setTileCount(prev => ({ ...prev, [tile]: (prev[tile] || 0) + 1 }));
    setTrials(prev => prev + 1);
  };

  const playJanken = () => {
    const hands = ['グー', 'チョキ', 'パー'];
    const player = hands[Math.floor(Math.random() * 3)];
    const opponent = hands[Math.floor(Math.random() * 3)];

    setJankenCount(prev => prev + 1);

    if (player === opponent) {
      setAikoStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxAikoStreak) {
          setMaxAikoStreak(newStreak);
        }
        return newStreak;
      });
    } else {
      setAikoStreak(0);
    }
  };

  const reset = () => {
    setTrials(0);
    setTileCount({});
    setJankenCount(0);
    setAikoStreak(0);
    setMaxAikoStreak(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(
      () => {
        drawTile();
      },
      speed === 'ultra' ? 1 : speed === 'fast' ? 50 : 200
    );

    return () => clearInterval(interval);
  }, [isRunning, speed]);

  const totalDrawn = Object.values(tileCount).reduce((a, b) => a + b, 0);
  const expectedPerTile = totalDrawn / allTiles.length;
  const maxDeviation =
    totalDrawn > 0
      ? Math.max(
          ...Object.values(tileCount).map(count =>
            Math.abs(count - expectedPerTile)
          )
        )
      : 0;

  const deviationRate =
    expectedPerTile > 0 ? maxDeviation / expectedPerTile : 0;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">第五章：確率の森で迷う</h1>
        <p className="text-boundary-cyan text-lg">
          Lost in the Forest of Probability
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「『麻雀に流れはあるのか？』」</p>
          <p className="monologue">
            「その問いに答えるため、私は無数の牌を引き続けた。」
          </p>
          <p className="monologue">
            「偏りは必ず存在する。だが、それは予測できるのか？」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          麻雀牌ツモシミュレーション
        </h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">試行回数</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {trials.toLocaleString()}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">期待値/牌</p>
                <p className="text-2xl text-boundary-cyan font-mono">
                  {expectedPerTile.toFixed(2)}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">最大偏差</p>
                <p className="text-2xl text-yellow-400 font-mono">
                  {maxDeviation.toFixed(2)}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">偏差率</p>
                <p className="text-2xl text-red-400 font-mono">
                  {(deviationRate * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div>
              <label className="block text-boundary-mist mb-2">速度</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSpeed('normal')}
                  className={`px-4 py-2 rounded ${
                    speed === 'normal'
                      ? 'bg-boundary-cyan text-boundary-dark'
                      : 'bg-boundary-blue text-boundary-mist'
                  }`}
                >
                  通常
                </button>
                <button
                  onClick={() => setSpeed('fast')}
                  className={`px-4 py-2 rounded ${
                    speed === 'fast'
                      ? 'bg-boundary-cyan text-boundary-dark'
                      : 'bg-boundary-blue text-boundary-mist'
                  }`}
                >
                  高速
                </button>
                <button
                  onClick={() => setSpeed('ultra')}
                  className={`px-4 py-2 rounded ${
                    speed === 'ultra'
                      ? 'bg-boundary-cyan text-boundary-dark'
                      : 'bg-boundary-blue text-boundary-mist'
                  }`}
                >
                  超高速
                </button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={drawTile} className="button-primary">
                1回引く
              </button>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-3 rounded transition-all duration-300 ${
                  isRunning
                    ? 'bg-red-500 text-white'
                    : 'bg-boundary-cyan text-boundary-dark'
                }`}
              >
                {isRunning ? '停止' : '自動実行'}
              </button>
              <button onClick={reset} className="button-secondary">
                リセット
              </button>
            </div>

            {totalDrawn > 0 && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <h3 className="text-boundary-cyan text-sm">牌の分布</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {allTiles.map(tile => {
                    const count = tileCount[tile] || 0;
                    const deviation = Math.abs(count - expectedPerTile);
                    const intensity = Math.min(
                      deviation / (expectedPerTile || 1),
                      1
                    );
                    return (
                      <div
                        key={tile}
                        className="bg-boundary-dark p-2 rounded text-center"
                        style={{
                          backgroundColor: `rgba(74, 124, 140, ${0.2 + intensity * 0.8})`,
                        }}
                      >
                        <p className="text-boundary-silver text-sm">{tile}</p>
                        <p className="text-boundary-cyan font-mono text-xs">
                          {count}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          じゃんけんあいこシミュレーション
        </h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">試行回数</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {jankenCount}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">連続あいこ</p>
                <p className="text-2xl text-boundary-cyan font-mono">
                  {aikoStreak}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">最大記録</p>
                <p className="text-2xl text-yellow-400 font-mono">
                  {maxAikoStreak}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={playJanken} className="button-primary">
                じゃんけんポン！
              </button>
              <button
                onClick={() => {
                  for (let i = 0; i < 100; i++) playJanken();
                }}
                className="button-secondary"
              >
                100回実行
              </button>
            </div>

            {maxAikoStreak >= 5 && (
              <div className="bg-boundary-dark p-4 rounded border-2 border-yellow-400">
                <p className="text-yellow-400">
                  🎉 {maxAikoStreak}連続あいこ達成！
                </p>
                <p className="text-sm text-boundary-mist mt-2">
                  確率: 約{(Math.pow(1 / 3, maxAikoStreak) * 100).toFixed(6)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">
              「試行を重ねるほど、偏差率は小さくなっていく。」
            </p>
            <p className="monologue">
              「これが『大数の法則』——確率は、収束する。」
            </p>
            <p className="monologue">
              「短期的には偏りが生じる。それを『流れ』と呼ぶ者もいる。」
            </p>
            <p className="monologue">
              「だが、その流れを予測することはできない。」
            </p>
            <p className="monologue">
              「もし予測できるなら、株でも麻雀でも、勝ち続けられるはずだ。」
            </p>
            <p className="monologue text-boundary-cyan">
              「現実は、そうではない。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          偏りについて
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>• 偏りは必ず発生する（確率的必然）</li>
            <li>• 偏りの発生タイミングは予測不可能</li>
            <li>• 試行回数が増えるほど、全体は均等に近づく</li>
            <li>• 「流れを読む」は心理的効果であり、確率への影響はない</li>
            <li className="text-boundary-cyan">
              • 偏りを検知しても、次の結果は変わらない
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
