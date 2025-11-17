import { useState, useEffect, useRef } from 'react';

interface PlayResult {
  attempt: number;
  gripStrength: number;
  success: boolean;
  cost: number;
}

export default function ClawMachine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState<PlayResult[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [prizeCount, setPrizeCount] = useState(0);
  const [currentGripStrength, setCurrentGripStrength] = useState(10);
  const [expectedValue, setExpectedValue] = useState(500); // 期待値設定

  const COST_PER_PLAY = 100;

  // 握力計算：期待値に基づいて失敗回数に応じて上昇
  const calculateGripStrength = (failCount: number, expectedVal: number) => {
    const maxAttempts = expectedVal / COST_PER_PLAY;
    // 線形増加モデル：maxAttempts回で100%になる
    const baseStrength = 10;
    const increment = (100 - baseStrength) / (maxAttempts - 1);
    return Math.min(100, baseStrength + increment * failCount);
  };

  // 成功判定：握力に基づく確率
  const checkSuccess = (gripStrength: number): boolean => {
    return Math.random() * 100 < gripStrength;
  };

  // Canvas描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawMachine = (armX: number, armY: number, isGripping: boolean, hasPrize: boolean) => {
      // クリア
      ctx.fillStyle = '#0a1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 筐体
      ctx.strokeStyle = '#4a7c8c';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // 天井レール
      ctx.strokeStyle = '#6b9aa8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 40);
      ctx.lineTo(canvas.width - 30, 40);
      ctx.stroke();

      // アーム本体
      ctx.fillStyle = '#f0c040';
      ctx.fillRect(armX - 15, armY - 10, 30, 20);

      // アームのワイヤー
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(armX, 40);
      ctx.lineTo(armX, armY);
      ctx.stroke();

      // クロー（爪）
      ctx.strokeStyle = '#f0c040';
      ctx.lineWidth = 3;
      const clawWidth = isGripping ? 10 : 25;
      ctx.beginPath();
      ctx.moveTo(armX - clawWidth, armY + 10);
      ctx.lineTo(armX - clawWidth, armY + 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(armX + clawWidth, armY + 10);
      ctx.lineTo(armX + clawWidth, armY + 40);
      ctx.stroke();

      // 景品（ぬいぐるみ）
      if (!hasPrize) {
        const prizes = [
          { x: 100, y: canvas.height - 100 },
          { x: 180, y: canvas.height - 100 },
          { x: 260, y: canvas.height - 100 },
          { x: 340, y: canvas.height - 100 },
          { x: 140, y: canvas.height - 140 },
          { x: 220, y: canvas.height - 140 },
          { x: 300, y: canvas.height - 140 },
        ];

        prizes.forEach(prize => {
          // ぬいぐるみの体
          ctx.fillStyle = '#ff69b4';
          ctx.beginPath();
          ctx.arc(prize.x, prize.y, 20, 0, Math.PI * 2);
          ctx.fill();

          // 目
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(prize.x - 7, prize.y - 5, 3, 0, Math.PI * 2);
          ctx.arc(prize.x + 7, prize.y - 5, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 掴んだ景品
      if (hasPrize && isGripping) {
        ctx.fillStyle = '#ff69b4';
        ctx.beginPath();
        ctx.arc(armX, armY + 50, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(armX - 7, armY + 45, 3, 0, Math.PI * 2);
        ctx.arc(armX + 7, armY + 45, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 取り出し口
      ctx.fillStyle = '#2a4a5a';
      ctx.fillRect(canvas.width - 80, canvas.height - 60, 60, 40);
      ctx.strokeStyle = '#4a7c8c';
      ctx.strokeRect(canvas.width - 80, canvas.height - 60, 60, 40);
    };

    drawMachine(220, 60, false, false);
  }, []);

  // プレイアニメーション
  const play = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const failedAttempts = currentAttempt - prizeCount;
    const gripStrength = calculateGripStrength(failedAttempts, expectedValue);
    setCurrentGripStrength(gripStrength);

    const centerX = canvas.width / 2;
    let armX = 220;
    let armY = 60;
    let isGripping = false;
    let hasPrize = false;

    const drawMachine = (x: number, y: number, grip: boolean, prize: boolean) => {
      ctx.fillStyle = '#0a1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#4a7c8c';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      ctx.strokeStyle = '#6b9aa8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 40);
      ctx.lineTo(canvas.width - 30, 40);
      ctx.stroke();

      ctx.fillStyle = '#f0c040';
      ctx.fillRect(x - 15, y - 10, 30, 20);

      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.strokeStyle = '#f0c040';
      ctx.lineWidth = 3;
      const clawWidth = grip ? 10 : 25;
      ctx.beginPath();
      ctx.moveTo(x - clawWidth, y + 10);
      ctx.lineTo(x - clawWidth, y + 40);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + clawWidth, y + 10);
      ctx.lineTo(x + clawWidth, y + 40);
      ctx.stroke();

      if (!prize) {
        const prizes = [
          { x: 100, y: canvas.height - 100 },
          { x: 180, y: canvas.height - 100 },
          { x: 260, y: canvas.height - 100 },
          { x: 340, y: canvas.height - 100 },
          { x: 140, y: canvas.height - 140 },
          { x: 220, y: canvas.height - 140 },
          { x: 300, y: canvas.height - 140 },
        ];

        prizes.forEach(p => {
          ctx.fillStyle = '#ff69b4';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(p.x - 7, p.y - 5, 3, 0, Math.PI * 2);
          ctx.arc(p.x + 7, p.y - 5, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      if (prize && grip) {
        ctx.fillStyle = '#ff69b4';
        ctx.beginPath();
        ctx.arc(x, y + 50, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x - 7, y + 45, 3, 0, Math.PI * 2);
        ctx.arc(x + 7, y + 45, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#2a4a5a';
      ctx.fillRect(canvas.width - 80, canvas.height - 60, 60, 40);
      ctx.strokeStyle = '#4a7c8c';
      ctx.strokeRect(canvas.width - 80, canvas.height - 60, 60, 40);
    };

    const animate = (
      startX: number,
      endX: number,
      startY: number,
      endY: number,
      duration: number,
      grip: boolean,
      prize: boolean
    ): Promise<void> => {
      return new Promise(resolve => {
        const startTime = Date.now();
        const step = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          armX = startX + (endX - startX) * progress;
          armY = startY + (endY - startY) * progress;
          isGripping = grip;
          hasPrize = prize;

          drawMachine(armX, armY, isGripping, hasPrize);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        step();
      });
    };

    // アニメーションシーケンス
    await animate(220, centerX, 60, 60, 500, false, false); // 横移動
    await animate(centerX, centerX, 60, canvas.height - 150, 800, false, false); // 下降
    await new Promise(r => setTimeout(r, 200)); // 待機

    // 掴む判定
    const success = checkSuccess(gripStrength);
    isGripping = true;
    hasPrize = success;
    drawMachine(armX, armY, isGripping, hasPrize);
    await new Promise(r => setTimeout(r, 300));

    // 上昇
    await animate(centerX, centerX, canvas.height - 150, 100, 800, true, hasPrize);

    if (success) {
      // 取り出し口へ移動
      await animate(centerX, canvas.width - 50, 100, 100, 600, true, true);
      await animate(canvas.width - 50, canvas.width - 50, 100, canvas.height - 80, 400, false, false);
      setPrizeCount(prev => prev + 1);
    } else {
      // 途中で落とす
      await animate(centerX, centerX, 100, 100, 300, false, false);
    }

    // 記録
    const newAttempt = currentAttempt + 1;
    setCurrentAttempt(newAttempt);
    setTotalCost(prev => prev + COST_PER_PLAY);
    setResults(prev => [
      ...prev,
      {
        attempt: newAttempt,
        gripStrength: gripStrength,
        success: success,
        cost: COST_PER_PLAY,
      },
    ]);

    setIsPlaying(false);
  };

  const reset = () => {
    setResults([]);
    setCurrentAttempt(0);
    setTotalCost(0);
    setPrizeCount(0);
    setCurrentGripStrength(10);
  };

  const autoPlay = async (count: number) => {
    for (let i = 0; i < count; i++) {
      await play();
      await new Promise(r => setTimeout(r, 100));
    }
  };

  const successRate = currentAttempt > 0 ? (prizeCount / currentAttempt) * 100 : 0;
  const actualExpectedValue = prizeCount > 0 ? totalCost / prizeCount : 0;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">クレーンゲームの期待値操作</h1>
        <p className="text-boundary-cyan text-lg">
          Claw Machine Rigged System
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「ゲームセンターのクレーンゲームは、インチキだ。」
          </p>
          <p className="monologue">
            「500円で1個取れるように設定されている——期待値としては。」
          </p>
          <p className="monologue">
            「だが、1回目で取れることは、ほとんどない。」
          </p>
          <p className="monologue">
            「失敗するたびに、アームの握力が強くなるように設計されているからだ。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">期待値設定</h2>

        <div className="simulator-container">
          <div className="space-y-4">
            <div>
              <label className="block text-boundary-mist mb-2">
                期待値: ¥{expectedValue} (1個あたり)
              </label>
              <input
                type="range"
                min="200"
                max="1000"
                step="100"
                value={expectedValue}
                onChange={e => {
                  setExpectedValue(Number(e.target.value));
                  reset();
                }}
                className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
                disabled={isPlaying}
              />
              <p className="text-sm text-boundary-mist mt-2">
                {expectedValue / COST_PER_PLAY}回目で取れるように設定
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          クレーンゲームシミュレーター
        </h2>

        <div className="simulator-container">
          <canvas
            ref={canvasRef}
            width={440}
            height={400}
            className="border-2 border-boundary-cyan rounded mx-auto block"
          />

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">試行回数</p>
              <p className="text-2xl text-boundary-silver font-mono">
                {currentAttempt}回
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">現在の握力</p>
              <p className="text-2xl text-boundary-cyan font-mono">
                {currentGripStrength.toFixed(1)}%
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">獲得数</p>
              <p className="text-2xl text-green-400 font-mono">
                {prizeCount}個
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">支払額</p>
              <p className="text-2xl text-red-400 font-mono">
                ¥{totalCost.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-4">
            <button
              onClick={play}
              disabled={isPlaying}
              className="button-primary disabled:opacity-50"
            >
              {isPlaying ? 'プレイ中...' : 'プレイ (¥100)'}
            </button>
            <button
              onClick={() => autoPlay(10)}
              disabled={isPlaying}
              className="button-secondary disabled:opacity-50"
            >
              10回自動プレイ
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
              <p className="text-sm text-boundary-mist mb-1">成功率</p>
              <p className="text-2xl text-boundary-cyan font-mono">
                {successRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">実際の期待値</p>
              <p className="text-2xl text-yellow-400 font-mono">
                ¥{actualExpectedValue.toFixed(0)}
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">設定期待値</p>
              <p className="text-2xl text-boundary-silver font-mono">
                ¥{expectedValue}
              </p>
            </div>
          </div>

          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-boundary-cyan">プレイ履歴（直近20回）</h3>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {results.slice(-20).reverse().map((result, i) => (
                  <div
                    key={result.attempt}
                    className={`p-3 rounded flex justify-between items-center ${
                      result.success
                        ? 'bg-green-900/20 border border-green-400'
                        : 'bg-red-900/20 border border-red-400'
                    }`}
                  >
                    <span className="text-boundary-mist">
                      {result.attempt}回目
                    </span>
                    <span className="text-sm text-boundary-mist">
                      握力: {result.gripStrength.toFixed(1)}%
                    </span>
                    <span
                      className={`font-bold ${result.success ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {result.success ? '✓ 成功' : '✗ 失敗'}
                    </span>
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
              「1回目の握力は10%。ほとんど取れない。」
            </p>
            <p className="monologue">
              「失敗するたびに握力が上がり、5回目で100%になる。」
            </p>
            <p className="monologue">
              「つまり、500円使えば『必ず』1個取れる——期待値通りに。」
            </p>
            <p className="monologue">
              「だが、これは『詐欺』ではない。法律上は問題ない。」
            </p>
            <p className="monologue text-boundary-cyan">
              「期待値は守られている。ただし、客は気づかない。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          期待値操作の仕組み
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>
              • 期待値500円 = 100円×5回で1個取れる設定
            </li>
            <li>
              • 握力は失敗回数に応じて線形増加（10% → 32.5% → 55% → 77.5% →
              100%）
            </li>
            <li>
              • 1回目で取れる確率は10%、2回目で32.5%...と徐々に上昇
            </li>
            <li>
              • 長期的には設定通りの期待値に収束する
            </li>
            <li className="text-boundary-cyan">
              •
              人間は「次こそは取れるかも」と期待してしまうが、実際には計算通り
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          なぜこれが許されるのか
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>
              • 風営法・景品表示法では「期待値」が規制の対象
            </li>
            <li>
              • 500円で500円相当（または設定額相当）の景品が取れれば合法
            </li>
            <li>
              • 各回の成功確率が異なることは規制されていない
            </li>
            <li>
              • 客は「技術介入できる」と思い込んでいるため、ギャンブルと認識されない
            </li>
            <li className="text-boundary-cyan">
              • 情報の非対称性——店は知っているが、客は知らない
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
