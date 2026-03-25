import { Link } from 'react-router-dom';
import SUBJECTS from '../data/studyData';

export default function HomePage() {
  const subjects = SUBJECTS;
  const totalChapters = subjects.reduce((s, c) => s + c.totalChapters, 0);
  const totalHours = subjects.reduce((s, c) => s + parseInt(c.estimatedHours), 0);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">📚</div>
            <span>学习资料库</span>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link active">首页</Link>
            <Link to="/subject/四元数与空间变换" className="navbar-link">四元数</Link>
            <Link to="/subject/数值分析" className="navbar-link">数值分析</Link>
            <Link to="/subject/基础物理仿真" className="navbar-link">物理仿真</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero page-container">
        <div className="hero-badge">
          <span>🚀</span>
          <span>多学科并行学习系统</span>
        </div>
        <h1 className="hero-title">
          你的<span className="hero-gradient-text">学习之旅</span><br />从这里开始
        </h1>
        <p className="hero-sub">
          三门课程已完整规划，配套教材、视频、练习与知识清单。<br />
          随时继续，说"进入第X章"即可生成新教程。
        </p>

        {/* Stats */}
        <div className="stats-row">
          {[
            { icon: '📖', value: subjects.length, label: '在学课程' },
            { icon: '📑', value: totalChapters, label: '总章节数' },
            { icon: '⏱', value: `${totalHours}h`, label: '预估总学时' },
            { icon: '✅', value: 1, label: '已学章节' },
          ].map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div className="page-container" style={{ paddingBottom: '4rem' }}>
        <div className="section-header">
          <span className="section-title">📖 我的课程</span>
          <div className="section-line" />
        </div>

        {subjects.map((subject, idx) => {
          const completed = subject.chapters.filter(c => c.status === 'done').length;
          const progress = Math.round((completed / subject.totalChapters) * 100);
          const isActive = subject.status === 'learning';

          return (
            <div
              key={subject.slug}
              className="subject-card animate-fade-up"
              style={{ animationDelay: `${idx * 0.12}s`, opacity: 0 }}
            >
              {/* Colored glow bar */}
              <div style={{ height: '3px', background: `linear-gradient(90deg, ${subject.color}, ${subject.accentColor})` }} />

              {/* Main hero area */}
              <div className="subject-card-hero" style={{ '--glow-color': subject.color } as React.CSSProperties}>
                <div className="subject-icon-wrap">
                  <div
                    className="subject-emoji"
                    style={{ background: `${subject.color}1a`, border: `1px solid ${subject.color}33` }}
                  >
                    {subject.emoji}
                  </div>
                  <div className="subject-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span className="subject-name">{subject.name}</span>
                      <span className={`status-badge ${isActive ? 'status-learning' : 'status-ready'}`}>
                        {isActive ? '🔄 进行中' : '📋 待开始'}
                      </span>
                    </div>
                    <p className="subject-desc">{subject.description}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="subject-meta">
                  <div className="subject-meta-item">
                    <div className="subject-meta-value" style={{ color: subject.accentColor }}>{subject.totalChapters}</div>
                    <div className="subject-meta-label">章节</div>
                  </div>
                  <div className="subject-meta-item">
                    <div className="subject-meta-value" style={{ color: subject.accentColor }}>{subject.estimatedHours}</div>
                    <div className="subject-meta-label">学时</div>
                  </div>
                  <div className="subject-meta-item">
                    <div className="subject-meta-value" style={{ color: subject.accentColor }}>{completed}</div>
                    <div className="subject-meta-label">已完成</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="subject-progress">
                <div className="progress-header">
                  <span className="progress-label">学习进度</span>
                  <span className="progress-pct" style={{ color: subject.accentColor }}>
                    {completed}/{subject.totalChapters} 章 · {progress}%
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${subject.color}, ${subject.accentColor})` }}
                  />
                </div>
              </div>

              {/* Chapter chips */}
              <div className="chapter-grid">
                {subject.chapters.map(ch => {
                  const isDone = ch.status === 'done';
                  const isCurrent = ch.status === 'current';
                  const isLocked = ch.status === 'locked';
                  const shortTitle = ch.title.split('：')[0].replace(/第.章\s*/, '').slice(0, 8);
                  if (isLocked) {
                    return (
                      <span key={ch.number} className="chapter-chip chip-locked">
                        🔒 {ch.number}
                      </span>
                    );
                  }
                  return (
                    <Link
                      key={ch.number}
                      to={`/subject/${subject.slug}/chapter/${ch.number}`}
                      className={`chapter-chip ${isDone ? 'chip-done' : isCurrent ? 'chip-current' : 'chip-done'}`}
                      style={isCurrent ? { background: `${subject.color}18`, borderColor: `${subject.color}44`, color: '#e2e8f0', '--chip-color': subject.color } as React.CSSProperties : {}}
                    >
                      {isDone ? '✓' : '▶'} Ch{ch.number} {shortTitle}
                    </Link>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="action-row">
                <Link
                  to={`/subject/${subject.slug}`}
                  className="action-btn btn-primary"
                  style={{ '--btn-color': subject.color } as React.CSSProperties}
                >
                  📖 学科概览
                </Link>
                {completed > 0 ? (
                  <Link
                    to={`/subject/${subject.slug}/chapter/${Math.max(...subject.chapters.filter(c => c.status === 'done').map(c => c.number))}`}
                    className="action-btn btn-outline"
                  >
                    🔁 继续复习
                  </Link>
                ) : (
                  <Link
                    to={`/subject/${subject.slug}/chapter/${subject.currentChapter}`}
                    className="action-btn btn-primary"
                    style={{ background: `${subject.color}22`, borderColor: `${subject.color}44`, color: subject.accentColor }}
                  >
                    ▶ 开始学习
                  </Link>
                )}
                <Link to={`/subject/${subject.slug}/resources/books`} className="action-btn btn-outline">
                  📚 教材
                </Link>
                <Link to={`/subject/${subject.slug}/resources/videos`} className="action-btn btn-outline">
                  🎬 视频
                </Link>
                <Link to={`/subject/${subject.slug}/resources/roadmap`} className="action-btn btn-outline">
                  🗺️ 路径
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-inner">
          <p className="footer-text">📚 学习资料库 · 多学科并行学习系统 · OpenClaw AI 驱动</p>
        </div>
      </div>
    </div>
  );
}
