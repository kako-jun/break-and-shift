import HspEmbed from '../components/HspEmbed';

export default function RainWalk() {
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
            「理想状態ではそうだね。でも、世界は理想じゃないんだ。」
          </p>
          <p className="monologue">
            「真実は、その雨がすぐ止むか、降り続けるかによる。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          濡れる量の比較シミュレーター
        </h2>

        <HspEmbed
          experiment="rain-walk"
          title="雨の中は走るべきか、歩くべきか"
        />
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">「グラフを見れば一目瞭然だ。」</p>
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
                濡れる量 = 体の水平断面積 x 雨の強さ x 時間
              </p>
              <p className="text-xs text-boundary-mist mt-2">
                ※ 歩いても走っても時間あたりの量は同じ
              </p>
            </div>

            <div className="bg-boundary-dark p-4 rounded">
              <h4 className="text-boundary-cyan mb-2">前から受ける雨</h4>
              <p className="text-boundary-mist text-sm font-mono">
                濡れる量 = 体の垂直断面積 x 移動速度 x 雨の強さ x 時間
              </p>
              <p className="text-xs text-boundary-mist mt-2">
                ※ 走ると移動速度が上がるので、時間あたりの量は増える
              </p>
            </div>

            <div className="bg-boundary-indigo p-4 rounded border-2 border-boundary-cyan">
              <h4 className="text-boundary-cyan mb-2">結論</h4>
              <ul className="space-y-2 text-boundary-mist text-sm">
                <li>
                  •
                  雨がすぐ止む場合：走れば早く目的地に着くので、上からの雨が減る
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
              • 「走れば雨粒の数が少ない」←
              半分正しい。上からの雨は減るが、前からの雨は増える
            </li>
            <li>• 「走れば必ず濡れない」← 間違い。雨が降り続けるなら同じ</li>
            <li>
              • 「歩いたほうが濡れない」← 間違い。すぐ止む雨なら走ったほうが良い
            </li>
            <li className="text-boundary-cyan">
              •
              真実：雨の継続時間次第。事前にわからない以上、走るべきかは確率的判断
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
            <li>• 雨を強くする → 全体的な濡れ量が増える → 比率は変わらない</li>
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
