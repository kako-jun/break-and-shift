import HspEmbed from '../components/HspEmbed';

export default function AncestorProbability() {
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
          先祖の数シミュレーター
        </h2>

        <HspEmbed
          experiment="ancestor-probability"
          title="前世と先祖の確率詐欺"
        />
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
          前世が有名人である確率
        </h3>
        <div className="simulator-container space-y-6">
          <div className="bg-red-900/20 p-4 rounded border-2 border-red-400">
            <h3 className="text-red-400 mb-2 font-bold">霊能力者の詐欺手口</h3>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>• 過去の総人口: 約1000億人 / 歴史上の有名人: 約1万人</li>
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
