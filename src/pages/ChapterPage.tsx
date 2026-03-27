import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { marked } from 'marked';
import renderMathInElement from 'katex/contrib/auto-render';
import SUBJECTS from '../data/studyData';
import { getChapterContent } from '../data/chapterContent';

// ============================================================
// 渲染策略：
// 1. 预处理剥离 $$...$$ 和 $...$ LaTeX 块（用占位符保护）
// 2. marked.parse() 解析纯 Markdown（无 LaTeX 冲突）
// 3. restoreLatex() 还原 LaTeX 文本
// 4. renderMathInElement() 用 MathML 模式渲染公式
// ============================================================

const DISPLAY_RE = /\$\$[\s\S]+?\$\$/g;
const INLINE_RE  = /(?<!\$)\$(?!\$)(?:\\.|[^$\\])+?(?<!\$)\$(?!\$)/g;
const DSP = (n: number) => `\x00DSP${n}\x00`;
const INL = (n: number) => `\x00INL${n}\x00`;

function protectLatex(text: string): { text: string; display: string[]; inline: string[] } {
  const display: string[] = [];
  let i = 0;
  let t = text.replace(DISPLAY_RE, m => { display.push(m); return DSP(i++); });
  const inline: string[] = [];
  i = 0;
  t = t.replace(INLINE_RE, m => { inline.push(m); return INL(i++); });
  return { text: t, display, inline };
}

function restoreLatex(text: string, display: string[], inline: string[]): string {
  let r = text;
  for (let j = 0; j < display.length; j++) r = r.replace(DSP(j), display[j]);
  for (let j = 0; j < inline.length; j++) r = r.replace(INL(j), inline[j]);
  return r;
}

marked.setOptions({ gfm: true, breaks: false });

function markdownToHtml(rawMarkdown: string): string {
  const { text: protected_, display, inline } = protectLatex(rawMarkdown);
  const html = marked.parse(protected_) as string;
  let result = restoreLatex(html, display, inline);
  // 修复已存储 HTML 中的 **bold** 语法（marked 不处理已渲染的 HTML 块）
  result = result.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
  return result;
}

export default function ChapterPage() {
  const { slug, num } = useParams<{ slug: string; num: string }>();
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasContent, setHasContent] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const subject = SUBJECTS.find(s => s.slug === slug);
  const chapterNum = parseInt(num || '1', 10);
  const chapter = subject?.chapters.find(c => c.number === chapterNum);

  const buildContent = useCallback(() => {
    if (!subject || !chapter) return;
    const raw = getChapterContent(slug as string, chapterNum);
    if (raw) {
      setHtml(markdownToHtml(raw));
      setHasContent(true);
    } else {
      setHtml('');
      setHasContent(false);
    }
    setLoading(false);
  }, [slug, chapterNum, subject, chapter]);

  useEffect(() => {
    if (!subject || !chapter) { setLoading(false); return; }
    setLoading(true);
    setHasContent(false);
    buildContent();
  }, [buildContent]);

  // KaTeX MathML 渲染
  useEffect(() => {
    if (!contentRef.current || !hasContent) return;
    try {
      renderMathInElement(contentRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false },
        ],
        output: 'mathml',
        throwOnError: false,
        trust: false,
        strict: false,
        ignoredTags: ['script', 'style', 'textarea', 'pre', 'code', 'kbd'],
      });
    } catch (_) { /* ignore */ }
  }, [html, hasContent]);

  if (!subject || !chapter) {
    return (
      <div style={{ maxWidth: 600, margin: '6rem auto', textAlign: 'center', padding: '0 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>未找到该章节</h2>
        <Link to="/" style={{ color: '#818cf8', textDecoration: 'none' }}>← 返回首页</Link>
      </div>
    );
  }

  const prevChapter = subject.chapters.find(c => c.number === chapterNum - 1);
  const nextChapter = subject.chapters.find(c => c.number === chapterNum + 1);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">{subject.emoji}</div>
            <span>{subject.name}</span>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">首页</Link>
            <Link to={`/subject/${subject.slug}`} className="navbar-link">{subject.name}</Link>
            <Link to={`/subject/${subject.slug}/chapter/${chapterNum}`} className="navbar-link active">Ch{chapterNum}</Link>
          </div>
        </div>
      </nav>

      <div className="page-with-sidebar">
        {/* Sidebar */}
        <aside>
          <div className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-emoji">{subject.emoji}</span>
              <div>
                <div className="sidebar-title">{subject.name}</div>
                <div className="sidebar-label">章节导航</div>
              </div>
            </div>
            <div className="sidebar-section">章节</div>
            <nav className="sidebar-nav">
              {subject.chapters.map(ch => {
                const isActive = ch.number === chapterNum;
                const isDone = ch.status === 'done';
                return (
                  <Link key={ch.number}
                    to={ch.status !== 'locked' ? `/subject/${subject.slug}/chapter/${ch.number}` : '#'}
                    onClick={e => ch.status === 'locked' && e.preventDefault()}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                  >
                    <span style={{ width: '1.2rem', textAlign: 'center', fontSize: '0.75rem', color: isDone ? '#4ade80' : isActive ? '#a5b4fc' : '#3a5070' }}>
                      {isDone ? '✓' : ch.number}
                    </span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                      {ch.title.split('：')[0].replace(/第.章\s*/, '')}
                    </span>
                  </Link>
                );
              })}
            </nav>
            <div className="sidebar-section" style={{ marginTop: '1rem' }}>资源</div>
            <nav>
              {([
                { label: '📚 教材', to: 'books' },
                { label: '🌐 网站', to: 'websites' },
                { label: '🎬 视频', to: 'videos' },
                { label: '🗺️ 路径', to: 'roadmap' },
              ] as const).map(r => (
                <Link key={r.to} to={`/subject/${subject.slug}/resources/${r.to}`} className="sidebar-item">{r.label}</Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main>
          <div className="breadcrumb">
            <Link to="/">首页</Link>
            <span className="breadcrumb-sep">›</span>
            <Link to={`/subject/${subject.slug}`}>{subject.name}</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">Ch{chapterNum} {chapter.title.split('：')[0]}</span>
          </div>

          {/* Chapter header */}
          <div className="chapter-header-card animate-fade-up" style={{ borderColor: `${subject.color}33` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.72rem', background: `${subject.color}18`, color: subject.accentColor, border: `1px solid ${subject.color}33` }}>
                第{chapterNum}章
              </span>
              {chapter.status === 'done' && (
                <span style={{ padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.72rem', background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                  ✅ 已完成
                </span>
              )}
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {chapter.title}
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#5a7394' }}>
              ⏱ 预估学时 {chapter.hours}h &nbsp;·&nbsp; 📌 前置：{chapter.prerequisites.join('、')}
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#5a7394', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>🎯 学习目标</div>
              {chapter.objectives.map((obj, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.875rem' }}>
                  <span style={{ color: subject.accentColor, marginTop: '0.1rem', flexShrink: 0 }}>✓</span>
                  <span style={{ color: '#8b9ab8' }}>{obj}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {chapter.practices.map((p, idx) => (
                <span key={idx} style={{ padding: '0.2rem 0.65rem', borderRadius: 999, fontSize: '0.72rem', background: 'rgba(99,102,241,0.08)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
                  🔧 {p}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="content-card">
            {loading && (
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <div className="spinner" />
                <p style={{ marginTop: '1rem', color: '#5a7394', fontSize: '0.88rem' }}>加载中...</p>
              </div>
            )}
            {!loading && hasContent && (
              <div className="prose-study" ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
            )}
            {!loading && !hasContent && (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📖</div>
                <h3 style={{ color: '#e8edf5', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>{chapter.title}</h3>
                <p style={{ color: '#5a7394', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 2rem' }}>
                  本章教程尚未生成。在 <strong style={{ color: '#a5b4fc' }}>OpenClaw</strong> 中说：
                </p>
                <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 10, padding: '0.75rem 1.5rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#a5b4fc', marginBottom: '2rem' }}>
                  "生成 {subject.name} 第{chapterNum}章"
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
                  <div style={{ background: 'rgba(13,21,38,0.5)', border: '1px solid rgba(30,45,74,0.6)', borderRadius: 12, padding: '1rem' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#5a7394', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>📚 核心概念</div>
                    {chapter.concepts.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.3rem', fontSize: '0.8rem', color: '#8b9ab8' }}>
                        <span style={{ color: subject.accentColor, marginTop: '0.05rem', flexShrink: 0 }}>▸</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(13,21,38,0.5)', border: '1px solid rgba(30,45,74,0.6)', borderRadius: 12, padding: '1rem' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#5a7394', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>🔧 推荐练习</div>
                    {chapter.practices.map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.3rem', fontSize: '0.8rem', color: '#8b9ab8' }}>
                        <span style={{ color: '#fb923c', marginTop: '0.05rem', flexShrink: 0 }}>🔧</span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {!loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              {prevChapter ? (
                <Link to={`/subject/${subject.slug}/chapter/${prevChapter.number}`} className="nav-btn">
                  ← Ch{prevChapter.number} {prevChapter.title.split('：')[0]}
                </Link>
              ) : <div />}
              {nextChapter && nextChapter.status !== 'locked' ? (
                <Link to={`/subject/${subject.slug}/chapter/${nextChapter.number}`} className="nav-btn nav-btn-primary">
                  Ch{nextChapter.number} {nextChapter.title.split('：')[0]} →
                </Link>
              ) : (
                <Link to={`/subject/${subject.slug}`} className="nav-btn" style={{ background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)', color: '#4ade80' }}>
                  ✅ 返回学科概览
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
