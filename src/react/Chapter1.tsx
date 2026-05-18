import { useState } from 'react';

export default function Chapter1() {
  const [effort, setEffort] = useState(50);
  const baseProbability = 0.001; // 0.1%
  const maxProbability = 0.1; // 10%
  const probability = Math.min(
    baseProbability * (1 + effort / 10),
    maxProbability
  );

  const totalPopulation = 125000000; // 日本の人口
  const mangakaCount = 6000; // 漫画家の数
  const ratio = (mangakaCount / totalPopulation) * 100;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">第一章：確率と割合の境界線</h1>
        <p className="text-boundary-cyan text-lg">
          The Borderline Between Probability and Ratio
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「確率と割合は、同じようで違う。」</p>
          <p className="monologue">
            「それを知ったのは、ある奇妙な統計資料を見たときだった。」
          </p>
          <p className="monologue">
            「『漫画家になれる確率』と『漫画家の割合』——この二つは、全く異なる意味を持つ。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          漫画家になれる確率
        </h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div>
              <label className="block text-boundary-mist mb-2">
                努力レベル: {effort}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={effort}
                onChange={e => setEffort(Number(e.target.value))}
                className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-2">基礎確率</p>
                <p className="text-3xl text-boundary-cyan font-mono">
                  {(baseProbability * 100).toFixed(3)}%
                </p>
              </div>

              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-2">努力後の確率</p>
                <p className="text-3xl text-boundary-cyan font-mono">
                  {(probability * 100).toFixed(3)}%
                </p>
              </div>
            </div>

            <p className="text-boundary-mist text-sm">
              努力によって確率は
              <span className="text-boundary-cyan font-bold">
                {((probability / baseProbability) * 100).toFixed(0)}%
              </span>
              に上昇した。
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          漫画家の割合
        </h2>

        <div className="simulator-container">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-2">日本の人口</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {totalPopulation.toLocaleString()}
                </p>
              </div>

              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-2">漫画家の数</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {mangakaCount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <p className="text-sm text-boundary-mist mb-2">漫画家の割合</p>
              <p className="text-3xl text-boundary-cyan font-mono">
                {ratio.toFixed(4)}%
              </p>
              <p className="text-sm text-boundary-mist mt-2">
                ≈ {Math.round(totalPopulation / mangakaCount).toLocaleString()}
                人に1人
              </p>
            </div>

            <p className="text-boundary-mist text-sm">
              この割合は、どれだけ個人が努力しても変わらない。
              <br />
              社会が許容する枠は、構造的に決まっている。
            </p>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">「努力すれば『なれる確率』は上がる。」</p>
            <p className="monologue">
              「しかし、『社会が許す割合』は変わらない。」
            </p>
            <p className="monologue">
              「この違いを理解しない者は、確率と割合の境界線を見失う。」
            </p>
            <p className="monologue">
              「『10%の人が成功する』と聞いて、自分がその10%に入れると信じるのは——」
            </p>
            <p className="monologue text-boundary-cyan">「錯覚だ。」</p>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">重要な区別</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="simulator-container">
            <h4 className="text-boundary-cyan mb-2">確率</h4>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>• 未来の可能性</li>
              <li>• 努力で変えられる</li>
              <li>• 個人の選択に依存</li>
              <li>• 例：試験に合格する確率</li>
            </ul>
          </div>

          <div className="simulator-container">
            <h4 className="text-boundary-cyan mb-2">割合</h4>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>• 現在の分布</li>
              <li>• 社会構造で決まる</li>
              <li>• 全体の制約に依存</li>
              <li>• 例：合格者の割合</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
