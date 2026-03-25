import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubjectPage from './pages/SubjectPage';
import ChapterPage from './pages/ChapterPage';
import ResourcesPage from './pages/ResourcesPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--color-border)', background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 text-lg font-bold" style={{ color: '#f1f5f9' }}>
              <span className="text-2xl">📚</span>
              <span>学习资料库</span>
            </a>
            <div className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-indigo-400 transition-colors" style={{ color: '#94a3b8' }}>首页</a>
              <a href="/?tab=resources" className="text-sm font-medium hover:text-indigo-400 transition-colors" style={{ color: '#94a3b8' }}>资源</a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:slug" element={<SubjectPage />} />
          <Route path="/subject/:slug/chapter/:num" element={<ChapterPage />} />
          <Route path="/subject/:slug/resources/:type" element={<ResourcesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer */}
        <footer className="mt-16 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-6 py-8 text-center">
            <p className="text-sm" style={{ color: '#64748b' }}>
              📚 学习资料库 · 多学科并行学习系统
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
