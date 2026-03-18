import HspEmbed from '../components/HspEmbed';

export default function Chinchirorin() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">
          チンチロリン：3Dサイコロシミュレーター
        </h1>
        <p className="text-boundary-cyan text-lg">3D Dice Physics Simulation</p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「サイコロは、最も古典的な確率装置だ。」</p>
          <p className="monologue">
            「物理法則に従って転がり、6つの面のいずれかに落ち着く。」
          </p>
          <p className="monologue">
            「それは本当にランダムなのか？偏りは存在するのか？」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          3D物理シミュレーション
        </h2>

        <HspEmbed
          experiment="chinchirorin"
          title="チンチロリン：3Dサイコロシミュレーター"
        />
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">
              「試行回数が少ないうちは、大きな偏りが見られる。」
            </p>
            <p className="monologue">
              「しかし、回数を重ねるごとに、各面の出現率は均等に近づく。」
            </p>
            <p className="monologue">
              「これが『大数の法則』——確率は、収束する。」
            </p>
            <p className="monologue">
              「ゾロ目の理論確率は約2.78%。つまり36回に1回。」
            </p>
            <p className="monologue">
              「偏りを検出できても、次の出目を予測することはできない。」
            </p>
            <p className="monologue text-boundary-cyan">
              「それが、確率の本質だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">
          偏り検出について
        </h3>
        <div className="simulator-container">
          <ul className="space-y-2 text-boundary-mist">
            <li>• カイ二乗検定：統計的手法で偏りの有無を判定（有意水準5%）</li>
            <li>
              • 偏りが検出されても、それは過去のデータであり、未来を予測できない
            </li>
            <li>• もし予測できるなら、カジノで勝ち続けられるはずだ</li>
            <li>
              • 物理的なサイコロには製造誤差があり、わずかな偏りが存在し得る
            </li>
            <li className="text-boundary-cyan">
              • しかし、その偏りを利用して利益を得ることは極めて困難
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
