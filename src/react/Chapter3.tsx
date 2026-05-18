import { useState } from 'react';

interface Organism {
  id: number;
  strength: number;
  alive: boolean;
}

export default function Chapter3() {
  const [mode, setMode] = useState<'tournament' | 'natural'>('tournament');
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [generation, setGeneration] = useState(0);
  const [survivalThreshold, setSurvivalThreshold] = useState(50);

  const initializeOrganisms = (count: number) => {
    const newOrganisms: Organism[] = [];
    for (let i = 0; i < count; i++) {
      newOrganisms.push({
        id: i,
        strength: Math.random() * 100,
        alive: true,
      });
    }
    setOrganisms(newOrganisms);
    setGeneration(0);
  };

  const runTournament = () => {
    const alive = organisms.filter(o => o.alive);
    if (alive.length <= 1) return;

    // ランダムに2体を選んで戦わせる
    const fighter1 = alive[Math.floor(Math.random() * alive.length)];
    const fighter2 = alive[Math.floor(Math.random() * alive.length)];

    if (fighter1.id === fighter2.id) return;

    // 強い方が勝つ
    const loser = fighter1.strength > fighter2.strength ? fighter2 : fighter1;

    setOrganisms(prev =>
      prev.map(o => (o.id === loser.id ? { ...o, alive: false } : o))
    );
    setGeneration(prev => prev + 1);
  };

  const runNaturalSelection = () => {
    setOrganisms(prev =>
      prev.map(o => ({
        ...o,
        alive: o.alive && o.strength >= survivalThreshold,
      }))
    );
    setGeneration(prev => prev + 1);
  };

  const aliveCount = organisms.filter(o => o.alive).length;
  const winner = aliveCount === 1 ? organisms.find(o => o.alive) : null;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="chapter-title">第三章：進化のトーナメント</h1>
        <p className="text-boundary-cyan text-lg">
          Tournament of Evolution vs Natural Selection
        </p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">「自然界は、勝者を選ばない。」</p>
          <p className="monologue">「誰も生き残らなくても、世界は回る。」</p>
          <p className="monologue">
            「それが人間社会と自然の、決定的な違いだった。」
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          二つの選択メカニズム
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setMode('tournament')}
            className={`p-6 rounded-lg border-2 transition-all ${
              mode === 'tournament'
                ? 'border-boundary-cyan bg-boundary-blue'
                : 'border-boundary-blue/30 bg-boundary-indigo/20'
            }`}
          >
            <h3 className="text-xl text-boundary-cyan mb-2">
              トーナメント型進化
            </h3>
            <p className="text-sm text-boundary-mist">
              必ず1体が勝ち残る。人間社会の競争モデル。
            </p>
          </button>

          <button
            onClick={() => setMode('natural')}
            className={`p-6 rounded-lg border-2 transition-all ${
              mode === 'natural'
                ? 'border-boundary-cyan bg-boundary-blue'
                : 'border-boundary-blue/30 bg-boundary-indigo/20'
            }`}
          >
            <h3 className="text-xl text-boundary-cyan mb-2">自然淘汰</h3>
            <p className="text-sm text-boundary-mist">
              基準を満たさなければ全滅もあり得る。自然界のモデル。
            </p>
          </button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-boundary-silver">
          シミュレーション
        </h2>

        <div className="simulator-container">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">世代</p>
                <p className="text-2xl text-boundary-silver font-mono">
                  {generation}
                </p>
              </div>
              <div className="bg-boundary-dark p-4 rounded">
                <p className="text-sm text-boundary-mist mb-1">生存者数</p>
                <p className="text-2xl text-boundary-cyan font-mono">
                  {aliveCount} / {organisms.length}
                </p>
              </div>
            </div>

            {mode === 'natural' && (
              <div>
                <label className="block text-boundary-mist mb-2">
                  生存基準: {survivalThreshold}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={survivalThreshold}
                  onChange={e => setSurvivalThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-boundary-blue rounded-lg appearance-none cursor-pointer accent-boundary-cyan"
                />
                <p className="text-xs text-boundary-mist mt-1">
                  強さがこの値以下の個体は淘汰される
                </p>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => initializeOrganisms(10)}
                className="button-primary"
              >
                10体で開始
              </button>
              <button
                onClick={() => initializeOrganisms(50)}
                className="button-primary"
              >
                50体で開始
              </button>
              <button
                onClick={() => initializeOrganisms(100)}
                className="button-primary"
              >
                100体で開始
              </button>
              {organisms.length > 0 && (
                <>
                  {mode === 'tournament' && (
                    <button
                      onClick={runTournament}
                      className="button-secondary"
                      disabled={aliveCount <= 1}
                    >
                      1回戦う
                    </button>
                  )}
                  {mode === 'natural' && (
                    <button
                      onClick={runNaturalSelection}
                      className="button-secondary"
                    >
                      淘汰を実行
                    </button>
                  )}
                </>
              )}
            </div>

            {winner && (
              <div className="bg-boundary-dark p-4 rounded border-2 border-boundary-cyan">
                <p className="text-boundary-cyan mb-2">🏆 勝者</p>
                <p className="text-boundary-silver">
                  個体 #{winner.id} (強さ: {winner.strength.toFixed(2)})
                </p>
              </div>
            )}

            {organisms.length > 0 && aliveCount === 0 && (
              <div className="bg-boundary-dark p-4 rounded border-2 border-red-500">
                <p className="text-red-400 mb-2">💀 全滅</p>
                <p className="text-boundary-mist text-sm">
                  全ての個体が淘汰されました
                </p>
              </div>
            )}

            {organisms.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h3 className="text-boundary-cyan text-sm">個体リスト</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {organisms.map(org => (
                    <div
                      key={org.id}
                      className={`p-2 rounded text-xs ${
                        org.alive
                          ? 'bg-boundary-blue'
                          : 'bg-boundary-dark opacity-50'
                      }`}
                    >
                      <p className="text-boundary-mist">
                        #{org.id} {org.alive ? '🟢' : '💀'}
                      </p>
                      <p className="text-boundary-silver font-mono">
                        {org.strength.toFixed(1)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <h3 className="text-xl text-boundary-cyan mb-4">境界ユウの考察</h3>
          <div className="space-y-4">
            <p className="monologue">
              「トーナメント型では、必ず誰かが勝つ。」
            </p>
            <p className="monologue">「だが自然淘汰では、全滅もあり得る。」</p>
            <p className="monologue">
              「人間社会は『誰かが必ず成功する』と思い込んでいる。」
            </p>
            <p className="monologue">
              「それは、トーナメント型のルールに慣れているからだ。」
            </p>
            <p className="monologue text-boundary-cyan">
              「自然は、そんなに優しくない。」
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-serif text-boundary-silver">重要な違い</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="simulator-container">
            <h4 className="text-boundary-cyan mb-2">トーナメント型</h4>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>• 必ず勝者が出る</li>
              <li>• 相対的な強さで決まる</li>
              <li>• 人間社会の競争</li>
              <li>• 例：受験、オーディション</li>
            </ul>
          </div>

          <div className="simulator-container">
            <h4 className="text-boundary-cyan mb-2">自然淘汰</h4>
            <ul className="space-y-2 text-boundary-mist text-sm">
              <li>• 全滅もあり得る</li>
              <li>• 絶対的な基準で決まる</li>
              <li>• 自然界の選択</li>
              <li>• 例：環境適応、生存競争</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
