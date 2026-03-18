import HspEmbed from '../components/HspEmbed';

export default function Janken() {
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
        <h2 className="text-2xl font-serif text-boundary-silver">
          じゃんけん対戦
        </h2>

        <HspEmbed experiment="janken" title="じゃんけんの後出し必勝法" />
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
                  <p className="text-4xl text-center mb-2">&#x270A;</p>
                  <p className="text-center text-boundary-silver">
                    35%（安定感を求める心理）
                  </p>
                </div>
                <div className="bg-boundary-dark p-4 rounded">
                  <p className="text-4xl text-center mb-2">&#x270C;&#xFE0F;</p>
                  <p className="text-center text-boundary-silver">
                    30%（攻撃的な印象）
                  </p>
                </div>
                <div className="bg-boundary-dark p-4 rounded">
                  <p className="text-4xl text-center mb-2">&#x270B;</p>
                  <p className="text-center text-boundary-silver">
                    35%（グーを警戒）
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
