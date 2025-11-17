import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function SurvivorBias() {
  const [showSuddenDeath, setShowSuddenDeath] = useState(false);

  // 恒星の寿命データ（観測可能なもののみ）
  const observedData = [
    { range: '0-1億年', count: 2, suddenDeath: 15 },
    { range: '1-10億年', count: 8, suddenDeath: 42 },
    { range: '10-50億年', count: 35, suddenDeath: 38 },
    { range: '50-100億年', count: 30, suddenDeath: 5 },
    { range: '100億年+', count: 25, suddenDeath: 0 },
  ];

  // 突然死のリスク
  const suddenDeathRisks = [
    { name: '隕石衝突', probability: '0.0001%/年', impact: '壊滅的' },
    { name: 'ガンマ線バースト', probability: '0.00001%/年', impact: '即死' },
    { name: '太陽フレアの異常', probability: '0.001%/年', impact: '文明崩壊' },
    { name: '近隣超新星爆発', probability: '0.00005%/年', impact: '大量絶滅' },
    { name: '小惑星帯の崩壊', probability: '0.0002%/年', impact: '長期的影響' },
  ];

  // 累積確率の計算（1000年後まで）
  const calculateCumulativeRisk = (annualProb: string, years: number): number => {
    const prob = parseFloat(annualProb.replace('%/年', '')) / 100;
    // 累積確率 = 1 - (1 - p)^n
    return (1 - Math.pow(1 - prob, years)) * 100;
  };

  const totalAnnualRisk = suddenDeathRisks.reduce((sum, risk) => {
    return sum + parseFloat(risk.probability.replace('%/年', ''));
  }, 0);

  const risk100Years = calculateCumulativeRisk(`${totalAnnualRisk}%/年`, 100);
  const risk1000Years = calculateCumulativeRisk(`${totalAnnualRisk}%/年`, 1000);
  const risk10000Years = calculateCumulativeRisk(`${totalAnnualRisk}%/年`, 10000);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">生存者バイアスと地球の突然死</h1>
        <p className="text-boundary-cyan text-lg">
          Survivorship Bias and Sudden Death of Earth
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「太陽の寿命はあと50億年、地球も安泰——そう言われている。」
          </p>
          <p className="monologue">
            「その根拠は、周りの恒星の観測データだ。」
          </p>
          <p className="monologue">
            「理想状態ではそうだね。でも、世界は理想じゃないんだ。」
          </p>
          <p className="monologue">
            「観測できるのは『生き残っている恒星』だけ。突然死した星は、データに残らない。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          恒星の寿命分布（観測データ）
        </h2>

        <div className="simulator-container">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSuddenDeath}
                onChange={e => setShowSuddenDeath(e.target.checked)}
                className="w-5 h-5 accent-boundary-cyan"
              />
              <span className="text-boundary-mist">
                突然死した恒星を推定表示
              </span>
            </label>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={observedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a4a5a" />
              <XAxis
                dataKey="range"
                stroke="#6b9aa8"
                label={{
                  value: '恒星の寿命',
                  position: 'insideBottom',
                  offset: -5,
                  style: { fill: '#6b9aa8' },
                }}
              />
              <YAxis
                stroke="#6b9aa8"
                label={{
                  value: '観測数',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#6b9aa8' },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a1929',
                  border: '1px solid #4a7c8c',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#6b9aa8' }}
              />
              <Legend />
              <Bar dataKey="count" name="観測された恒星">
                {observedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#00ff00" />
                ))}
              </Bar>
              {showSuddenDeath && (
                <Bar dataKey="suddenDeath" name="突然死した恒星（推定）" fill="#ff0000" />
              )}
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 bg-boundary-dark p-4 rounded">
            <h3 className="text-boundary-cyan mb-2">生存者バイアスとは</h3>
            <p className="text-boundary-mist text-sm">
              私たちが観測できるのは「今も存在している恒星」だけ。
              <br />
              突然の災害（隕石、ガンマ線バースト、超新星爆発など）で消滅した恒星は、
              観測データに含まれない。
              <br />
              したがって、「平均寿命50億年」は<strong className="text-red-400">生き残った恒星</strong>のデータに過ぎない。
            </p>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          地球の突然死リスク
        </h2>

        <div className="simulator-container">
          <div className="space-y-3">
            {suddenDeathRisks.map((risk, i) => (
              <div
                key={i}
                className="bg-boundary-dark p-4 rounded border border-red-400"
              >
                <div className="flex justify-between items-center">
                  <span className="text-boundary-silver font-bold">
                    {risk.name}
                  </span>
                  <span className="text-sm text-boundary-mist">
                    影響: <span className="text-red-400">{risk.impact}</span>
                  </span>
                </div>
                <p className="text-boundary-cyan text-sm mt-1">
                  発生確率: {risk.probability}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">100年以内</p>
              <p className="text-2xl text-yellow-400 font-mono">
                {risk100Years.toFixed(4)}%
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">1000年以内</p>
              <p className="text-2xl text-red-400 font-mono">
                {risk1000Years.toFixed(3)}%
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">10000年以内</p>
              <p className="text-2xl text-red-400 font-mono">
                {risk10000Years.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="mt-6 bg-red-900/20 p-4 rounded border-2 border-red-400">
            <h3 className="text-red-400 mb-2 font-bold">⚠️ 重要な事実</h3>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>
                • 確率は低いが、<strong>発生したら人類は即座に滅亡</strong>
              </li>
              <li>
                • 地球温暖化対策や環境保護は、<strong>突然死には無力</strong>
              </li>
              <li>
                • 太陽フレアが数秒間だけ強まるだけで、地球の大気は剥ぎ取られる
              </li>
              <li>
                • 人間がコントロールできる範囲 vs できない範囲のギャップ
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">
              「地球温暖化を防ぐ——それは確かに重要だ。」
            </p>
            <p className="monologue">
              「でも、それは『人間がコントロールできる範囲』の話。」
            </p>
            <p className="monologue">
              「明日、ガンマ線バーストが地球を直撃したら？」
            </p>
            <p className="monologue">
              「太陽フレアが異常に強まったら？」
            </p>
            <p className="monologue">
              「隕石が衝突したら？」
            </p>
            <p className="monologue text-boundary-cyan">
              「その瞬間、すべての努力は無意味になる。それが現実だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          生存者バイアスの例
        </h3>
        <div className="simulator-container">
          <ul className="space-y-3 text-boundary-mist">
            <li className="bg-boundary-dark p-3 rounded">
              <strong className="text-boundary-cyan">第二次世界大戦の爆撃機</strong>
              <br />
              <span className="text-sm">
                帰還した機体の損傷箇所を補強すべき？いいえ。帰還<strong>できなかった</strong>機体が撃たれた箇所こそ致命的。
              </span>
            </li>
            <li className="bg-boundary-dark p-3 rounded">
              <strong className="text-boundary-cyan">成功した起業家の話</strong>
              <br />
              <span className="text-sm">
                「努力すれば成功する」は生存者の証言。失敗した数千人は語られない。
              </span>
            </li>
            <li className="bg-boundary-dark p-3 rounded">
              <strong className="text-boundary-cyan">恒星の寿命</strong>
              <br />
              <span className="text-sm">
                「太陽は50億年後に寿命」は観測可能な恒星のデータ。突然死した恒星は観測できない。
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          人間の努力とコントロールできない運命
        </h3>
        <div className="simulator-container">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/20 p-4 rounded border border-green-400">
              <h4 className="text-green-400 mb-2 font-bold">
                コントロールできること
              </h4>
              <ul className="space-y-1 text-boundary-mist text-sm">
                <li>• 地球温暖化対策</li>
                <li>• 環境保護</li>
                <li>• 資源管理</li>
                <li>• 感染症対策</li>
                <li>• 技術の発展</li>
              </ul>
            </div>

            <div className="bg-red-900/20 p-4 rounded border border-red-400">
              <h4 className="text-red-400 mb-2 font-bold">
                コントロールできないこと
              </h4>
              <ul className="space-y-1 text-boundary-mist text-sm">
                <li>• 隕石衝突</li>
                <li>• ガンマ線バースト</li>
                <li>• 太陽フレアの異常</li>
                <li>• 超新星爆発</li>
                <li>• 天体の軌道変化</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-boundary-indigo p-4 rounded border-2 border-boundary-cyan">
            <p className="text-boundary-cyan text-sm">
              努力は無駄ではない。しかし、努力では防げないリスクがあることを忘れてはいけない。
              <br />
              確率は低い。だが、ゼロではない。
              <br />
              <strong>それが、確率と運命の境界線だ。</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          むなしさのギャップ
        </h3>
        <div className="simulator-container">
          <p className="text-boundary-mist mb-4">
            人類は地球温暖化を防ぐために必死に努力している。
            <br />
            CO2削減、再生可能エネルギー、プラスチック削減——すべて重要だ。
          </p>
          <p className="text-boundary-mist mb-4">
            しかし、もし明日、小惑星が地球に衝突したら？
            <br />
            もし太陽フレアが数秒間だけ異常に強まったら？
          </p>
          <p className="text-boundary-cyan font-bold text-lg">
            すべての努力が、一瞬で無意味になる。
          </p>
          <p className="text-boundary-mist mt-4 text-sm">
            これは「努力が無駄だ」という意味ではない。
            <br />
            「人間の力の限界を知ること」が、真の知恵だということだ。
          </p>
        </div>
      </section>
    </div>
  );
}
