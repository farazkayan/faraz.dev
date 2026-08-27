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

const TerminalOverlay = ({ onClose, setIsCat }: { onClose: () => void, setIsCat: (v: boolean) => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output', content: string | ReactNode }[]>([
    { type: 'output', content: 'Portfolio OS v1.0.0' },
    { type: 'output', content: 'Type "help" for a list of commands.' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Vault state
  const [ideas, setIdeas] = useState<any[]>([]);
  const [ideaIndex, setIdeaIndex] = useState(0);
  
  // Idea submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [draftIdea, setDraftIdea] = useState({ idea: '', description: '', platform: '', optional_name: '' });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await fetch('/api/ideas/approved');
      if (res.ok) {
        const data = await res.json();
        setIdeas(data);
        return data;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  const likeIdea = async (id: string) => {
    try {
      await fetch(`/api/ideas/${id}/might_build`, { method: 'POST' });
      // In a real terminal, we might want to show a message, but let's keep it simple.
    } catch (e) {}
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (isSubmitting) {
      handleSubmissionStep(trimmed);
      return;
    }

    const newHistory = [...history, { type: 'input', content: `faraz@portfolio ~ $ ${trimmed}` }];
    
    switch (trimmed.toLowerCase()) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: (
            <div className="flex flex-col gap-1 text-sm text-[#C4C4CA]">
              <p className="mb-2 text-[#94949F]">commands:</p>
              <div className="grid grid-cols-[80px_1fr] gap-4">
                <span className="text-white">ideas</span><span>browse things people wish existed</span>
                <span className="text-white">random</span><span>give me something unexpected</span>
                <span className="text-white">submit</span><span>leave an idea</span>
                <span className="text-white">about</span><span>why this exists</span>
                <span className="text-white">clear</span><span>clear the terminal</span>
                <span className="text-white">exit</span><span>close</span>
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

      case 'ideas':
        newHistory.push({ type: 'output', content: 'fetching ideas...' });
        setHistory(newHistory);
        const data = await fetchIdeas();
        if (data.length > 0) {
          const idea = data[0];
          setHistory(prev => [...prev.slice(0, -1), {
            type: 'output',
            content: renderIdea(idea)
          }]);
        } else {
          setHistory(prev => [...prev.slice(0, -1), { type: 'output', content: 'the vault is currently empty.' }]);
        }
        return;

      case 'random':
        newHistory.push({ type: 'output', content: 'searching the vault...' });
        setHistory(newHistory);
        const randData = ideas.length > 0 ? ideas : await fetchIdeas();
        if (randData.length > 0) {
          const randIdea = randData[Math.floor(Math.random() * randData.length)];
          setHistory(prev => [...prev, {
            type: 'output',
            content: renderIdea(randIdea)
          }]);
        } else {
          setHistory(prev => [...prev, { type: 'output', content: 'the vault is empty.' }]);
        }
        return;

      case 'submit':
        setIsSubmitting(true);
        setSubmitStep(1);
        newHistory.push({ type: 'output', content: 'What do you wish existed?' });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        return;
        
      case 'neofetch':
        newHistory.push({
          type: 'output',
          content: (
            <div className="flex gap-4 text-[#C4C4CA] font-mono text-sm">
              <div className="text-[#A855F7]">
                <pre>{`   /\\_/\\   
  ( o.o )  
   > ^ <   `}</pre>
              </div>
              <div className="flex flex-col justify-center">
                <p><span className="text-[#A855F7]">OS:</span> Portfolio OS v1.0</p>
                <p><span className="text-[#A855F7]">Host:</span> Faraz Kayan</p>
                <p><span className="text-[#A855F7]">Uptime:</span> probably too long</p>
                <p><span className="text-[#A855F7]">Shell:</span> bash</p>
              </div>
            </div>
          )
        });
        break;

      case 'sudo':
        newHistory.push({ type: 'output', content: 'permission denied.\n\nnice try.' });
        break;
      
      case 'sudo pet companion':
      case 'pet companion':
      case 'pet':
        setIsCat(true);
        newHistory.push({ type: 'output', content: 'purr...' });
        break;

      case 'whoami':
        newHistory.push({ type: 'output', content: 'someone who probably has\ntoo many projects open right now.' });
        break;
        
      case 'coffee':
      case 'brew':
        newHistory.push({ type: 'output', content: "Error 418: I'm a teapot." });
        break;
        
      case 'cat':
        newHistory.push({ type: 'output', content: 'meow.' });
        break;

      default:
        newHistory.push({ type: 'output', content: `command not found: ${trimmed}` });
    }

    setHistory(newHistory);
  };

  const handleSubmissionStep = async (val: string) => {
    const newHistory = [...history, { type: 'input', content: `> ${val}` }];
    
    if (submitStep === 1) {
      setDraftIdea({ ...draftIdea, idea: val });
      newHistory.push({ type: 'output', content: 'Why would you want it?' });
      setSubmitStep(2);
    } else if (submitStep === 2) {
      setDraftIdea({ ...draftIdea, description: val });
      newHistory.push({ type: 'output', content: 'What would it be? [web] [mobile] [desktop] [other]' });
      setSubmitStep(3);
    } else if (submitStep === 3) {
      setDraftIdea({ ...draftIdea, platform: val });
      newHistory.push({ type: 'output', content: 'Want to leave a name?' });
      setSubmitStep(4);
    } else if (submitStep === 4) {
      const finalIdea = { ...draftIdea, optional_name: val || 'anonymous' };
      setDraftIdea(finalIdea);
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
        const saved = await res.json();
        setHistory(prev => [...prev, {
          type: 'output',
          content: (
            <div className="text-[#10B981] mt-2">
              ✓ idea received<br/><br/>
              <span className="text-white">{saved.id}</span><br/><br/>
              added to the vault.<br/><br/>
              Maybe Faraz will build it someday.
            </div>
          )
        }]);
      } catch (e) {
        setHistory(prev => [...prev, { type: 'output', content: 'failed to save idea. something broke.' }]);
      }
      return;
    }
    
    setHistory(newHistory);
  };

  const renderIdea = (idea: any) => (
    <div className="border border-white/10 bg-[#161618] p-4 rounded-lg my-2 max-w-lg space-y-4">
      <div className="flex justify-between items-center text-xs text-[#94949F] font-mono">
        <span>{idea.id}</span>
        <span>{idea.platform}</span>
      </div>
      <p className="text-[#E4E4E5] font-medium text-lg leading-snug">"{idea.idea}"</p>
      {idea.description && <p className="text-sm text-[#94949F]">{idea.description}</p>}
      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        <span className="text-xs text-[#71717A]">by {idea.optional_name}</span>
        <button 
          onClick={() => {
            likeIdea(idea.id);
            const el = document.getElementById(`like-${idea.id}`);
            if (el) el.innerText = `${(idea.might_build_count || 0) + 1} people might build this`;
          }}
          className="text-xs text-[#A855F7] hover:text-[#D8B4FE] transition-colors"
        >
          I might build this
        </button>
      </div>
      <div id={`like-${idea.id}`} className="text-xs text-[#71717A] text-right mt-1">
        {idea.might_build_count || 0} people might build this
      </div>
    </div>
  );

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
          <span className="text-[#10B981]">{isSubmitting ? '>' : 'faraz@portfolio ~ $'}</span>
          <input
            ref={inputRef}
            type="text"
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
