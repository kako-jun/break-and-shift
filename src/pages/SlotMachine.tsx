import { useState, useRef, useEffect } from 'react';

interface SpinResult {
  spin: number;
  result: [string, string, string];
  isWin: boolean;
  演出: string;
  cost: number;
  payout: number;
}

const SYMBOLS = ['🍒', '🍋', '🍊', '🔔', '⭐', '7️⃣'];
const WIN_PATTERNS = {
  '7️⃣7️⃣7️⃣': { name: '大当たり', payout: 1000, probability: 0.001 },
  '⭐⭐⭐': { name: '中当たり', payout: 300, probability: 0.005 },
  '🔔🔔🔔': { name: '小当たり', payout: 100, probability: 0.02 },
  '🍒🍒🍒': { name: 'チェリー', payout: 50, probability: 0.05 },
};

export default function SlotMachine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState<SpinResult[]>([]);
  const [currentSpin, setCurrentSpin] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [showResultFirst, setShowResultFirst] = useState(false);
  const [previewResult, setPreviewResult] = useState<{
    result: [string, string, string];
    isWin: boolean;
  } | null>(null);

  const COST_PER_SPIN = 100;

  // 結果を先に決定する（リアルなスロットの仕組み）
  const determineResult = (): {
    result: [string, string, string];
    isWin: boolean;
    演出: string;
    payout: number;
  } => {
    const rand = Math.random();
    let cumProb = 0;

    // 当選判定
    for (const [pattern, info] of Object.entries(WIN_PATTERNS)) {
      cumProb += info.probability;
      if (rand < cumProb) {
        return {
          result: pattern.split('') as [string, string, string],
          isWin: true,
          演出: info.name + 'リーチ演出',
          payout: info.payout,
        };
      }
    }

    // ハズレの場合
    const hasReach = Math.random() < 0.3; // 30%の確率でリーチ演出
    if (hasReach) {
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      return {
        result: [
          symbol,
          symbol,
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ] as [string, string, string],
        isWin: false,
        演出: 'ハズレリーチ演出（煽り）',
        payout: 0,
      };
    } else {
      return {
        result: [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ] as [string, string, string],
        isWin: false,
        演出: '通常ハズレ',
        payout: 0,
      };
    }
  };

  // Canvas描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawSlot = (
      symbols: [string, string, string],
      spinning: boolean,
      preview: { result: [string, string, string]; isWin: boolean } | null
    ) => {
      // 背景
      ctx.fillStyle = '#0a1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 筐体
      ctx.fillStyle = '#1a2937';
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.strokeStyle = '#f0c040';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // スロット窓
      const slotWidth = 100;
      const slotHeight = 120;
      const startX = 70;
      const startY = 80;

      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = '#000';
        ctx.fillRect(startX + i * (slotWidth + 20), startY, slotWidth, slotHeight);
        ctx.strokeStyle = '#4a7c8c';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX + i * (slotWidth + 20), startY, slotWidth, slotHeight);

        // シンボル
        ctx.font = '60px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (spinning) {
          // 回転中はランダムなシンボル
          const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          ctx.fillText(
            randomSymbol,
            startX + i * (slotWidth + 20) + slotWidth / 2,
            startY + slotHeight / 2
          );
        } else {
          ctx.fillText(
            symbols[i],
            startX + i * (slotWidth + 20) + slotWidth / 2,
            startY + slotHeight / 2
          );
        }
      }

      // 事前結果表示
      if (preview) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
        ctx.fillRect(20, canvas.height - 100, canvas.width - 40, 80);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, canvas.height - 100, canvas.width - 40, 80);

        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('【種別開示】結果は既に決定済み', canvas.width / 2, canvas.height - 75);

        ctx.font = '40px serif';
        ctx.fillText(
          preview.result.join(' '),
          canvas.width / 2,
          canvas.height - 40
        );
      }

      // タイトル
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#f0c040';
      ctx.textAlign = 'center';
      ctx.fillText('スロットマシン', canvas.width / 2, 50);
    };

    drawSlot(['❓', '❓', '❓'], false, null);
  }, []);

  const spin = async () => {
    if (isSpinning) return;

    // レバーを引いた瞬間に結果を決定（これがリアルなスロット）
    const determined = determineResult();

    if (showResultFirst) {
      setPreviewResult(determined);
    }

    setIsSpinning(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let currentSymbols: [string, string, string] = ['❓', '❓', '❓'];

    // 回転アニメーション（ただの演出）
    const spinDuration = determined.演出.includes('リーチ') ? 3000 : 1500;
    const spinInterval = 100;
    const spinCount = spinDuration / spinInterval;

    for (let i = 0; i < spinCount; i++) {
      await new Promise(resolve => setTimeout(resolve, spinInterval));

      // 回転中の描画
      ctx.fillStyle = '#0a1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1a2937';
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.strokeStyle = '#f0c040';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      const slotWidth = 100;
      const slotHeight = 120;
      const startX = 70;
      const startY = 80;

      for (let j = 0; j < 3; j++) {
        ctx.fillStyle = '#000';
        ctx.fillRect(startX + j * (slotWidth + 20), startY, slotWidth, slotHeight);
        ctx.strokeStyle = '#4a7c8c';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX + j * (slotWidth + 20), startY, slotWidth, slotHeight);

        ctx.font = '60px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        ctx.fillText(
          randomSymbol,
          startX + j * (slotWidth + 20) + slotWidth / 2,
          startY + slotHeight / 2
        );
      }

      if (showResultFirst && previewResult) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
        ctx.fillRect(20, canvas.height - 100, canvas.width - 40, 80);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, canvas.height - 100, canvas.width - 40, 80);

        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('【種別開示】結果は既に決定済み', canvas.width / 2, canvas.height - 75);

        ctx.font = '40px serif';
        ctx.fillText(
          previewResult.result.join(' '),
          canvas.width / 2,
          canvas.height - 40
        );
      }

      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#f0c040';
      ctx.textAlign = 'center';
      ctx.fillText('スロットマシン', canvas.width / 2, 50);

      // リーチ演出
      if (determined.演出.includes('リーチ') && i > spinCount / 3) {
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = '#ff0000';
        ctx.fillText('リーチ！！', canvas.width / 2, 230);
      }
    }

    // 最終結果表示
    currentSymbols = determined.result;
    ctx.fillStyle = '#0a1929';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#1a2937';
    ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    const slotWidth = 100;
    const slotHeight = 120;
    const startX = 70;
    const startY = 80;

    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#000';
      ctx.fillRect(startX + i * (slotWidth + 20), startY, slotWidth, slotHeight);
      ctx.strokeStyle = determined.isWin ? '#00ff00' : '#4a7c8c';
      ctx.lineWidth = determined.isWin ? 4 : 2;
      ctx.strokeRect(startX + i * (slotWidth + 20), startY, slotWidth, slotHeight);

      ctx.font = '60px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        currentSymbols[i],
        startX + i * (slotWidth + 20) + slotWidth / 2,
        startY + slotHeight / 2
      );
    }

    if (determined.isWin) {
      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = '#00ff00';
      ctx.textAlign = 'center';
      ctx.fillText('🎉 WIN! 🎉', canvas.width / 2, 230);
    }

    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#f0c040';
    ctx.fillText('スロットマシン', canvas.width / 2, 50);

    // 記録
    const newSpin = currentSpin + 1;
    setCurrentSpin(newSpin);
    setTotalCost(prev => prev + COST_PER_SPIN);
    setTotalPayout(prev => prev + determined.payout);
    setResults(prev => [
      ...prev,
      {
        spin: newSpin,
        result: determined.result,
        isWin: determined.isWin,
        演出: determined.演出,
        cost: COST_PER_SPIN,
        payout: determined.payout,
      },
    ]);

    setIsSpinning(false);
    setPreviewResult(null);
  };

  const reset = () => {
    setResults([]);
    setCurrentSpin(0);
    setTotalCost(0);
    setTotalPayout(0);
    setPreviewResult(null);
  };

  const autoSpin = async (count: number) => {
    for (let i = 0; i < count; i++) {
      await spin();
      await new Promise(r => setTimeout(r, 200));
    }
  };

  const winRate = currentSpin > 0 ? (results.filter(r => r.isWin).length / currentSpin) * 100 : 0;
  const netProfit = totalPayout - totalCost;
  const reachCount = results.filter(r => r.演出.includes('リーチ')).length;
  const reachWinRate = reachCount > 0
    ? (results.filter(r => r.演出.includes('リーチ') && r.isWin).length / reachCount) * 100
    : 0;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">スロットの演出詐欺</h1>
        <p className="text-boundary-cyan text-lg">
          Result is Determined Before the Show
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「パチンコやスロットの煽り演出——リーチ、フラッシュ、音楽。」
          </p>
          <p className="monologue">「あれを見て、『当たるかも！』と期待する。」</p>
          <p className="monologue">
            「だが、真実は残酷だ。レバーを引いた瞬間に、すでに結果は決まっている。」
          </p>
          <p className="monologue">
            「演出は、ただの時間稼ぎ。期待値を変えることはない。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          種別開示モード
        </h2>

        <div className="simulator-container">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showResultFirst}
                onChange={e => setShowResultFirst(e.target.checked)}
                className="w-5 h-5 accent-boundary-cyan"
                disabled={isSpinning}
              />
              <span className="text-boundary-mist">
                結果を先に表示する（真実を暴露）
              </span>
            </label>
          </div>
          <p className="text-sm text-boundary-mist mt-2">
            {showResultFirst
              ? '⚠️ 演出前に結果が決まっていることが見えてしまいます'
              : '演出を楽しむモード（通常プレイ）'}
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          スロットシミュレーター
        </h2>

        <div className="simulator-container">
          <canvas
            ref={canvasRef}
            width={440}
            height={340}
            className="border-2 border-boundary-cyan rounded mx-auto block"
          />

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">試行回数</p>
              <p className="text-2xl text-boundary-silver font-mono">
                {currentSpin}回
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">当選回数</p>
              <p className="text-2xl text-green-400 font-mono">
                {results.filter(r => r.isWin).length}回
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">支払額</p>
              <p className="text-2xl text-red-400 font-mono">
                ¥{totalCost.toLocaleString()}
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">払戻額</p>
              <p className="text-2xl text-green-400 font-mono">
                ¥{totalPayout.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-boundary-dark p-4 rounded mt-4">
            <p className="text-sm text-boundary-mist mb-1">収支</p>
            <p
              className={`text-3xl font-mono ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {netProfit >= 0 ? '+' : ''}¥{netProfit.toLocaleString()}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap mt-4">
            <button
              onClick={spin}
              disabled={isSpinning}
              className="button-primary disabled:opacity-50"
            >
              {isSpinning ? '回転中...' : 'スピン (¥100)'}
            </button>
            <button
              onClick={() => autoSpin(10)}
              disabled={isSpinning}
              className="button-secondary disabled:opacity-50"
            >
              10回自動
            </button>
            <button
              onClick={() => autoSpin(100)}
              disabled={isSpinning}
              className="button-secondary disabled:opacity-50"
            >
              100回自動
            </button>
            <button onClick={reset} className="button-secondary">
              リセット
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">統計分析</h2>

        <div className="simulator-container">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">当選率</p>
              <p className="text-2xl text-boundary-cyan font-mono">
                {winRate.toFixed(2)}%
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">リーチ発生</p>
              <p className="text-2xl text-yellow-400 font-mono">
                {reachCount}回
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">リーチ時当選率</p>
              <p className="text-2xl text-red-400 font-mono">
                {reachWinRate.toFixed(1)}%
              </p>
            </div>
          </div>

          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-boundary-cyan">履歴（直近10回）</h3>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {results.slice(-10).reverse().map((result) => (
                  <div
                    key={result.spin}
                    className={`p-3 rounded ${
                      result.isWin
                        ? 'bg-green-900/20 border border-green-400'
                        : 'bg-boundary-dark border border-boundary-blue'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-boundary-mist">
                        {result.spin}回目
                      </span>
                      <span className="text-2xl">{result.result.join(' ')}</span>
                      <span className="text-sm text-boundary-mist">
                        {result.演出}
                      </span>
                      <span
                        className={`font-bold ${result.isWin ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {result.isWin ? `+¥${result.payout}` : '✗'}
                      </span>
                    </div>
                  </div>
                ))}
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
              「種別開示モードで見れば一目瞭然だ。」
            </p>
            <p className="monologue">
              「レバーを引いた瞬間、コンピューターは既に当落を決定している。」
            </p>
            <p className="monologue">
              「リーチ演出は、ただの時間稼ぎ。期待感を煽っているだけ。」
            </p>
            <p className="monologue">
              「リーチが出ても当選率は低い。むしろ『ハズレリーチ』が多い。」
            </p>
            <p className="monologue text-boundary-cyan">
              「演出に騙されてはいけない。確率は、最初から決まっている。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          演出の心理操作
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>
              • スロットは乱数生成器（RNG）で結果を決定。レバーを引いた瞬間に確定
            </li>
            <li>
              •
              リーチ演出は「もうすぐ当たりそう」と錯覚させるための心理トリック
            </li>
            <li>
              • 実際にはリーチの多くがハズレ（ハズレリーチ）。期待値は変わらない
            </li>
            <li>• 演出の長さは、プレイ時間を引き延ばして店の滞在時間を増やす</li>
            <li className="text-boundary-cyan">
              • 「次こそは」と思わせることで、依存性を高める設計
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          理論当選確率
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>• 大当たり (7️⃣7️⃣7️⃣): 0.1% (1000倍)</li>
            <li>• 中当たり (⭐⭐⭐): 0.5% (300倍)</li>
            <li>• 小当たり (🔔🔔🔔): 2% (100倍)</li>
            <li>• チェリー (🍒🍒🍒): 5% (50倍)</li>
            <li className="text-boundary-cyan">
              • 合計当選率: 約7.6% / 期待値: 約75円（100円投資に対して）
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
