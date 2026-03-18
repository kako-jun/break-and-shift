import HspEmbed from '../components/HspEmbed';

export default function SlotMachine() {
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
          <p className="monologue">
            「あれを見て、『当たるかも！』と期待する。」
          </p>
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
          スロットシミュレーター
        </h2>

        <HspEmbed experiment="slot-machine" title="スロットの演出詐欺" />
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">「種別開示モードで見れば一目瞭然だ。」</p>
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
              •
              スロットは乱数生成器（RNG）で結果を決定。レバーを引いた瞬間に確定
            </li>
            <li>
              • リーチ演出は「もうすぐ当たりそう」と錯覚させるための心理トリック
            </li>
            <li>
              • 実際にはリーチの多くがハズレ（ハズレリーチ）。期待値は変わらない
            </li>
            <li>
              • 演出の長さは、プレイ時間を引き延ばして店の滞在時間を増やす
            </li>
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
            <li>• 大当たり (777): 0.1% (1000倍)</li>
            <li>• 中当たり (star x3): 0.5% (300倍)</li>
            <li>• 小当たり (bell x3): 2% (100倍)</li>
            <li>• チェリー (cherry x3): 5% (50倍)</li>
            <li className="text-boundary-cyan">
              • 合計当選率: 約7.6% / 期待値: 約75円（100円投資に対して）
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
