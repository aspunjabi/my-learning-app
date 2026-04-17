import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, SkipForward, Plus, X, ExternalLink } from 'lucide-react';

const COLORS = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-purple-500 to-indigo-500',
  'from-lime-500 to-green-500',
  'from-fuchsia-500 to-pink-500',
  'from-sky-500 to-blue-500',
];

//const ICONS = {
 // anthropic: '🧠',
  //substack: '✉️',
  //facebook: '👤',
  //arxiv: '📄',
  //linkedin: '💼',
  //blog: '📝',
  //github: '🐙',
  //generic: '🔗',
//};

// Extract nuggets from content using simple heuristics
//const extractNuggets = (content, title, url) => {
  // Split by common separators
  //const paragraphs = content
    //.split(/\n\n+/)
    //.filter(p => p.trim().length > 100)
    //.slice(0, 15); // Max 15 nuggets

  //return paragraphs.map((para, idx) => ({
    //id: `${Date.now()}-${idx}`,
    //title: para.split('\n')[0].substring(0, 60) + '...',
    //content: para.substring(0, 200) + '...',
    //fullContent: para,
    //sourceUrl: url,
    //sourceTitle: title,
  //}));
//};

export default function LearningApp() {
  const [sources, setSources] = useState([]);
  const [currentSourceIdx, setCurrentSourceIdx] = useState(0);
  const [currentNuggetIdx, setCurrentNuggetIdx] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedNuggetId, setExpandedNuggetId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('learningQueue');
    if (saved) {
      setSources(JSON.parse(saved));
    } else {
      // Seed with real curated content
      const seeds = [
        {
          id: 1,
          title: 'Claude Opus 4.7 Release',
          url: 'https://www.anthropic.com/news/claude-opus-4-7',
          color: COLORS[0],
          nuggets: [
            {
              id: '1-1',
              title: 'Advanced Software Engineering Improvements',
              content: 'Opus 4.7 shows notable improvement in advanced software engineering with particular gains on the most difficult tasks. Users can hand off hardest coding work with confidence.',
              fullContent: 'Opus 4.7 handles complex, long-running tasks with rigor and consistency, pays precise attention to instructions, and devises ways to verify its own outputs before reporting back.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
              sourceTitle: 'Claude Opus 4.7 Release',
            },
            {
              id: '1-2',
              title: 'Better Vision Capabilities',
              content: 'The model has substantially better vision and can see images in greater resolution. It\'s more tasteful and creative when completing professional tasks.',
              fullContent: 'Higher resolution support enables use cases that depend on fine visual detail: computer-use agents reading dense screenshots, data extractions from complex diagrams.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
              sourceTitle: 'Claude Opus 4.7 Release',
            },
            {
              id: '1-3',
              title: 'Instruction Following Improvements',
              content: 'Opus 4.7 is substantially better at following instructions. Previous models interpreted instructions loosely or skipped parts; Opus 4.7 takes them literally.',
              fullContent: 'Users should re-tune their prompts and harnesses for Opus 4.7, as it may produce unexpected results compared to earlier models when using the same prompts.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
              sourceTitle: 'Claude Opus 4.7 Release',
            },
            {
              id: '1-4',
              title: 'Cyber Capabilities & Safety',
              content: 'Opus 4.7 cyber capabilities are less advanced than Mythos Preview. Released with safeguards that automatically detect and block high-risk cybersecurity uses.',
              fullContent: 'Security professionals can join the Cyber Verification Program for legitimate cybersecurity purposes like vulnerability research and penetration testing.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
              sourceTitle: 'Claude Opus 4.7 Release',
            },
            {
              id: '1-5',
              title: 'Tokenizer & Token Usage Changes',
              content: 'Opus 4.7 uses an updated tokenizer improving text processing. Same input can map to more tokens (roughly 1.0–1.35× depending on content type).',
              fullContent: 'Opus 4.7 thinks more at higher effort levels, producing more output tokens. Users can control via effort parameter, task budgets, or prompting for conciseness.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
              sourceTitle: 'Claude Opus 4.7 Release',
            },
          ],
        },
        {
          id: 2,
          title: 'ComputeRAM & Data Movement',
          url: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
          color: COLORS[1],
          nuggets: [
            {
              id: '2-1',
              title: 'Data Movement is the Meta-Problem',
              content: 'The real bottleneck isn\'t compute or memory—it\'s the cost of shuttling bits between them. DeepSeek, Apple unified memory, custom silicon: all symptoms of this constraint.',
              fullContent: 'GPU arithmetic units spend most of their time idle, stalled while waiting for weights to be fetched from HBM. This "memory wall" is the core inefficiency.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
              sourceTitle: 'ComputeRAM & The Future',
            },
            {
              id: '2-2',
              title: 'In-Memory vs Near-Memory Compute',
              content: 'True in-memory compute has memory cells do math directly (hard to manufacture). Near-memory compute puts logic right next to memory arrays (more practical).',
              fullContent: 'Synthara\'s approach: digital compute logic tightly coupled to standard memory with software stack ensuring compatibility. Gets 100x efficiency gains for edge without exotic physics.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
              sourceTitle: 'ComputeRAM & The Future',
            },
            {
              id: '2-3',
              title: 'Groq & Cerebras Strategic Plays',
              content: 'Groq: 230MB on-die SRAM with 80 TB/s bandwidth (~1 OOM better than HBM). Cerebras: 44GB SRAM on single wafer with 21 PB/s bandwidth—both addressing memory wall.',
              fullContent: 'Cerebras WSE-3: 7,000x bandwidth vs single GPU\'s HBM stack. OpenAI deployed 750MW of Cerebras capacity—clear signal of market demand.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
              sourceTitle: 'ComputeRAM & The Future',
            },
            {
              id: '2-4',
              title: 'IP Model vs Custom Silicon Viability',
              content: 'Custom silicon companies (Cerebras, Groq, Tenstorrent) have <1% market share after a decade. IP licensing (like Arm) may be the only viable path for new entrants.',
              fullContent: 'Arm proved you can define an entire computing era without fabricating a single chip. For a 20-person team, custom silicon is impossible; IP licensing scales.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
              sourceTitle: 'ComputeRAM & The Future',
            },
            {
              id: '2-5',
              title: 'DeepSeek & Mixture of Experts Efficiency',
              content: 'DeepSeek\'s cost breakthrough: fetch weights once, reuse 1000x (cost ~1,100 units). Traditional: fetch same weights 1000 times (cost ~100K units).',
              fullContent: 'Software innovation + data movement optimization can reduce compute cost 100x. Algorithm & architecture matter more than raw hardware scaling.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
              sourceTitle: 'ComputeRAM & The Future',
            },
        ],
        },
      ];
      setSources(seeds);
      localStorage.setItem('learningQueue', JSON.stringify(seeds));
    }
  }, []);

  // Save to localStorage whenever sources change
  useEffect(() => {
    localStorage.setItem('learningQueue', JSON.stringify(sources));
  }, [sources]);

  const addSource = async () => {
    if (!newUrl.trim() || !newTitle.trim()) return;

    setLoading(true);
    try {
      // Determine type from URL
      let type = 'generic';
      if (newUrl.includes('anthropic')) type = 'anthropic';
      else if (newUrl.includes('substack')) type = 'substack';
      else if (newUrl.includes('facebook') || newUrl.includes('engineering.fb')) type = 'facebook';
      else if (newUrl.includes('arxiv')) type = 'arxiv';
      else if (newUrl.includes('linkedin')) type = 'linkedin';
      else if (newUrl.includes('github')) type = 'github';

      // For now, create placeholder nuggets
      // In production, would call Anthropic API to extract from URL
      const defaultNuggets = [
        {
          id: `${Date.now()}-0`,
          title: 'Key Insight',
          content: 'Click "View Full" to explore this content...',
          fullContent: 'This content is being processed. Click the source link to view the full article.',
          sourceUrl: newUrl,
          sourceTitle: newTitle,
        },
      ];

      const newSource = {
        id: Date.now(),
        title: newTitle,
        url: newUrl,
        type,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        nuggets: defaultNuggets,
        status: 'queued',
      };

      setSources([...sources, newSource]);
      setNewUrl('');
      setNewTitle('');
      setShowAddModal(false);
    } finally {
      setLoading(false);
    }
  };

  const moveToNextNugget = () => {
    const currentSource = sources[currentSourceIdx];
    if (currentNuggetIdx < currentSource.nuggets.length - 1) {
      setCurrentNuggetIdx(currentNuggetIdx + 1);
    } else if (currentSourceIdx < sources.length - 1) {
      setCurrentSourceIdx(currentSourceIdx + 1);
      setCurrentNuggetIdx(0);
    }
  };

  const markSourceDone = (sourceId) => {
    const filtered = sources.filter(s => s.id !== sourceId);
    setSources(filtered);
    if (currentSourceIdx >= filtered.length && filtered.length > 0) {
      setCurrentSourceIdx(Math.max(0, filtered.length - 1));
    }
    setCurrentNuggetIdx(0);
  };

  const skipSource = (sourceId) => {
    const filtered = sources.filter(s => s.id !== sourceId);
    setSources(filtered);
    if (currentSourceIdx >= filtered.length && filtered.length > 0) {
      setCurrentSourceIdx(Math.max(0, filtered.length - 1));
    }
    setCurrentNuggetIdx(0);
  };

  if (sources.length === 0) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          .font-mono { font-family: 'Space Mono', monospace; }
        `}</style>
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-white mb-2">Your queue is empty</h1>
          <p className="text-slate-400 mb-8">Add learning sources to explore</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Add Source
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 rounded-xl p-6 max-w-md w-full border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add Source</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-3 focus:outline-none focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-4 focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={addSource}
                disabled={loading}
                className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Add'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentSource = sources[currentSourceIdx];
  const currentNugget = currentSource?.nuggets?.[currentNuggetIdx];
  const remainingSources = sources.length - currentSourceIdx - 1;
  const remainingNuggets = currentSource?.nuggets?.length - currentNuggetIdx - 1;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        
        .carousel-container {
          animation: slideIn 0.4s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div className="relative z-10 px-4 py-3 bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm border-b border-slate-800/50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="text-lg font-bold text-white">{currentSource?.title}</h1>
            <p className="text-xs text-slate-400">
              Source {currentSourceIdx + 1} of {sources.length} • Insight {currentNuggetIdx + 1} of {currentSource?.nuggets?.length}
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90 transition"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {currentNugget && (
          <div className="carousel-container w-full max-w-2xl">
            {/* Nugget Card */}
            <div
              className={`rounded-2xl bg-gradient-to-br ${currentSource.color} p-8 mb-6 min-h-[400px] flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>

              <div className="relative z-10">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                    {currentNugget.title}
                  </h2>
                  <p className="text-lg text-white/80">
                    {currentNugget.content}
                  </p>
                </div>

                {/* Expanded section */}
                {expandedNuggetId === currentNugget.id && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-white/70 leading-relaxed">
                      {currentNugget.fullContent}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="relative z-10 mt-8 flex gap-3">
                <button
                  onClick={() =>
                    setExpandedNuggetId(
                      expandedNuggetId === currentNugget.id ? null : currentNugget.id
                    )
                  }
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition"
                >
                  {expandedNuggetId === currentNugget.id ? 'Hide' : 'Read More'}
                </button>
                <a
                  href={currentNugget.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition inline-flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Source
                </a>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() =>
                  currentNuggetIdx > 0 && setCurrentNuggetIdx(currentNuggetIdx - 1)
                }
                disabled={currentNuggetIdx === 0}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white disabled:opacity-30 transition"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex-1 flex gap-2">
                {currentSource.nuggets.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition ${
                      idx === currentNuggetIdx
                        ? 'bg-white'
                        : idx < currentNuggetIdx
                        ? 'bg-slate-600'
                        : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>

              <button
                onClick={moveToNextNugget}
                disabled={
                  currentNuggetIdx === currentSource.nuggets.length - 1 &&
                  currentSourceIdx === sources.length - 1
                }
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white disabled:opacity-30 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Source-level Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => markSourceDone(currentSource.id)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Finish Source
              </button>
              <button
                onClick={() => skipSource(currentSource.id)}
                className="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
              >
                <SkipForward size={18} />
                Skip
              </button>
            </div>

            {/* Progress */}
            <div className="text-center text-sm text-slate-400">
              {remainingSources > 0
                ? `${remainingSources} more source${remainingSources !== 1 ? 's' : ''} after this`
                : remainingNuggets > 0
                ? `${remainingNuggets} more insight${remainingNuggets !== 1 ? 's' : ''} in this source`
                : 'Last insight'}
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add Learning Source</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Source Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSource()}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 mb-3 focus:outline-none focus:border-pink-500 transition"
              autoFocus
            />
            <input
              type="text"
              placeholder="Source URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSource()}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 mb-4 focus:outline-none focus:border-pink-500 transition"
            />
            <button
              onClick={addSource}
              disabled={!newUrl.trim() || !newTitle.trim() || loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Add Source'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 
