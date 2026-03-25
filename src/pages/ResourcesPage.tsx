import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SUBJECTS from '../data/studyData';

const RESOURCE_FILES: Record<string, string> = {
  books: '_resources/books.md',
  websites: '_resources/websites.md',
  videos: '_resources/videos.md',
  roadmap: '_resources/roadmap.md',
};

const RESOURCE_ICONS: Record<string, string> = {
  books: '📚',
  websites: '🌐',
  videos: '🎬',
  roadmap: '🗺️',
};

export default function ResourcesPage() {
  const { slug, type } = useParams<{ slug: string; type: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const subject = SUBJECTS.find(s => s.slug === slug);
  const resourceFile = type ? RESOURCE_FILES[type] : null;
  
  const basePath = slug === '四元数与空间变换'
    ? '/workspace/studies/四元数与空间变换/'
    : slug === '数值分析'
    ? '/workspace/studies/数值分析/'
    : '/workspace/studies/基础物理仿真/';

  useEffect(() => {
    if (!resourceFile) { setLoading(false); return; }
    setLoading(true);
    fetch(`file://${basePath}${resourceFile}`)
      .then(r => r.text())
      .then(text => { setContent(text); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug, type, resourceFile]);

  if (!subject || !type || !resourceFile) {
    return <div className="max-w-4xl mx-auto px-6 py-20 text-center"><h2 style={{color:'#f1f5f9'}}>未找到该资源</h2><Link to="/" style={{color:'#818cf8'}}>返回首页</Link></div>;
  }

  const tabs = [
    { key: 'books', label: '📚 教材' },
    { key: 'websites', label: '🌐 网站' },
    { key: 'videos', label: '🎬 视频' },
    { key: 'roadmap', label: '🗺️ 路径' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1.5rem',fontSize:'0.875rem'}}>
        <Link to="/" style={{color:'#94a3b8',textDecoration:'none'}}>首页</Link>
        <span style={{color:'#475569'}}>›</span>
        <Link to={`/subject/${subject.slug}`} style={{color:'#94a3b8',textDecoration:'none'}}>{subject.name}</Link>
        <span style={{color:'#475569'}}>›</span>
        <span style={{color:'#f1f5f9'}}>{RESOURCE_ICONS[type]} {type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>

      {/* Header */}
      <div className="rounded-2xl border p-6 mb-6" style={{borderColor:subject.color+'44',background:'linear-gradient(135deg,rgba(30,41,59,0.8),rgba(15,23,42,0.9))',borderWidth:'1.5px'}}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{RESOURCE_ICONS[type]}</span>
          <div>
            <h1 style={{fontSize:'1.5rem',fontWeight:'700',color:'#f1f5f9'}}>{subject.name} — {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <p style={{fontSize:'0.875rem',color:'#94a3b8',marginTop:'0.25rem'}}>优质学习资源整理</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:'0.25rem',padding:'0.25rem',borderRadius:'0.75rem',background:'rgba(30,41,59,0.6)',border:'1px solid var(--color-border)',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        {tabs.map(tab => (
          <Link key={tab.key} to={`/subject/${subject.slug}/resources/${tab.key}`}
            style={{flex:1,textAlign:'center',padding:'0.5rem',borderRadius:'0.5rem',fontSize:'0.8rem',fontWeight:'500',textDecoration:'none',minWidth:'fit-content',
              background: type === tab.key ? subject.color+'33' : 'transparent',
              color: type === tab.key ? subject.accentColor : '#64748b',
              border: type === tab.key ? `1px solid ${subject.color}44` : '1px solid transparent',
            }}>
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl border p-6 sm:p-8" style={{background:'rgba(20,27,40,0.6)',borderColor:'var(--color-border)'}}>
        {loading && <div style={{textAlign:'center',padding:'3rem',color:'#64748b'}}>加载中...</div>}
        {!loading && <div className="prose-quaternions"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content || '_暂无资源内容_'}</ReactMarkdown></div>}
      </div>
    </div>
  );
}
