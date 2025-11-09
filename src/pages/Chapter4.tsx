import { useState } from 'react';

type RarityType = 'SSR' | 'SR' | 'R' | 'N';

export default function Chapter4() {
  const [hasCeiling, setHasCeiling] = useState(true);
  const [ceiling, setCeiling] = useState(100);
  const [doubleRate, setDoubleRate] = useState(false);
  const [pulls, setPulls] = useState(0);
  const [results, setResults] = useState<{ [key in RarityType]: number }>({
    SSR: 0,
    SR: 0,
    R: 0,
    N: 0,
  });
  const [lastSSR, setLastSSR] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const baseRates = {
    SSR: 0.01, // 1%
    SR: 0.05, // 5%
    R: 0.2, // 20%
    N: 0.74, // 74%
  };

  const currentRates = doubleRate
    ? { ...baseRates, SSR: baseRates.SSR * 2, SR: baseRates.SR * 2 }
    : baseRates;

  const pullPrice = 300;

  const pullGacha = (count: number) => {
    const newResults = { ...results };
    let currentLastSSR = lastSSR;

    for (let i = 0; i < count; i++) {
      currentLastSSR++;

      // 天井到達チェック
      if (hasCeiling && currentLastSSR >= ceiling) {
        newResults.SSR++;
        currentLastSSR = 0;
        continue;
      }

      const rand = Math.random();
      let cumProb = 0;

      for (const [rarity, rate] of Object.entries(currentRates)) {
        cumProb += rate;
        if (rand < cumProb) {
          newResults[rarity as RarityType]++;
          if (rarity === 'SSR') {
            currentLastSSR = 0;
          }
          break;
        }
      }
    }

    setPulls(prev => prev + count);
    setResults(newResults);
    setLastSSR(currentLastSSR);
    setTotalSpent(prev => prev + count * pullPrice);
  };

  const reset = () => {
    setPulls(0);
    setResults({ SSR: 0, SR: 0, R: 0, N: 0 });
    setLastSSR(0);
    setTotalSpent(0);
  };

  const totalPulled = Object.values(results).reduce((a, b) => a + b, 0);
  const actualSSRRate = totalPulled > 0 ? (results.SSR / totalPulled) * 100 : 0;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">第四章：ガチャの天井と煽り文句</h1>
        <p className="text-boundary-cyan text-lg">
          The Ceiling of Gacha and Misleading Phrases
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「『今なら当たりやすい！』」</p>
          <p className="monologue">「その言葉に、確率の変化はない。」</p>
          <p className="monologue">
            「ガチャの天井は、確率を保証するシステムだ。」
          </p>
          <p className="monologue">
            「だが、天井がなければ——永遠に当たらない可能性もある。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">ガチャ設定</h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-boundary-mist">天井システム</span>
              <button
                onClick={() => setHasCeiling(!hasCeiling)}
                className={`px-4 py-2 rounded transition-all ${
                  hasCeiling
                    ? 'bg-boundary-cyan text-boundary-dark'
                    : 'bg-boundary-blue text-boundary-mist'
                }`}
              >
                {hasCeiling ? 'あり' : 'なし'}
              </button>
            </div>

            {hasCeiling && (
              <div>
                <label className="block text-boundary-mist mb-2">
                  天井: {ceiling}回
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={ceiling}
                  onChange={e => setCeiling(Number(e.target.value))}
                  className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <span className="text-boundary-mist">
                  確率2倍キャンペーン！
                </span>
                <p className="text-xs text-boundary-mist/70">
                  ※実際の当選確率への影響をご確認ください
                </p>
              </div>
              <button
                onClick={() => setDoubleRate(!doubleRate)}
                className={`px-4 py-2 rounded transition-all ${
                  doubleRate
                    ? 'bg-boundary-cyan text-boundary-dark'
                    : 'bg-boundary-blue text-boundary-mist'
                }`}
              >
                {doubleRate ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-boundary-dark p-3 rounded">
                <p className="text-xs text-boundary-mist mb-1">SSR</p>
                <p className="text-lg text-yellow-400 font-mono">
                  {(currentRates.SSR * 100).toFixed(2)}%
                </p>
              </div>
              <div className="bg-boundary-dark p-3 rounded">
                <p className="text-xs text-boundary-mist mb-1">SR</p>
                <p className="text-lg text-purple-400 font-mono">
                  {(currentRates.SR * 100).toFixed(2)}%
                </p>
              </div>
              <div className="bg-boundary-dark p-3 rounded">
                <p className="text-xs text-boundary-mist mb-1">R</p>
                <p className="text-lg text-blue-400 font-mono">
                  {(currentRates.R * 100).toFixed(2)}%
                </p>
              </div>
              <div className="bg-boundary-dark p-3 rounded">
                <p className="text-xs text-boundary-mist mb-1">N</p>
                <p className="text-lg text-gray-400 font-mono">
                  {(currentRates.N * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          シミュレーション
        </h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">総回数</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {pulls}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">総額</p>
                <p className="text-2xl text-red-400 font-mono">
                  ¥{totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">SSR獲得</p>
                <p className="text-2xl text-yellow-400 font-mono">
                  {results.SSR}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">天井まで</p>
                <p className="text-2xl text-boundary-cyan font-mono">
                  {hasCeiling ? ceiling - lastSSR : '—'}
                </p>
              </div>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-2">実際のSSR出現率</p>
              <p className="text-3xl text-yellow-400 font-mono">
                {actualSSRRate.toFixed(2)}%
              </p>
              <p className="text-xs text-boundary-mist mt-1">
                理論値: {(currentRates.SSR * 100).toFixed(2)}%
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => pullGacha(1)} className="button-primary">
                1回引く (¥300)
              </button>
              <button onClick={() => pullGacha(10)} className="button-primary">
                10連 (¥3,000)
              </button>
              <button onClick={() => pullGacha(100)} className="button-primary">
                100連 (¥30,000)
              </button>
              <button
                onClick={() => pullGacha(1000)}
                className="button-secondary"
              >
                1000連
              </button>
              <button onClick={reset} className="button-secondary">
                リセット
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-boundary-dark p-4 rounded border-2 border-yellow-400/30">
                <p className="text-sm text-yellow-400 mb-1">SSR</p>
                <p className="text-3xl text-yellow-400 font-mono">
                  {results.SSR}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded border-2 border-purple-400/30">
                <p className="text-sm text-purple-400 mb-1">SR</p>
                <p className="text-3xl text-purple-400 font-mono">
                  {results.SR}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded border-2 border-blue-400/30">
                <p className="text-sm text-blue-400 mb-1">R</p>
                <p className="text-3xl text-blue-400 font-mono">{results.R}</p>
              </div>
              <div className="bg-boundary-dark p-4 rounded border-2 border-gray-400/30">
                <p className="text-sm text-gray-400 mb-1">N</p>
                <p className="text-3xl text-gray-400 font-mono">{results.N}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">
              「『確率2倍キャンペーン』——聞こえは良い。」
            </p>
            <p className="monologue">
              「だが、1%が2%になっても、98%は外れだ。」
            </p>
            <p className="monologue">
              「天井がなければ、1000回引いてもSSRが出ない可能性がある。」
            </p>
            <p className="monologue">
              「天井があれば、最悪でも{ceiling}回で確実に手に入る。」
            </p>
            <p className="monologue text-boundary-cyan">
              「これが、確率と保証の違いだ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          煽り文句の真実
        </h3>
        <div className="simulator-container">
          <ul className="space-y-3 text-boundary-mist">
            <li className="flex items-start">
              <span className="text-red-400 mr-3">✗</span>
              <div>
                <p className="text-boundary-silver">「今なら当たりやすい！」</p>
                <p className="text-sm text-boundary-mist/70">
                  → 確率が2倍でも、ほとんど外れ
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">✗</span>
              <div>
                <p className="text-boundary-silver">「10連で1個確定！」</p>
                <p className="text-sm text-boundary-mist/70">
                  → 1個だけ。残り9個は通常確率
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-3">✓</span>
              <div>
                <p className="text-boundary-silver">「100回で天井」</p>
                <p className="text-sm text-boundary-mist/70">
                  → これは確実な保証
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
