import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import SUBJECTS from '../data/studyData';

export default function SubjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [tab, setTab] = useState<'chapters' | 'overview'>('chapters');
  const subject = SUBJECTS.find(s => s.slug === slug);

  if (!subject) {
    return (
      <div style={{ maxWidth: '600px', margin: '6rem auto', textAlign: 'center', padding: '0 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
        <h2 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>未找到该学科</h2>
        <Link to="/" style={{ color: '#818cf8', textDecoration: 'none' }}>← 返回首页</Link>
      </div>
    );
  }

  const completed = subject.chapters.filter(c => c.status === 'done').length;
  const progress = Math.round((completed / subject.totalChapters) * 100);
  const nextChapter = subject.chapters.find(c => c.status !== 'done');

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
            <Link to={`/subject/${subject.slug}`} className="navbar-link active">章节</Link>
            <Link to={`/subject/${subject.slug}/resources/books`} className="navbar-link">教材</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 2rem 4rem' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">首页</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{subject.name}</span>
        </div>

        {/* Header card */}
        <div
          className="chapter-header-card animate-fade-up"
          style={{ borderColor: `${subject.color}33`, background: `linear-gradient(135deg, rgba(13,21,38,0.95), rgba(7,11,20,0.98))` }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '64px', height: '64px', borderRadius: '18px',
                background: `${subject.color}1a`, border: `1.5px solid ${subject.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', flexShrink: 0
              }}
            >
              {subject.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#f1f5f9', letterSpacing: '-0.02em' }}>{subject.name}</h1>
                <span className={`status-badge ${subject.status === 'learning' ? 'status-learning' : 'status-ready'}`}>
                  {subject.status === 'learning' ? '🔄 进行中' : '📋 待开始'}
                </span>
              </div>
              <p style={{ color: '#5a7394', fontSize: '0.88rem', lineHeight: 1.7 }}>{subject.description}</p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[
              { label: '总章节', value: subject.totalChapters },
              { label: '预估学时', value: subject.estimatedHours },
              { label: '已完成', value: completed },
              { label: '学习进度', value: `${progress}%` },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'rgba(7,11,20,0.5)', border: '1px solid rgba(30,45,74,0.5)', borderRadius: '10px', padding: '0.6rem 1rem', minWidth: '80px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: subject.accentColor }}>{stat.value}</div>
                <div style={{ fontSize: '0.65rem', color: '#5a7394', marginTop: '0.15rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#5a7394' }}>总体进度</span>
              <span style={{ fontSize: '0.75rem', color: subject.accentColor, fontWeight: 600 }}>{completed}/{subject.totalChapters} 章</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${subject.color}, ${subject.accentColor})` }} />
            </div>
          </div>
        </div>

        {/* Next chapter CTA */}
        {nextChapter && (
          <Link
            to={`/subject/${subject.slug}/chapter/${nextChapter.number}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.5rem', borderRadius: '14px', marginBottom: '1.5rem',
              background: `linear-gradient(135deg, ${subject.color}14, ${subject.color}08)`,
              border: `1px solid ${subject.color}33`, textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${subject.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>▶</div>
              <div>
                <div style={{ fontSize: '0.7rem', color: subject.accentColor, fontWeight: 600, marginBottom: '0.1rem' }}>下一章</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e8edf5' }}>Ch{nextChapter.number} · {nextChapter.title}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#5a7394', fontSize: '0.82rem' }}>
              <span>约{nextChapter.hours}h</span>
              <span style={{ color: subject.accentColor, fontSize: '1.1rem' }}>→</span>
            </div>
          </Link>
        )}

        {/* Tabs */}
        <div className="resource-tabs">
          {(['chapters', 'overview'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`resource-tab ${tab === t ? 'active' : ''}`}
              style={tab === t ? { background: `${subject.color}18`, color: subject.accentColor } : {}}
            >
              {t === 'chapters' ? '📑 章节列表' : '📊 知识总览'}
            </button>
          ))}
        </div>

        {/* Chapters tab */}
        {tab === 'chapters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {subject.chapters.map(ch => {
              const isDone = ch.status === 'done';
              const isCurrent = ch.status === 'current';
              const isLocked = ch.status === 'locked';
              return (
                <div
                  key={ch.number}
                  style={{
                    background: isCurrent ? `${subject.color}0c` : 'rgba(13,21,38,0.5)',
                    border: `1px solid ${isCurrent ? `${subject.color}44` : isDone ? 'rgba(34,197,94,0.15)' : 'rgba(30,45,74,0.5)'}`,
                    borderRadius: '14px', padding: '1.1rem 1.25rem',
                    opacity: isLocked ? 0.55 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: isDone ? 'rgba(34,197,94,0.12)' : `${subject.color}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.85rem', fontWeight: 700,
                        color: isDone ? '#4ade80' : subject.accentColor,
                        flexShrink: 0,
                      }}>
                        {isDone ? '✓' : ch.number}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e8edf5', marginBottom: '0.15rem' }}>
                          Ch{ch.number} · {ch.title}
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.72rem', color: '#5a7394' }}>⏱ {ch.hours}h</span>
                          <span style={{ fontSize: '0.72rem', color: '#5a7394' }}>📌 {ch.prerequisites.join('、')}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {ch.concepts.slice(0, 2).map((c, i) => (
                        <span key={i} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '5px', background: 'rgba(30,45,74,0.4)', color: '#5a7394' }}>
                          {c.slice(0, 15)}
                        </span>
                      ))}
                      {!isLocked && (
                        <Link
                          to={`/subject/${subject.slug}/chapter/${ch.number}`}
                          style={{
                            padding: '0.35rem 0.85rem', borderRadius: '8px',
                            background: `${subject.color}22`, border: `1px solid ${subject.color}44`,
                            color: subject.accentColor, fontSize: '0.78rem', fontWeight: 600,
                            textDecoration: 'none', whiteSpace: 'nowrap',
                          }}
                        >
                          {isDone ? '📖 复习' : '▶ 学习'}
                        </Link>
                      )}
                      {isLocked && (
                        <span style={{ fontSize: '0.72rem', color: '#3a5070', padding: '0.35rem 0.6rem' }}>🔒 前置未完成</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Overview tab */}
        {tab === 'overview' && (
          <div>
            <div style={{ background: 'rgba(13,21,38,0.5)', border: '1px solid rgba(30,45,74,0.6)', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: `${subject.color}10` }}>
                    {['章', '标题', '难度', '学时', '前置'].map((h, i) => (
                      <th key={i} style={{ padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#8b9ab8', borderBottom: '1px solid rgba(30,45,74,0.5)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subject.chapters.map(ch => (
                    <tr key={ch.number} style={{ borderBottom: '1px solid rgba(30,45,74,0.3)' }}>
                      <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#5a7394' }}>Ch{ch.number}</td>
                      <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>{ch.title}</td>
                      <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                        <span style={{ padding: '0.15rem 0.5rem', borderRadius: '5px', background: ch.difficulty === 'easy' ? 'rgba(34,197,94,0.1)' : ch.difficulty === 'hard' ? 'rgba(239,68,68,0.1)' : 'rgba(251,146,60,0.1)', color: ch.difficulty === 'easy' ? '#4ade80' : ch.difficulty === 'hard' ? '#f87171' : '#fb923c', fontSize: '0.72rem' }}>
                          {ch.difficulty === 'easy' ? '⭐' : ch.difficulty === 'hard' ? '⭐⭐⭐' : '⭐⭐'}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#5a7394' }}>{ch.hours}h</td>
                      <td style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', color: '#5a7394' }}>{ch.prerequisites[0] || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Resource links */}
        <div style={{ marginTop: '2rem' }}>
          <div className="section-header" style={{ marginBottom: '1rem' }}>
            <span className="section-title">📚 学习资源</span>
            <div className="section-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {[
              { label: '📚 教材书单', to: 'books' },
              { label: '🌐 教程网站', to: 'websites' },
              { label: '🎬 视频课程', to: 'videos' },
              { label: '🗺️ 学习路径', to: 'roadmap' },
            ].map(link => (
              <Link
                key={link.to}
                to={`/subject/${subject.slug}/resources/${link.to}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.85rem 1rem', borderRadius: '12px',
                  background: 'rgba(13,21,38,0.5)', border: '1px solid rgba(30,45,74,0.6)',
                  textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
                  color: '#8b9ab8', transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
