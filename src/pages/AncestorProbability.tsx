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

export default function AncestorProbability() {
  const [generations, setGenerations] = useState(30);

  // 世代ごとの先祖の数を計算
  const calculateAncestors = () => {
    const data = [];
    for (let gen = 0; gen <= 40; gen++) {
      const ancestors = Math.pow(2, gen);
      const year = 2024 - gen * 30; // 1世代=約30年
      const 日本の人口 =
        year >= 1900
          ? 50000000
          : year >= 1700
            ? 30000000
            : year >= 1500
              ? 10000000
              : year >= 1200
                ? 5000000
                : year >= 1000
                  ? 4000000
                  : year >= 800
                    ? 3000000
                    : 2000000;

      data.push({
        generation: gen,
        year,
        ancestors: ancestors > 1000000000000 ? 1000000000000 : ancestors,
        日本の人口,
        display:
          ancestors > 1000000000
            ? `${(ancestors / 1000000000).toFixed(0)}兆`
            : ancestors > 1000000
              ? `${(ancestors / 1000000).toFixed(0)}億`
              : ancestors.toLocaleString(),
      });
    }
    return data;
  };

  const data = calculateAncestors();
  const currentData = data.find(d => d.generation === generations);

  // 前世の計算
  const 過去の総人口 = 100000000000; // 1000億人（推定）
  const 歴史上の有名人 = 10000; // 1万人程度
  const 前世が有名人の確率 = (歴史上の有名人 / 過去の総人口) * 100;

  // 桓武天皇の世代数（約1200年前、1世代30年として40世代）
  const 桓武天皇の世代 = 40;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">前世と先祖の確率詐欺</h1>
        <p className="text-boundary-cyan text-lg">
          Probability Fraud of Past Lives and Ancestors
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「自称霊能力者は言う。『あなたの前世はクレオパトラです』と。」
          </p>
          <p className="monologue">
            「家系図調査サービスは言う。『あなたの先祖は桓武天皇です』と。」
          </p>
          <p className="monologue">
            「人は喜ぶ。自分が特別だと思いたいから。」
          </p>
          <p className="monologue">
            「理想状態ではそうだね。でも、世界は理想じゃないんだ。」
          </p>
          <p className="monologue text-boundary-cyan">
            「確率を計算すれば、それが詐欺だとわかる。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          前世が有名人である確率
        </h2>

        <div className="simulator-container space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">過去の総人口</p>
              <p className="text-2xl text-boundary-silver font-mono">
                約{(過去の総人口 / 1000000000).toFixed(0)}億人
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">歴史上の有名人</p>
              <p className="text-2xl text-boundary-cyan font-mono">
                約{(歴史上の有名人 / 1000).toFixed(0)}千人
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">
                前世が有名人の確率
              </p>
              <p className="text-2xl text-red-400 font-mono">
                {前世が有名人の確率.toFixed(5)}%
              </p>
            </div>
          </div>

          <div className="bg-red-900/20 p-4 rounded border-2 border-red-400">
            <h3 className="text-red-400 mb-2 font-bold">霊能力者の詐欺手口</h3>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>
                • 前世が有名人である確率: <strong>0.00001%</strong>（10万分の1）
              </li>
              <li>
                • にもかかわらず、霊能力者が告げる前世は
                <strong>ほぼ100%有名人</strong>
              </li>
              <li>
                •
                クレオパトラ、織田信長、ナポレオン...なぜか農民の前世は言わない
              </li>
              <li className="text-boundary-cyan">
                • これは統計的にあり得ない。明らかな詐欺である。
              </li>
            </ul>
          </div>

          <div className="bg-boundary-dark p-4 rounded">
            <h3 className="text-boundary-cyan mb-2">理想状態 vs 現実</h3>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm text-boundary-mist mb-2">
                  理想状態（確率通り）
                </p>
                <ul className="text-xs text-boundary-mist space-y-1">
                  <li>• 99.99999%の人の前世は無名の農民</li>
                  <li>• 0.00001%の人だけが有名人</li>
                  <li>• 1000万人の霊視で、1人だけ有名人</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-red-400 mb-2">
                  現実（霊能力者の主張）
                </p>
                <ul className="text-xs text-boundary-mist space-y-1">
                  <li>• ほぼ100%の前世が有名人</li>
                  <li>• クレオパトラの前世が数千人</li>
                  <li>• 農民の前世は誰もいない</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          桓武天皇の子孫である確率
        </h2>

        <div className="simulator-container space-y-6">
          <div>
            <label className="block text-boundary-mist mb-2">
              遡る世代数: {generations}世代（約{2024 - generations * 30}年）
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={generations}
              onChange={e => setGenerations(Number(e.target.value))}
              className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">先祖の数</p>
              <p className="text-2xl text-boundary-cyan font-mono">
                {currentData?.display}人
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">
                当時の日本の人口
              </p>
              <p className="text-2xl text-boundary-silver font-mono">
                約{(currentData!.日本の人口 / 1000000).toFixed(0)}百万人
              </p>
            </div>
            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-1">先祖/人口 比率</p>
              <p className="text-2xl text-yellow-400 font-mono">
                {currentData && currentData.ancestors > currentData.日本の人口
                  ? `${(currentData.ancestors / currentData.日本の人口).toFixed(0)}倍`
                  : `${((currentData!.ancestors / currentData!.日本の人口) * 100).toFixed(1)}%`}
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2a4a5a" />
              <XAxis
                dataKey="generation"
                stroke="#6b9aa8"
                label={{
                  value: '世代数',
                  position: 'insideBottom',
                  offset: -5,
                  style: { fill: '#6b9aa8' },
                }}
              />
              <YAxis
                scale="log"
                domain={[1, 1000000000000]}
                stroke="#6b9aa8"
                label={{
                  value: '人数（対数）',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#6b9aa8' },
                }}
                tickFormatter={value => {
                  if (value >= 1000000000000)
                    return `${(value / 1000000000000).toFixed(0)}兆`;
                  if (value >= 1000000000)
                    return `${(value / 1000000000).toFixed(0)}億`;
                  if (value >= 1000000)
                    return `${(value / 1000000).toFixed(0)}百万`;
                  return value.toLocaleString();
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a1929',
                  border: '1px solid #4a7c8c',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#6b9aa8' }}
                formatter={(value: number | string, name: string) => {
                  const numericValue =
                    typeof value === 'number' ? value : Number(value);
                  if (name === 'ancestors') {
                    if (numericValue >= 1000000000000)
                      return `${(numericValue / 1000000000000).toFixed(0)}兆人`;
                    if (numericValue >= 1000000000)
                      return `${(numericValue / 1000000000).toFixed(0)}億人`;
                    if (numericValue >= 1000000)
                      return `${(numericValue / 1000000).toFixed(0)}百万人`;
                    return numericValue.toLocaleString() + '人';
                  }
                  return numericValue.toLocaleString() + '人';
                }}
              />
              <Legend />
              <ReferenceLine
                x={桓武天皇の世代}
                stroke="#ff0000"
                strokeDasharray="5 5"
                label={{
                  value: '桓武天皇',
                  position: 'top',
                  style: { fill: '#ff0000', fontSize: 12 },
                }}
              />
              <Line
                type="monotone"
                dataKey="ancestors"
                name="理論上の先祖の数"
                stroke="#00ff00"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="日本の人口"
                name="当時の日本の人口"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="bg-green-900/20 p-4 rounded border-2 border-green-400">
            <h3 className="text-green-400 mb-2 font-bold">衝撃の事実</h3>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>• 桓武天皇は約1200年前（40世代前）の人物</li>
              <li>
                • 40世代遡ると、理論上の先祖の数は<strong>1兆人</strong>を超える
              </li>
              <li>
                • しかし、当時の日本の人口は約<strong>300万人</strong>
              </li>
              <li>
                • つまり、<strong>同じ人が何度も先祖に登場</strong>している
              </li>
              <li className="text-boundary-cyan">
                • 結論: 現代の日本人の<strong>ほぼ全員</strong>
                が桓武天皇の子孫である確率が極めて高い
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
              「『あなたの先祖は桓武天皇です』——それは嘘じゃない。」
            </p>
            <p className="monologue">
              「でも、あなただけが特別なわけじゃない。」
            </p>
            <p className="monologue">
              「日本人のほぼ全員が桓武天皇の子孫だ。確率的に。」
            </p>
            <p className="monologue">
              「家系図調査サービスは、それを知っている。でも教えない。」
            </p>
            <p className="monologue text-boundary-cyan">
              「人は『自分だけが特別』だと思いたい。その心理を利用する、それが詐欺だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          なぜ全員が桓武天皇の子孫なのか
        </h3>
        <div className="simulator-container">
          <div className="space-y-4">
            <div className="bg-boundary-dark p-4 rounded">
              <h4 className="text-boundary-cyan mb-2">指数関数的増加</h4>
              <p className="text-boundary-mist text-sm">
                世代を1つ遡るごとに、先祖の数は2倍になる。
                <br />
                1世代前: 2人（両親）
                <br />
                2世代前: 4人（祖父母）
                <br />
                3世代前: 8人（曾祖父母）
                <br />
                ...
                <br />
                40世代前: 2^40 = 約1.1兆人
              </p>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <h4 className="text-boundary-cyan mb-2">パンペルスト現象</h4>
              <p className="text-boundary-mist text-sm">
                理論上の先祖の数が、当時の人口を超えると、
                <strong>同じ人が何度も先祖に登場</strong>する。
                <br />
                これを「パンペルスト（pedigree collapse）」と呼ぶ。
                <br />
                つまり、遠い親戚同士が結婚を繰り返している。
              </p>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <h4 className="text-boundary-cyan mb-2">共通祖先の定理</h4>
              <p className="text-boundary-mist text-sm">
                数学的には、
                <strong>
                  十分な世代を遡ると、ある時点の全員が共通の先祖になる
                </strong>
                。
                <br />
                桓武天皇のように子供が多い人物の場合、その子孫は急速に広がる。
                <br />
                1200年も経てば、ほぼ全員が子孫になる確率が極めて高い。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          詐欺に騙されないために
        </h3>
        <div className="simulator-container">
          <ul className="space-y-3 text-boundary-mist">
            <li className="bg-boundary-dark p-3 rounded">
              <strong className="text-boundary-cyan">前世が有名人</strong>
              <br />
              <span className="text-sm">
                確率は0.00001%。霊能力者が100%有名人を言うのは統計的にあり得ない。
              </span>
            </li>
            <li className="bg-boundary-dark p-3 rounded">
              <strong className="text-boundary-cyan">先祖が天皇や武将</strong>
              <br />
              <span className="text-sm">
                確率は高い。でも、あなただけじゃない。日本人のほぼ全員が該当する。
              </span>
            </li>
            <li className="bg-boundary-dark p-3 rounded">
              <strong className="text-boundary-cyan">
                遺伝子検査で〇〇民族
              </strong>
              <br />
              <span className="text-sm">
                遺伝子は混ざり合っている。「純粋な〇〇民族」は幻想。
              </span>
            </li>
            <li className="bg-red-900/20 p-3 rounded border border-red-400">
              <strong className="text-red-400">共通点</strong>
              <br />
              <span className="text-sm">
                「あなただけが特別」と思わせる商法。確率を計算すれば嘘がわかる。
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          グラフの読み方
        </h3>
        <div className="simulator-container">
          <p className="text-boundary-mist mb-4">
            スライダーを動かして、世代数を変えてみてください：
          </p>
          <ul className="space-y-2 text-boundary-mist text-sm">
            <li>• 緑の線（理論上の先祖の数）は指数関数的に増加</li>
            <li>• 赤の線（当時の日本の人口）は緩やかに変化</li>
            <li>• 2つの線が交差する点を超えると、「パンペルスト現象」が発生</li>
            <li>• 40世代（桓武天皇の時代）では、先祖の数が人口の数十万倍</li>
            <li className="text-boundary-cyan">
              • つまり、ほぼ全員が桓武天皇の子孫である可能性が極めて高い
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
