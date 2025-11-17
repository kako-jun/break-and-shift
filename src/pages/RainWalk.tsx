import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function RainWalk() {
  const [distance, setDistance] = useState(100); // メートル
  const [rainIntensity, setRainIntensity] = useState(5); // mm/h
  const [bodyWidth, setBodyWidth] = useState(0.4); // メートル
  const [bodyHeight, setBodyHeight] = useState(1.7); // メートル

  // 速度設定
  const walkSpeed = 1.4; // m/s (時速約5km)
  const runSpeed = 3.0; // m/s (時速約11km)

  // 計算ロジック
  const calculateWetness = () => {
    const data = [];

    // 雨の継続時間を0秒から300秒まで変化させる
    for (let rainDuration = 0; rainDuration <= 300; rainDuration += 10) {
      // 歩く場合
      const walkTime = distance / walkSpeed; // 秒
      const walkActualTime = Math.min(walkTime, rainDuration); // 実際に雨に濡れる時間

      // 走る場合
      const runTime = distance / runSpeed; // 秒
      const runActualTime = Math.min(runTime, rainDuration); // 実際に雨に濡れる時間

      // 濡れる量の計算
      // 上から降る雨: 体の水平断面積 × 雨の強さ × 時間
      // 前から受ける雨: 体の垂直断面積 × 移動速度 × 雨の強さ × 時間
      const rainRate = rainIntensity / 3600; // mm/s

      // 歩く場合の濡れる量
      const walkTopArea = bodyWidth * bodyWidth; // 上からの断面積 (m²)
      const walkFrontArea = bodyWidth * bodyHeight; // 前からの断面積 (m²)
      const walkFromTop = walkTopArea * rainRate * walkActualTime; // L
      const walkFromFront = walkFrontArea * walkSpeed * rainRate * walkActualTime; // L
      const walkTotal = walkFromTop + walkFromFront;

      // 走る場合の濡れる量
      const runTopArea = bodyWidth * bodyWidth; // 上からの断面積 (m²)
      const runFrontArea = bodyWidth * bodyHeight; // 前からの断面積 (m²)
      const runFromTop = runTopArea * rainRate * runActualTime; // L
      const runFromFront = runFrontArea * runSpeed * rainRate * runActualTime; // L
      const runTotal = runFromTop + runFromFront;

      data.push({
        rainDuration,
        歩く: Math.round(walkTotal * 1000) / 1000,
        走る: Math.round(runTotal * 1000) / 1000,
        歩く時間: walkTime,
        走る時間: runTime,
      });
    }

    return data;
  };

  const data = calculateWetness();
  const walkTime = distance / walkSpeed;
  const runTime = distance / runSpeed;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">雨の中は走るべきか、歩くべきか</h1>
        <p className="text-boundary-cyan text-lg">
          Should You Run or Walk in the Rain?
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「雨の中では走ったほうが濡れない——そう言われている。」
          </p>
          <p className="monologue">
            「理由は『受ける雨粒の数が少ないから』だと。」
          </p>
          <p className="monologue">
            「理想状態ではそうだね。でも、現実は理想世界じゃないんだ。」
          </p>
          <p className="monologue">
            「真実は、その雨がすぐ止むか、降り続けるかによる。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">パラメータ設定</h2>

        <div className="simulator-container space-y-4">
          <div>
            <label className="block text-boundary-mist mb-2">
              目的地までの距離: {distance}m
            </label>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={distance}
              onChange={e => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
            />
            <div className="flex justify-between text-sm text-boundary-mist mt-2">
              <span>歩く: {walkTime.toFixed(1)}秒</span>
              <span>走る: {runTime.toFixed(1)}秒</span>
            </div>
          </div>

          <div>
            <label className="block text-boundary-mist mb-2">
              雨の強さ: {rainIntensity}mm/h
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={rainIntensity}
              onChange={e => setRainIntensity(Number(e.target.value))}
              className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
            />
            <p className="text-sm text-boundary-mist mt-2">
              {rainIntensity <= 3 && '小雨'}
              {rainIntensity > 3 && rainIntensity <= 10 && '普通の雨'}
              {rainIntensity > 10 && rainIntensity <= 20 && '強い雨'}
              {rainIntensity > 20 && '豪雨'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-boundary-mist mb-2">
                体の幅: {bodyWidth}m
              </label>
              <input
                type="range"
                min="0.3"
                max="0.6"
                step="0.05"
                value={bodyWidth}
                onChange={e => setBodyWidth(Number(e.target.value))}
                className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
              />
            </div>
            <div>
              <label className="block text-boundary-mist mb-2">
                体の高さ: {bodyHeight}m
              </label>
              <input
                type="range"
                min="1.5"
                max="1.9"
                step="0.05"
                value={bodyHeight}
                onChange={e => setBodyHeight(Number(e.target.value))}
                className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          濡れる量の比較グラフ
        </h2>

        <div className="simulator-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a4a5a" />
              <XAxis
                dataKey="rainDuration"
                stroke="#6b9aa8"
                label={{
                  value: '雨の継続時間（秒）',
                  position: 'insideBottom',
                  offset: -5,
                  style: { fill: '#6b9aa8' },
                }}
              />
              <YAxis
                stroke="#6b9aa8"
                label={{
                  value: '濡れる量（L）',
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
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <ReferenceLine
                x={walkTime}
                stroke="#ff6b6b"
                strokeDasharray="5 5"
                label={{
                  value: '歩き終了',
                  position: 'top',
                  style: { fill: '#ff6b6b', fontSize: 12 },
                }}
              />
              <ReferenceLine
                x={runTime}
                stroke="#00ff00"
                strokeDasharray="5 5"
                label={{
                  value: '走り終了',
                  position: 'top',
                  style: { fill: '#00ff00', fontSize: 12 },
                }}
              />
              <Line
                type="monotone"
                dataKey="歩く"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="走る"
                stroke="#00ff00"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-boundary-dark p-4 rounded border-2 border-red-400">
              <h3 className="text-red-400 mb-2 font-bold">歩く場合</h3>
              <p className="text-boundary-mist text-sm">
                所要時間: {walkTime.toFixed(1)}秒
              </p>
              <p className="text-boundary-mist text-sm">
                最終的な濡れ量:{' '}
                {data.find(d => d.rainDuration >= walkTime)?.歩く.toFixed(3)}L
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded border-2 border-green-400">
              <h3 className="text-green-400 mb-2 font-bold">走る場合</h3>
              <p className="text-boundary-mist text-sm">
                所要時間: {runTime.toFixed(1)}秒
              </p>
              <p className="text-boundary-mist text-sm">
                最終的な濡れ量:{' '}
                {data.find(d => d.rainDuration >= runTime)?.走る.toFixed(3)}L
              </p>
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
              「グラフを見れば一目瞭然だ。」
            </p>
            <p className="monologue">
              「雨がすぐ止む場合（緑の線が止まった後）は、走ったほうが濡れない。」
            </p>
            <p className="monologue">
              「しかし、雨が長時間降り続ける場合、赤い線と緑の線は平行になる。」
            </p>
            <p className="monologue">
              「つまり、走っても歩いても濡れる量は同じペースで増える。」
            </p>
            <p className="monologue text-boundary-cyan">
              「『走れば濡れない』は嘘じゃない。ただし、条件付きの真実だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          濡れる量の計算式
        </h3>
        <div className="simulator-container">
          <div className="space-y-4">
            <div className="bg-boundary-dark p-4 rounded">
              <h4 className="text-boundary-cyan mb-2">上から降る雨</h4>
              <p className="text-boundary-mist text-sm font-mono">
                濡れる量 = 体の水平断面積 × 雨の強さ × 時間
              </p>
              <p className="text-xs text-boundary-mist mt-2">
                ※ 歩いても走っても時間あたりの量は同じ
              </p>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <h4 className="text-boundary-cyan mb-2">前から受ける雨</h4>
              <p className="text-boundary-mist text-sm font-mono">
                濡れる量 = 体の垂直断面積 × 移動速度 × 雨の強さ × 時間
              </p>
              <p className="text-xs text-boundary-mist mt-2">
                ※ 走ると移動速度が上がるので、時間あたりの量は増える
              </p>
            </div>

            <div className="bg-boundary-indigo p-4 rounded border-2 border-boundary-cyan">
              <h4 className="text-boundary-cyan mb-2">結論</h4>
              <ul className="space-y-2 text-boundary-mist text-sm">
                <li>
                  • 雨がすぐ止む場合：走れば早く目的地に着くので、上からの雨が減る
                  → 走ったほうが濡れない
                </li>
                <li>
                  • 雨が降り続ける場合：走っても歩いても、最終的な濡れる量は同じ
                  → 走る意味はない（体力の無駄）
                </li>
                <li className="text-boundary-cyan">
                  • 判断基準：雨がいつ止むかわからない → 走るべきかは運次第
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          よくある誤解
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>
              • 「走れば雨粒の数が少ない」← 半分正しい。上からの雨は減るが、前からの雨は増える
            </li>
            <li>
              • 「走れば必ず濡れない」← 間違い。雨が降り続けるなら同じ
            </li>
            <li>
              • 「歩いたほうが濡れない」← 間違い。すぐ止む雨なら走ったほうが良い
            </li>
            <li className="text-boundary-cyan">
              • 真実：雨の継続時間次第。事前にわからない以上、走るべきかは確率的判断
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          実験してみよう
        </h3>
        <div className="simulator-container">
          <p className="text-boundary-mist mb-4">
            距離や雨の強さを変えて、グラフがどう変化するか観察してください：
          </p>
          <ul className="space-y-2 text-boundary-mist">
            <li>
              • 距離を長くする → 歩く/走る時間の差が広がる → 走る優位性が増す
            </li>
            <li>
              • 雨を強くする → 全体的な濡れ量が増える → 比率は変わらない
            </li>
            <li>
              • 体を大きくする → 前から受ける雨が増える → 走る優位性が減る
            </li>
            <li className="text-boundary-cyan">
              • グラフの交点（走り終了時点）を超えて雨が続くと、差がなくなる
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
