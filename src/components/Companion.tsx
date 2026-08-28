import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';


export const Companion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCat, setIsCat] = useState(false);
  
  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-[#A855F7] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="w-10 h-10 rounded-full bg-[#1C1C20] border border-white/10 flex items-center justify-center relative z-10 shadow-xl">
            {isCat ? (
              <span className="text-lg">🐱</span>
            ) : (
              <div className="w-3 h-3 rounded-full bg-[#A855F7] animate-pulse" />
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <TerminalOverlay 
            onClose={() => setIsOpen(false)} 
            setIsCat={setIsCat} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

const MatrixEffect = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count > 15) {
        clearInterval(interval);
        return;
      }
      const randomLine = Array.from({ length: 40 })
        .map(() => String.fromCharCode(33 + Math.floor(Math.random() * 94)))
        .join('');
      setLines(prev => [...prev.slice(-4), randomLine]);
      count++;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[#10B981] leading-tight opacity-75 mt-1">
      {lines.map((l, i) => <div key={i}>{l}</div>)}
      {lines.length >= 15 && <div className="text-white mt-1">Wake up, Neo...</div>}
    </div>
  );
};

const HackEffect = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const bars = Math.floor(progress / 5);
  const barStr = '█'.repeat(bars) + ' '.repeat(20 - bars);
  return (
    <div className="font-mono text-[#10B981] mt-1">
      <div>Initializing...</div>
      <div>[{barStr}] {progress}%</div>
      {progress === 100 && (
        <>
          <div className="mt-2 text-white font-bold">ACCESS GRANTED</div>
          <div className="mt-2 text-[#94949F]">...</div>
          <div className="mt-2 text-[#94949F]">just kidding.</div>
        </>
      )}
    </div>
  );
};

export const TerminalOverlay = ({ onClose, setIsCat }: { onClose: () => void, setIsCat: (v: boolean) => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output', content: string | ReactNode }[]>([
    { type: 'output', content: 'Portfolio OS v1.0\nType "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [ideaData, setIdeaData] = useState<{ idea?: string, description?: string, platform?: string, name?: string }>({});

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isSubmitting]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isAdminLogin, isSubmitting]);

  const fetchAdminIdeas = async (currentHistory: any[]) => {
    try {
      const res = await fetch('/api/admin/ideas', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.length === 0) {
          setHistory([...currentHistory, { type: 'output', content: 'no ideas in the vault.' }]);
        } else {
          const list = data.map((idea: any) => (
            <div key={idea.id} className="mb-4 border-l-2 border-[#A855F7] pl-3 py-1">
              <div className="text-[#A855F7] text-xs mb-1 flex justify-between pr-4">
                <span>{idea.id} - {idea.status}</span>
                <span>{new Date(idea.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-white text-sm whitespace-pre-wrap">"{idea.idea}"</p>
              <div className="text-[#94949F] text-xs mt-1">
                by: {idea.optional_name} | platform: {idea.platform} | votes: {idea.might_build_count || 0}
              </div>
            </div>
          ));
          setHistory([...currentHistory, {
            type: 'output',
            content: <div className="mt-2">{list}</div>
          }]);
        }
      } else {
        setHistory([...currentHistory, { type: 'output', content: 'failed to fetch ideas. session may have expired.' }]);
        setIsAdminAuthenticated(false);
      }
    } catch (e) {
      setHistory([...currentHistory, { type: 'output', content: 'error connecting to admin vault.' }]);
    }
  };

  const handleAdminLogin = async (val: string) => {
    const newHistory = [...history, { type: 'input', content: '*'.repeat(val.length) }];
    setIsAdminLogin(false);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: val }),
        credentials: 'include'
      });
      if (res.ok) {
        newHistory.push({ type: 'output', content: 'authentication successful. fetching ideas...' });
        setHistory(newHistory);
        setIsAdminAuthenticated(true);
        await fetchAdminIdeas(newHistory);
      } else {
        newHistory.push({ type: 'output', content: 'access denied.' });
        setHistory(newHistory);
      }
    } catch (e) {
      newHistory.push({ type: 'output', content: 'connection error.' });
      setHistory(newHistory);
    }
  };

  const handleSubmissionStep = async (val: string) => {
    const newHistory = [...history, { type: 'input', content: `> ${val}` }];
    if (submitStep === 1) {
      setIdeaData({ ...ideaData, idea: val });
      setSubmitStep(2);
      newHistory.push({ type: 'output', content: 'Why would you want it?' });
      setHistory(newHistory);
      return;
    }
    if (submitStep === 2) {
      setIdeaData({ ...ideaData, description: val });
      setSubmitStep(3);
      newHistory.push({ type: 'output', content: 'What would it be? [web] [mobile] [desktop] [other]' });
      setHistory(newHistory);
      return;
    }
    if (submitStep === 3) {
      setIdeaData({ ...ideaData, platform: val });
      setSubmitStep(4);
      newHistory.push({ type: 'output', content: 'Want to leave a name?' });
      setHistory(newHistory);
      return;
    }
    if (submitStep === 4) {
      const finalIdea = { ...ideaData, optional_name: val };
      setIsSubmitting(false);
      setSubmitStep(0);
      newHistory.push({ type: 'output', content: 'saving to vault...' });
      setHistory(newHistory);
      try {
        const res = await fetch('/api/ideas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalIdea)
        });
        if (!res.ok) throw new Error('Failed to save');
        setHistory(prev => [...prev, {
          type: 'output',
          content: (
            <div className="text-[#10B981] mt-2">
              ✓ idea received.<br/><br/>I'll add it to the pile of things I might build someday.
            </div>
          )
        }]);
      } catch (e) {
        setHistory(prev => [...prev, { type: 'output', content: 'failed to save idea. database might not be configured.' }]);
      }
      return;
    }
    setHistory(newHistory);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    if (isAdminLogin) {
      handleAdminLogin(trimmed);
      return;
    }
    if (isSubmitting) {
      handleSubmissionStep(trimmed);
      return;
    }

    const newHistory = [...history, { type: 'input', content: `faraz@portfolio ~ $ ${trimmed}` }];
    const args = trimmed.split(' ');
    const baseCmd = args[0].toLowerCase();
    
    switch (baseCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="flex flex-col gap-1 text-sm text-[#C4C4CA]">
              <p className="mb-2 text-[#94949F]">AVAILABLE COMMANDS</p>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-1">
                <span className="text-[#10B981] font-bold">★ submit</span><span className="text-[#10B981]">Got an idea for something I should build?</span>
                <span className="text-white">suki</span><span>Summon an orange cat</span>
                <span className="text-white">neofetch</span><span>System information</span>
                <span className="text-white">whoami</span><span>Who is this?</span>
                <span className="text-white">about</span><span>Why this terminal exists</span>
                <span className="text-white">clear</span><span>Clear the terminal</span>
              </div>
              <div className="mt-2 text-[#94949F] text-xs">
                Type <span className="text-white">exit</span> or click × to close.
              </div>
            </div>
          )
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'whoami':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-1 mt-1">
              <p className="text-white font-medium">Faraz Kayan Haque</p>
              <br/>
              <p>student</p>
              <p>builder</p>
              <p>self-hosting enthusiast</p>
              <p>professional "wait, I could build that" guy</p>
            </div>
          )
        });
        break;

      case 'neofetch':
        newHistory.push({
          type: 'output',
          content: (
            <div className="flex gap-4 text-[#C4C4CA] font-mono text-sm mt-1">
              <div className="text-[#10B981]">
                <pre>{`   /\\_/\\
  ( o.o )
   > ^ < `}</pre>
              </div>
              <div className="flex flex-col justify-center">
                <p><span className="text-[#10B981]">OS:</span> FarazOS</p>
                <p><span className="text-[#10B981]">Host:</span> faraz.is-a.dev</p>
                <p><span className="text-[#10B981]">Shell:</span> definitely-bash</p>
                <p><span className="text-[#10B981]">Terminal:</span> portfolio-terminal</p>
                <p><span className="text-[#10B981]">Uptime:</span> suspiciously long</p>
                <p><span className="text-[#10B981]">Status:</span> building</p>
              </div>
            </div>
          )
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          content: (
            <div className="space-y-2 text-[#C4C4CA]">
              <p>I build things I wish existed.</p>
              <p>But sometimes the best ideas are things other people wish existed.</p>
              <p>So the Idea Vault asks: <span className="text-white font-medium">What do you wish existed?</span></p>
            </div>
          )
        });
        break;

      case 'suki':
        const sukiMessages = [
          "He has no idea what you're doing.",
          "He demands food.",
          "He is judging your typing speed.",
          "He walks across the keyboard: asdfghjkl;",
          "He refuses to cooperate."
        ];
        newHistory.push({
          type: 'output',
          content: (
            <div className="text-[#eab308] mt-1">
              <pre>{` /\\_/\\
 ( o.o )
  > ^ <`}</pre>
              <br/>
              <p>Suki has entered the terminal.</p>
              <br/>
              <p>{sukiMessages[Math.floor(Math.random() * sukiMessages.length)]}</p>
            </div>
          )
        });
        break;

      case 'submit':
        setIsSubmitting(true);
        setSubmitStep(1);
        newHistory.push({ type: 'output', content: 'GOT AN IDEA?\n\nWhat should I build?' });
        break;

      case 'admin':
        if (isAdminAuthenticated) {
          newHistory.push({ type: 'output', content: 'fetching admin vault...' });
          setHistory(newHistory);
          await fetchAdminIdeas(newHistory);
        } else {
          setIsAdminLogin(true);
          newHistory.push({ type: 'output', content: 'password: ' });
          setHistory(newHistory);
        }
        return;

      case 'logout':
        if (isAdminAuthenticated) {
          await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
          setIsAdminAuthenticated(false);
          newHistory.push({ type: 'output', content: 'logged out.' });
        } else {
          newHistory.push({ type: 'output', content: `command not found: ${trimmed}` });
        }
        break;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push({ type: 'output', content: `command not found: ${trimmed}` });
    }
    
    setHistory(newHistory);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 w-auto sm:w-full sm:max-w-[400px] h-[500px] max-h-[80vh] bg-[#0A0A0B] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-mono text-sm"
    >
      <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-[#111113] shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#94949F]" />
          <span className="text-[#94949F] text-xs">faraz@portfolio ~</span>
        </div>
        <button onClick={onClose} className="text-[#94949F] hover:text-white transition-colors">
          ×
        </button>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-3"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className={`${item.type === 'input' ? 'text-white' : 'text-[#94949F]'} whitespace-pre-wrap`}>
            {item.content}
          </div>
        ))}
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
            setInput('');
          }}
          className="flex items-center gap-2 mt-2"
        >
          <span className="text-[#10B981]">{isAdminLogin ? '' : isSubmitting ? '>' : 'faraz@portfolio ~ $'}</span>
          <input
            ref={inputRef}
            type={isAdminLogin ? "password" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono shadow-none"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
};

export default TerminalOverlay;