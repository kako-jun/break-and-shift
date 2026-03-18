import HspEmbed from '../components/HspEmbed';

export default function SurvivorBias() {
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
          恒星の寿命分布シミュレーター
        </h2>

        <HspEmbed
          experiment="survivor-bias"
          title="生存者バイアスと地球の突然死"
        />
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
            <p className="monologue">「太陽フレアが異常に強まったら？」</p>
            <p className="monologue">「隕石が衝突したら？」</p>
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
              <strong className="text-boundary-cyan">
                第二次世界大戦の爆撃機
              </strong>
              <br />
              <span className="text-sm">
                帰還した機体の損傷箇所を補強すべき？いいえ。帰還
                <strong>できなかった</strong>機体が撃たれた箇所こそ致命的。
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
