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

export default function LearningApp() {
  const [sources, setSources] = useState([]);
  const [currentSourceIdx, setCurrentSourceIdx] = useState(0);
  const [currentNuggetIdx, setCurrentNuggetIdx] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedNuggetId, setExpandedNuggetId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('learningQueue');
    if (saved) {
      setSources(JSON.parse(saved));
    } else {
      const seeds = [
        {
          id: 1,
          title: 'Claude Opus 4.7 Release',
          url: 'https://www.anthropic.com/news/claude-opus-4-7',
          color: COLORS[0],
          nuggets: [
            {
              id: '1-1',
              title: 'Advanced Software Engineering',
              content: 'Opus 4.7 shows notable improvement in advanced software engineering with particular gains on the most difficult tasks.',
              fullContent: 'Users can hand off their hardest coding work with confidence. Opus 4.7 handles complex, long-running tasks with rigor and consistency, pays precise attention to instructions, and devises ways to verify its own outputs before reporting back.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
            },
            {
              id: '1-2',
              title: 'Better Vision Capabilities',
              content: 'The model has substantially better vision and can see images in greater resolution.',
              fullContent: 'Higher resolution support enables use cases that depend on fine visual detail: computer-use agents reading dense screenshots, data extractions from complex diagrams, and work that needs pixel-perfect references.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
            },
            {
              id: '1-3',
              title: 'Instruction Following',
              content: 'Opus 4.7 is substantially better at following instructions. Previous models interpreted loosely; Opus 4.7 takes them literally.',
              fullContent: 'Users should re-tune their prompts for Opus 4.7, as it may produce unexpected results compared to earlier models when using the same prompts. Where previous models skipped parts entirely, Opus 4.7 executes precisely.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
            },
            {
              id: '1-4',
              title: 'Cyber Capabilities & Safety',
              content: 'Opus 4.7 cyber capabilities are less advanced than Mythos Preview, with automatic safeguards for high-risk cybersecurity uses.',
              fullContent: 'Security professionals can join the Cyber Verification Program for legitimate cybersecurity purposes like vulnerability research and penetration testing.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
            },
            {
              id: '1-5',
              title: 'Token Usage Changes',
              content: 'Updated tokenizer means same input can map to 1.0–1.35× more tokens depending on content type.',
              fullContent: 'Opus 4.7 thinks more at higher effort levels, producing more output tokens. Users can control via effort parameter, task budgets, or prompting for conciseness.',
              sourceUrl: 'https://www.anthropic.com/news/claude-opus-4-7',
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
              content: 'The real bottleneck is not compute or memory — it is the cost of shuttling bits between them.',
              fullContent: 'DeepSeek, Apple unified memory, the custom silicon explosion: all symptoms of the same constraint. GPU arithmetic units spend most of their time idle, stalled while waiting for weights to be fetched from HBM. This memory wall is the core inefficiency.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
            },
            {
              id: '2-2',
              title: 'In-Memory vs Near-Memory Compute',
              content: 'True in-memory compute has memory cells do math directly. Near-memory compute puts logic right next to memory arrays.',
              fullContent: 'Synthara sits in near-memory territory. Their Compute RAM tightly couples digital compute logic to standard memory arrays and provides the software stack that keeps existing toolchains intact. Efficiency gains come from drastically shortening data paths rather than exploiting exotic physics.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
            },
            {
              id: '2-3',
              title: 'Groq & Cerebras Strategic Plays',
              content: 'Groq: 230MB on-die SRAM with 80 TB/s bandwidth. Cerebras: 44GB SRAM on single wafer. Both attacking the memory wall.',
              fullContent: 'Cerebras WSE-3 delivers 7,000x bandwidth vs a single GPU HBM stack. OpenAI deployed 750MW of Cerebras capacity. Etched closed $500M to build a chip that only runs transformers — hard-wiring matrix multiplication patterns to dramatically reduce memory traffic per token.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
            },
            {
              id: '2-4',
              title: 'IP Model vs Custom Silicon',
              content: 'Custom silicon companies have less than 1% market share after a decade. IP licensing may be the only viable path.',
              fullContent: 'Arm proved you can define an entire computing era without fabricating a single chip. For a 20-person team in Zurich, custom silicon was never an option. The IP licensing model that everyone dismisses as capping upside might actually be the only path for new entrants.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
            },
            {
              id: '2-5',
              title: 'DeepSeek & Weight Reuse',
              content: 'Fetch weights once, reuse 1000x = cost of 1,100 units. Fetch 1000 times = cost of 100,000 units.',
              fullContent: 'DeepSeek\'s mixture of experts approach ensures that when you fetch something, you use it as many times as possible before discarding it. Software and algorithmic improvements drive efficiency more than hardware changes — and are far cheaper to iterate on.',
              sourceUrl: 'https://stateofthefuture.substack.com/p/ai-chips-computeram-and-the-future',
            },
          ],
        },
      ];
      setSources(seeds);
      localStorage.setItem('learningQueue', JSON.stringify(seeds));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learningQueue', JSON.stringify(sources));
  }, [sources]);

  const addSource = async () => {
    if (!newUrl.trim() || !newTitle.trim()) return;
    setLoading(true);
    try {
      const newSource = {
        id: Date.now(),
        title: newTitle,
        url: newUrl,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        nuggets: [
          {
            id: `${Date.now()}-0`,
            title: 'Source added',
            content: 'Open the source link to read the full content.',
            fullContent: 'Backend extraction coming soon. For now, visit the source directly.',
            sourceUrl: newUrl,
          },
        ],
        status: 'queued',
      };
      setSources(prev => [...prev, newSource]);
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
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-white mb-2">Queue is empty</h1>
          <p className="text-slate-400 mb-8">Add learning sources to explore</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Add Source
          </button>
        </div>
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
        .carousel-container { animation: slideIn 0.4s ease-out; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
            <div className={`rounded-2xl bg-gradient-to-br ${currentSource.color} p-8 mb-6 min-h-96 flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                  {currentNugget.title}
                </h2>
                <p className="text-lg text-white/80">
                  {currentNugget.content}
                </p>
                {expandedNuggetId === currentNugget.id && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-white/70 leading-relaxed">
                      {currentNugget.fullContent}
                    </p>
                  </div>
                )}
              </div>
              <div className="relative z-10 mt-8 flex gap-3">
                <button
                  onClick={() => setExpandedNuggetId(expandedNuggetId === currentNugget.id ? null : currentNugget.id)}
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
                onClick={() => currentNuggetIdx > 0 && setCurrentNuggetIdx(currentNuggetIdx - 1)}
                disabled={currentNuggetIdx === 0}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white disabled:opacity-30 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex-1 flex gap-2">
                {currentSource.nuggets.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition ${idx === currentNuggetIdx ? 'bg-white' : idx < currentNuggetIdx ? 'bg-slate-600' : 'bg-slate-700'}`}
                  ></div>
                ))}
              </div>
              <button
                onClick={moveToNextNugget}
                disabled={currentNuggetIdx === currentSource.nuggets.length - 1 && currentSourceIdx === sources.length - 1}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white disabled:opacity-30 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Source Actions */}
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
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Source Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 mb-3 focus:outline-none focus:border-pink-500 transition"
              autoFocus
            />
            <input
              type="text"
              placeholder="Source URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 mb-4 focus:outline-none focus:border-pink-500 transition"
            />
            <button
              onClick={addSource}
              disabled={!newUrl.trim() || !newTitle.trim() || loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Source'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
