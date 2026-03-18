import HspEmbed from '../components/HspEmbed';

export default function ClawMachine() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">クレーンゲームの期待値操作</h1>
        <p className="text-boundary-cyan text-lg">Claw Machine Rigged System</p>
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
        <h2 className="text-2xl font-serif text-boundary-silver">
          クレーンゲームシミュレーター
        </h2>

        <HspEmbed
          experiment="claw-machine"
          title="クレーンゲームの期待値操作"
        />
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
            <li>• 期待値500円 = 100円x5回で1個取れる設定</li>
            <li>
              • 握力は失敗回数に応じて線形増加（10% → 32.5% → 55% → 77.5% →
              100%）
            </li>
            <li>• 1回目で取れる確率は10%、2回目で32.5%...と徐々に上昇</li>
            <li>• 長期的には設定通りの期待値に収束する</li>
            <li className="text-boundary-cyan">
              • 人間は「次こそは取れるかも」と期待してしまうが、実際には計算通り
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
            <li>• 風営法・景品表示法では「期待値」が規制の対象</li>
            <li>• 500円で500円相当（または設定額相当）の景品が取れれば合法</li>
            <li>• 各回の成功確率が異なることは規制されていない</li>
            <li>
              •
              客は「技術介入できる」と思い込んでいるため、ギャンブルと認識されない
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
