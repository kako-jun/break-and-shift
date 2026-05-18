import { useState } from 'react';

interface LotteryResult {
  prize: string;
  amount: number;
  probability: number;
}

const lotteryPrizes: LotteryResult[] = [
  { prize: '1等', amount: 700000000, probability: 1 / 10000000 },
  { prize: '1等前後賞', amount: 150000000, probability: 2 / 10000000 },
  { prize: '2等', amount: 10000000, probability: 3 / 10000000 },
  { prize: '3等', amount: 1000000, probability: 10 / 10000000 },
  { prize: '4等', amount: 100000, probability: 100 / 10000000 },
  { prize: '5等', amount: 10000, probability: 1000 / 10000000 },
  { prize: '6等', amount: 3000, probability: 10000 / 10000000 },
  { prize: '7等', amount: 300, probability: 100000 / 10000000 },
];

export default function Chapter2() {
  const [purchased, setPurchased] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalWon, setTotalWon] = useState(0);
  const [results, setResults] = useState<{ [key: string]: number }>({});
  const [prayerLevel, setPrayerLevel] = useState(0);

  const ticketPrice = 300;

  const buyLottery = (count: number) => {
    let won = 0;
    const newResults = { ...results };

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let cumProb = 0;
      let hasWon = false;

      for (const prize of lotteryPrizes) {
        cumProb += prize.probability;
        if (rand < cumProb) {
          won += prize.amount;
          newResults[prize.prize] = (newResults[prize.prize] || 0) + 1;
          hasWon = true;
          break;
        }
      }

      if (!hasWon) {
        newResults['ハズレ'] = (newResults['ハズレ'] || 0) + 1;
      }
    }

    setPurchased(prev => prev + count);
    setTotalSpent(prev => prev + count * ticketPrice);
    setTotalWon(prev => prev + won);
  };

  const reset = () => {
    setPurchased(0);
    setTotalSpent(0);
    setTotalWon(0);
    setResults({});
  };

  const netProfit = totalWon - totalSpent;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">第二章：祈りは確率を変えない</h1>
        <p className="text-boundary-cyan text-lg">
          Prayer Does Not Change Probability
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「宝くじを買うとき、人は祈る。」</p>
          <p className="monologue">「『当たりますように』と。」</p>
          <p className="monologue">
            「だが、祈りは確率に何の影響も与えない。」
          </p>
          <p className="monologue">「……そんな馬鹿な、と思うかもしれない。」</p>
          <p className="monologue">「では、試してみよう。」</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          祈りのレベル
        </h2>

        <div className="simulator-container">
          <div className="space-y-4">
            <div>
              <label className="block text-boundary-mist mb-2">
                祈りの強さ: {prayerLevel}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={prayerLevel}
                onChange={e => setPrayerLevel(Number(e.target.value))}
                className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
              />
              <p className="text-sm text-boundary-mist mt-2">
                {prayerLevel === 0 && '無心'}
                {prayerLevel > 0 && prayerLevel <= 30 && '軽く祈る'}
                {prayerLevel > 30 && prayerLevel <= 70 && '真剣に祈る'}
                {prayerLevel > 70 && '全身全霊で祈る'}
              </p>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-2">確率への影響</p>
              <p className="text-3xl text-boundary-cyan font-mono">0.000%</p>
              <p className="text-xs text-boundary-mist mt-2">
                祈りの強さに関わらず、確率は変わらない
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          宝くじシミュレーター
        </h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">購入枚数</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {purchased.toLocaleString()}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">支出</p>
                <p className="text-2xl text-red-400 font-mono">
                  ¥{totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">収入</p>
                <p className="text-2xl text-green-400 font-mono">
                  ¥{totalWon.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">収支</p>
              <p
                className={`text-3xl font-mono ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
              >
                {netProfit >= 0 ? '+' : ''}¥{netProfit.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => buyLottery(1)} className="button-primary">
                1枚購入 (¥300)
              </button>
              <button onClick={() => buyLottery(10)} className="button-primary">
                10枚購入 (¥3,000)
              </button>
              <button
                onClick={() => buyLottery(100)}
                className="button-primary"
              >
                100枚購入 (¥30,000)
              </button>
              <button
                onClick={() => buyLottery(10000)}
                className="button-secondary"
              >
                10,000枚購入
              </button>
              <button onClick={reset} className="button-secondary">
                リセット
              </button>
            </div>

            {Object.keys(results).length > 0 && (
              <div className="space-y-2">
                <h3 className="text-boundary-cyan">当選結果</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(results)
                    .sort((a, b) => {
                      if (a[0] === 'ハズレ') return 1;
                      if (b[0] === 'ハズレ') return -1;
                      return 0;
                    })
                    .map(([prize, count]) => (
                      <div
                        key={prize}
                        className="bg-boundary-indigo p-2 rounded text-sm"
                      >
                        <p className="text-boundary-mist">{prize}</p>
                        <p className="text-boundary-silver font-mono">
                          {count}回
                        </p>
                      </div>
                    ))}
                </div>
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
              「祈りの強さを100にしても、確率は変わらなかった。」
            </p>
            <p className="monologue">「……本当だ。」</p>
            <p className="monologue">
              「確率は、感情に左右されない。数学的な必然だ。」
            </p>
            <p className="monologue">
              「10,000枚購入しても、収支はマイナスになる可能性が高い。」
            </p>
            <p className="monologue text-boundary-cyan">
              「これが、確率の冷酷な真実だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">確率の真実</h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>• 1等（7億円）の確率: 1/10,000,000 = 0.00001%</li>
            <li>• 10,000枚買っても1等に当たる確率: 約0.1%</li>
            <li>• 期待値: 約150円（300円の投資に対して）</li>
            <li className="text-boundary-cyan">
              • つまり、平均すると購入金額の半分しか戻ってこない
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
