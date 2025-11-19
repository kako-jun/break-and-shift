import { useState, useRef, useEffect } from 'react';

interface GameResult {
  round: number;
  playerHand: string;
  cpuHand: string;
  result: '勝ち' | '負け' | 'あいこ';
  delay: number;
  playerReactionTime: number;
}

type Hand = 'グー' | 'チョキ' | 'パー';

const HANDS: Hand[] = ['グー', 'チョキ', 'パー'];
const HAND_EMOJI: { [key in Hand]: string } = {
  グー: '✊',
  チョキ: '✌️',
  パー: '✋',
};

export default function Janken() {
  const [results, setResults] = useState<GameResult[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [delayMs, setDelayMs] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setPlayerHand] = useState<Hand | null>(null);
  const [, setCpuHand] = useState<Hand | null>(null);
  const [showCpuCheat, setShowCpuCheat] = useState(false);
  const [fairMode, setFairMode] = useState(false);
  const clickTimeRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 勝つ手を返す
  const getWinningHand = (opponentHand: Hand): Hand => {
    if (opponentHand === 'グー') return 'パー';
    if (opponentHand === 'チョキ') return 'グー';
    return 'チョキ';
  };

  // 判定
  const judge = (player: Hand, cpu: Hand): '勝ち' | '負け' | 'あいこ' => {
    if (player === cpu) return 'あいこ';
    if (getWinningHand(cpu) === player) return '勝ち';
    return '負け';
  };

  // Canvas描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGame = (
      player: Hand | null,
      cpu: Hand | null,
      cheat: string | null
    ) => {
      ctx.fillStyle = '#0a1929';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // プレイヤー側
      ctx.fillStyle = '#1a4a5a';
      ctx.fillRect(20, 150, 180, 180);
      ctx.strokeStyle = '#4a7c8c';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 150, 180, 180);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#6b9aa8';
      ctx.textAlign = 'center';
      ctx.fillText('プレイヤー', 110, 140);

      if (player) {
        ctx.font = '80px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(HAND_EMOJI[player], 110, 240);
      }

      // CPU側
      ctx.fillStyle = '#1a4a5a';
      ctx.fillRect(240, 150, 180, 180);
      ctx.strokeStyle = '#4a7c8c';
      ctx.lineWidth = 3;
      ctx.strokeRect(240, 150, 180, 180);

      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#6b9aa8';
      ctx.textAlign = 'center';
      ctx.fillText('CPU', 330, 140);

      if (cpu) {
        ctx.font = '80px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(HAND_EMOJI[cpu], 330, 240);
      }

      // 不正表示
      if (cheat) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
        ctx.fillRect(220, 20, 200, 60);
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(220, 20, 200, 60);

        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('【不正検出】', 320, 40);
        ctx.fillText(cheat, 320, 60);
      }

      // タイトル
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = '#f0c040';
      ctx.textAlign = 'center';
      ctx.fillText('じゃんけん対戦', canvas.width / 2, 40);

      // VS
      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = '#ff6b6b';
      ctx.fillText('VS', canvas.width / 2, 240);
    };

    drawGame(null, null, null);
  }, []);

  const play = async (selectedHand: Hand) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerHand(selectedHand);
    setCpuHand(null);
    clickTimeRef.current = Date.now();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // プレイヤーの手を表示
    ctx.fillStyle = '#0a1929';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#1a4a5a';
    ctx.fillRect(20, 150, 180, 180);
    ctx.strokeStyle = '#4a7c8c';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 150, 180, 180);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#6b9aa8';
    ctx.textAlign = 'center';
    ctx.fillText('プレイヤー', 110, 140);

    ctx.font = '80px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(HAND_EMOJI[selectedHand], 110, 240);

    ctx.fillStyle = '#1a4a5a';
    ctx.fillRect(240, 150, 180, 180);
    ctx.strokeStyle = '#4a7c8c';
    ctx.lineWidth = 3;
    ctx.strokeRect(240, 150, 180, 180);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#6b9aa8';
    ctx.fillText('CPU', 330, 140);

    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#f0c040';
    ctx.textAlign = 'center';
    ctx.fillText('じゃんけん対戦', canvas.width / 2, 40);

    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = '#ff6b6b';
    ctx.fillText('VS', canvas.width / 2, 240);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#ffff00';
    ctx.fillText('CPUが考え中...', 330, 240);

    // 遅延後にCPUが手を出す
    await new Promise(resolve => setTimeout(resolve, delayMs));

    let cpuSelectedHand: Hand;
    if (fairMode) {
      // フェアモード：ランダム
      cpuSelectedHand = HANDS[Math.floor(Math.random() * 3)];
    } else {
      // 後出しモード：必ず勝つ手
      cpuSelectedHand = getWinningHand(selectedHand);
    }

    setCpuHand(cpuSelectedHand);
    const reactionTime = Date.now() - clickTimeRef.current;
    const result = judge(selectedHand, cpuSelectedHand);

    // 結果表示
    ctx.fillStyle = '#0a1929';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const playerColor =
      result === '勝ち' ? '#00ff00' : result === '負け' ? '#ff0000' : '#ffff00';
    const cpuColor =
      result === '負け' ? '#00ff00' : result === '勝ち' ? '#ff0000' : '#ffff00';

    ctx.fillStyle = '#1a4a5a';
    ctx.fillRect(20, 150, 180, 180);
    ctx.strokeStyle = playerColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 150, 180, 180);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#6b9aa8';
    ctx.textAlign = 'center';
    ctx.fillText('プレイヤー', 110, 140);

    ctx.font = '80px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(HAND_EMOJI[selectedHand], 110, 240);

    ctx.fillStyle = '#1a4a5a';
    ctx.fillRect(240, 150, 180, 180);
    ctx.strokeStyle = cpuColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(240, 150, 180, 180);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#6b9aa8';
    ctx.fillText('CPU', 330, 140);

    ctx.font = '80px serif';
    ctx.fillText(HAND_EMOJI[cpuSelectedHand], 330, 240);

    if (showCpuCheat && !fairMode) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.9)';
      ctx.fillRect(220, 20, 200, 60);
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.strokeRect(220, 20, 200, 60);

      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('【不正検出】', 320, 40);
      ctx.fillText(`${delayMs}ms後出し`, 320, 60);
    }

    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#f0c040';
    ctx.textAlign = 'center';
    ctx.fillText('じゃんけん対戦', canvas.width / 2, 40);

    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle =
      result === '勝ち' ? '#00ff00' : result === '負け' ? '#ff0000' : '#ffff00';
    ctx.fillText(
      result === 'あいこ' ? 'あいこ' : result,
      canvas.width / 2,
      100
    );

    // 記録
    const newRound = currentRound + 1;
    setCurrentRound(newRound);
    setResults(prev => [
      ...prev,
      {
        round: newRound,
        playerHand: selectedHand,
        cpuHand: cpuSelectedHand,
        result: result,
        delay: delayMs,
        playerReactionTime: reactionTime,
      },
    ]);

    setIsPlaying(false);
  };

  const reset = () => {
    setResults([]);
    setCurrentRound(0);
    setPlayerHand(null);
    setCpuHand(null);
  };

  const winCount = results.filter(r => r.result === '勝ち').length;
  const loseCount = results.filter(r => r.result === '負け').length;
  const drawCount = results.filter(r => r.result === 'あいこ').length;
  const winRate = currentRound > 0 ? (winCount / currentRound) * 100 : 0;

  // じゃんけんの実際の確率（心理学的データ）
  const realProbabilities = {
    グー: '35%（安定感を求める心理）',
    チョキ: '30%（攻撃的な印象）',
    パー: '35%（グーを警戒）',
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">じゃんけんの後出し必勝法</h1>
        <p className="text-boundary-cyan text-lg">
          Imperceptible Cheating in Rock-Paper-Scissors
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「じゃんけんの確率は、理想状態では1/3ずつだ。」
          </p>
          <p className="monologue">
            「理想状態ではそうだね。でも、世界は理想じゃないんだ。」
          </p>
          <p className="monologue">
            「人間には心理的バイアスがある。初手はグーが多い。」
          </p>
          <p className="monologue">
            「そして、コンピューターは後出しできる。人間が気づかない速度で。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">設定</h2>

        <div className="simulator-container space-y-4">
          <div>
            <label className="block text-boundary-mist mb-2">
              CPUの遅延時間: {delayMs}ms
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={delayMs}
              onChange={e => setDelayMs(Number(e.target.value))}
              className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
              disabled={isPlaying}
            />
            <p className="text-sm text-boundary-mist mt-2">
              {delayMs === 0 && '即座に後出し'}
              {delayMs > 0 &&
                delayMs <= 50 &&
                '人間には認識できない速度（不正）'}
              {delayMs > 50 && delayMs <= 100 && 'わずかに遅れを感じる（微妙）'}
              {delayMs > 100 && 'はっきり後出しとわかる'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={fairMode}
                onChange={e => setFairMode(e.target.checked)}
                className="w-5 h-5 accent-boundary-cyan"
                disabled={isPlaying}
              />
              <span className="text-boundary-mist">
                フェアモード（ランダム）
              </span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCpuCheat}
                onChange={e => setShowCpuCheat(e.target.checked)}
                className="w-5 h-5 accent-boundary-cyan"
              />
              <span className="text-boundary-mist">不正を可視化する</span>
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          じゃんけん対戦
        </h2>

        <div className="simulator-container">
          <canvas
            ref={canvasRef}
            width={440}
            height={350}
            className="border-2 border-boundary-cyan rounded mx-auto block"
          />

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={() => play('グー')}
              disabled={isPlaying}
              className="button-primary disabled:opacity-50 text-4xl w-24 h-24"
            >
              ✊
            </button>
            <button
              onClick={() => play('チョキ')}
              disabled={isPlaying}
              className="button-primary disabled:opacity-50 text-4xl w-24 h-24"
            >
              ✌️
            </button>
            <button
              onClick={() => play('パー')}
              disabled={isPlaying}
              className="button-primary disabled:opacity-50 text-4xl w-24 h-24"
            >
              ✋
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">対戦数</p>
              <p className="text-2xl text-boundary-silver font-mono">
                {currentRound}回
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">勝ち</p>
              <p className="text-2xl text-green-400 font-mono">{winCount}回</p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">負け</p>
              <p className="text-2xl text-red-400 font-mono">{loseCount}回</p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">あいこ</p>
              <p className="text-2xl text-yellow-400 font-mono">
                {drawCount}回
              </p>
            </div>
          </div>

          <div className="bg-boundary-dark p-4 rounded mt-4">
            <p className="text-sm text-boundary-mist mb-1">勝率</p>
            <p className="text-3xl text-boundary-cyan font-mono">
              {winRate.toFixed(1)}%
            </p>
            <p className="text-xs text-boundary-mist mt-2">
              {!fairMode && delayMs <= 50 && '⚠️ 後出しモード：理論上0%'}
              {!fairMode && delayMs > 50 && '⚠️ 後出しモード：理論上0%'}
              {fairMode && '理論値33.3%（あいこを除く）'}
            </p>
          </div>

          <button onClick={reset} className="button-secondary mt-4 w-full">
            リセット
          </button>

          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-boundary-cyan">対戦履歴（直近10回）</h3>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {results
                  .slice(-10)
                  .reverse()
                  .map(result => (
                    <div
                      key={result.round}
                      className={`p-3 rounded ${
                        result.result === '勝ち'
                          ? 'bg-green-900/20 border border-green-400'
                          : result.result === '負け'
                            ? 'bg-red-900/20 border border-red-400'
                            : 'bg-yellow-900/20 border border-yellow-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-boundary-mist">
                          {result.round}回目
                        </span>
                        <span className="text-xl">
                          {HAND_EMOJI[result.playerHand as Hand]} vs{' '}
                          {HAND_EMOJI[result.cpuHand as Hand]}
                        </span>
                        <span className="text-sm text-boundary-mist">
                          遅延: {result.delay}ms
                        </span>
                        <span
                          className={`font-bold ${
                            result.result === '勝ち'
                              ? 'text-green-400'
                              : result.result === '負け'
                                ? 'text-red-400'
                                : 'text-yellow-400'
                          }`}
                        >
                          {result.result}
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
              「50ms以下の遅延では、人間は後出しに気づかない。」
            </p>
            <p className="monologue">
              「コンピューターは、あなたの選択を見てから勝つ手を出せる。」
            </p>
            <p className="monologue">
              「じゃんけんの確率は1/3——理想状態ではそうだね。」
            </p>
            <p className="monologue">「でも、世界は理想じゃないんだ。」</p>
            <p className="monologue text-boundary-cyan">
              「人間には心理的バイアスがある。完全にランダムには選べない。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          人間の認識限界
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>• 人間の視覚認識の限界：約50〜100ms</li>
            <li>• 50ms以下の遅延では、同時に出したように見える</li>
            <li>
              •
              ゲームセンターのじゃんけんゲームは、この原理を利用している可能性がある
            </li>
            <li>• プログラム上では「後出し」でも、人間には認識できない</li>
            <li className="text-boundary-cyan">
              • 技術的には不正だが、証明することは困難
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          じゃんけんの確率は1/3ではない
        </h3>
        <div className="simulator-container">
          <div className="space-y-4">
            <div>
              <h4 className="text-boundary-cyan mb-2">
                実際の出現率（心理学的研究）
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-boundary-dark p-4 rounded">
                  <p className="text-4xl text-center mb-2">✊</p>
                  <p className="text-center text-boundary-silver">
                    {realProbabilities.グー}
                  </p>
                </div>
                <div className="bg-boundary-dark p-4 rounded">
                  <p className="text-4xl text-center mb-2">✌️</p>
                  <p className="text-center text-boundary-silver">
                    {realProbabilities.チョキ}
                  </p>
                </div>
                <div className="bg-boundary-dark p-4 rounded">
                  <p className="text-4xl text-center mb-2">✋</p>
                  <p className="text-center text-boundary-silver">
                    {realProbabilities.パー}
                  </p>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-boundary-mist">
              <li>
                • 初手はグーが最も多い（約35%）：握り拳は心理的に安定感がある
              </li>
              <li>• チョキは最も少ない（約30%）：攻撃的で不安定な印象</li>
              <li>• パーは中間（約35%）：グーを警戒する心理</li>
              <li>• 同じ手を連続で出しにくい（心理的バイアス）</li>
              <li>• 負けた後は、負けた手に勝つ手を出しやすい</li>
              <li className="text-boundary-cyan">
                • 完全にランダムな選択は、人間には不可能
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          じゃんけん必勝法（統計的アプローチ）
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>1. 初手は「パー」を出す（相手がグーを出す確率が高いため）</li>
            <li>
              2. 相手が負けた後は、その手に負ける手を出す
              <br />
              <span className="text-sm ml-4">
                例：相手がグーで負けた → 次はチョキを出しやすい → こちらはグー
              </span>
            </li>
            <li>
              3. あいこの後は、同じ手を出さない
              <br />
              <span className="text-sm ml-4">
                例：両者グー → 相手はチョキかパーを出しやすい
              </span>
            </li>
            <li className="text-boundary-cyan">
              • これらの戦略で勝率は約40〜45%まで上昇する（理論値33.3%から）
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
