import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="space-y-12 text-center py-24">
      <header>
        <h1 className="chapter-title">404</h1>
        <p className="text-boundary-cyan text-lg">Page Not Found</p>
      </header>

      <div className="boundary-line" />

      <section className="space-y-6">
        <div className="simulator-container">
          <p className="monologue">
            「このページは存在しない——確率0%の事象だ。」
          </p>
          <p className="monologue">
            「だが、ここに辿り着いたこと自体は、何かの確率の結果かもしれない。」
          </p>
        </div>
      </section>

      <Link
        to="/"
        className="inline-block px-6 py-3 bg-boundary-blue text-boundary-silver rounded hover:bg-boundary-blue/80 transition-colors duration-300"
      >
        序章に戻る
      </Link>
    </div>
  );
}
