import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const chapters = [
  { id: 1, title: '第一章：確率と割合の境界線', path: '/chapter1' },
  { id: 2, title: '第二章：祈りは確率を変えない', path: '/chapter2' },
  { id: 3, title: '第三章：進化のトーナメント', path: '/chapter3' },
  { id: 4, title: '第四章：ガチャの天井と煽り文句', path: '/chapter4' },
  { id: 5, title: '第五章：確率の森で迷う', path: '/chapter5' },
  {
    id: 6,
    title: '特別編：チンチロリン（3D物理演算）',
    path: '/chinchirorin',
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-boundary-darker">
      <nav className="border-b border-boundary-blue/30 bg-boundary-darker/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-serif text-boundary-silver hover:text-boundary-cyan transition-colors duration-300"
            >
              確率と割合の境界線
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 min-h-screen border-r border-boundary-blue/30 bg-boundary-indigo/20 hidden lg:block">
          <div className="sticky top-16 p-6">
            <nav className="space-y-2">
              <Link
                to="/"
                className={`block px-4 py-2 rounded transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'bg-boundary-blue text-boundary-silver'
                    : 'text-boundary-mist hover:text-boundary-silver hover:bg-boundary-blue/50'
                }`}
              >
                序章
              </Link>
              {chapters.map(chapter => (
                <Link
                  key={chapter.id}
                  to={chapter.path}
                  className={`block px-4 py-2 rounded transition-all duration-300 ${
                    location.pathname === chapter.path
                      ? 'bg-boundary-blue text-boundary-silver'
                      : 'text-boundary-mist hover:text-boundary-silver hover:bg-boundary-blue/50'
                  }`}
                >
                  {chapter.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>
      </div>

      <footer className="border-t border-boundary-blue/30 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-boundary-mist text-sm">
            確率と割合の境界線 - Borderline of Chance and Share
          </p>
        </div>
      </footer>
    </div>
  );
}
