export default function Home() {
  return (
    <div className="space-y-12">
      <header className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-serif text-boundary-silver tracking-wide">
          確率と割合の境界線
        </h1>
        <p className="text-xl md:text-2xl text-boundary-cyan font-sans tracking-wider">
          Borderline of Chance and Share
        </p>
        <p className="text-lg text-boundary-mist max-w-2xl mx-auto leading-relaxed">
          ブレイク（break）は境界を破る、転換点的な意味も含む。
          <br />
          シフト（shift）は境界が動く、変化の兆しを含む。
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <div className="space-y-4">
            <p className="monologue">「確率と割合は、同じようで違う。」</p>
            <p className="monologue">
              「それを知ったのは、ある奇妙な統計資料を見たときだった。」
            </p>
            <p className="monologue">
              「私の名は境界ユウ。確率と割合の世界を調査する者だ。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-serif text-boundary-silver">
          この調査について
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="simulator-container">
            <h3 className="text-xl text-boundary-cyan mb-4">確率とは？</h3>
            <p className="text-boundary-mist leading-relaxed">
              未来の出来事が起こる可能性。努力や選択によって変えることができる。
              <br />
              <span className="text-sm text-boundary-mist/70">
                例：宝くじが当たる確率 = 1/10,000,000
              </span>
            </p>
          </div>

          <div className="simulator-container">
            <h3 className="text-xl text-boundary-cyan mb-4">割合とは？</h3>
            <p className="text-boundary-mist leading-relaxed">
              全体に対する一部の比率。社会の構造によって決まる。
              <br />
              <span className="text-sm text-boundary-mist/70">
                例：漫画家の割合 = 約6,000人 / 日本の人口
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <h2 className="text-3xl font-serif text-boundary-silver">調査の目的</h2>
        <div className="simulator-container">
          <ul className="space-y-4 text-boundary-mist">
            <li className="flex items-start">
              <span className="text-boundary-cyan mr-3">•</span>
              <span>
                「願うだけで必ず10%はなれる世界」ではないことを理解する
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-boundary-cyan mr-3">•</span>
              <span>
                宝くじで祈ることや努力することは、当選確率に関係ないことを知る
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-boundary-cyan mr-3">•</span>
              <span>進化のトーナメントと自然淘汰の違いを体験する</span>
            </li>
            <li className="flex items-start">
              <span className="text-boundary-cyan mr-3">•</span>
              <span>ガチャの天井あり・なしの違いを確率で理解する</span>
            </li>
            <li className="flex items-start">
              <span className="text-boundary-cyan mr-3">•</span>
              <span>人間を誤解させる煽り文句の真実を見抜く</span>
            </li>
          </ul>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="text-center space-y-6">
        <p className="monologue">「確率は冷静で、興奮では変わらない。」</p>
        <p className="monologue">
          「境界線を知ることで、誤解から自由になれる。」
        </p>
        <p className="text-boundary-mist/70 text-sm">
          — 境界ユウの調査記録より
        </p>
      </section>
    </div>
  );
}
