import React, { useState, useEffect, useRef } from 'react';
import {
  ConsensusResult,
  ProgressState,
  DebateMode,
  DebateIntensity,
  UserApiKeys,
  ChatMessage,
} from './types';
import { Header } from './components/Header';
import { ChatMessageItem } from './components/ChatMessageItem';
import { ThinkingIndicator } from './components/ThinkingIndicator';
import { ChatInputBar } from './components/ChatInputBar';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ApiKeysModal } from './components/ApiKeysModal';
import { HistorySidebar } from './components/HistorySidebar';
import { executeDebate } from './services/debateService';
import { Sparkles, Cpu, Bot } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals & Sidebars State
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [isKeysOpen, setIsKeysOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // User API Keys State
  const [userKeys, setUserKeys] = useState<UserApiKeys>({});

  // Debate History State stored in localStorage
  const [history, setHistory] = useState<ConsensusResult[]>(() => {
    try {
      const saved = localStorage.getItem('ai_consensus_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Progress Stepper State
  const [progress, setProgress] = useState<ProgressState>({
    currentStep: 0,
    statusText: '',
    activeAgents: [],
    logs: [],
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ai_consensus_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save debate history to localStorage', e);
    }
  }, [history]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, progress]);

  const handleStartDebate = async (
    prompt: string,
    mode: DebateMode,
    intensity: DebateIntensity
  ) => {
    setIsLoading(true);
    setError(null);

    const userMsgId = `user_${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Live Step Progress Feedback
    setProgress({
      currentStep: 1,
      statusText: 'Querying ChatGPT, Claude 3.5, Llama 3.3, DeepSeek & Perplexity in parallel...',
      activeAgents: ['gpt4o', 'claude', 'llama', 'deepseek', 'perplexity'],
      logs: ['Dispatching parallel draft requests...'],
    });

    const stepTimer1 = setTimeout(() => {
      if (intensity === 'deep') {
        setProgress({
          currentStep: 2,
          statusText: 'Agents cross-critiquing positions & resolving edge cases...',
          activeAgents: ['gpt4o', 'claude', 'llama', 'deepseek', 'perplexity'],
          logs: ['Drafts received. Generating cross-critiques...'],
        });
      } else {
        setProgress({
          currentStep: 3,
          statusText: 'Synthesizing master consensus verdict...',
          activeAgents: ['gpt4o', 'claude'],
          logs: ['Synthesizing consensus verdict...'],
        });
      }
    }, 2500);

    const stepTimer2 = setTimeout(() => {
      if (intensity === 'deep') {
        setProgress({
          currentStep: 3,
          statusText: 'Synthesizing master consensus verdict...',
          activeAgents: ['gpt4o', 'claude', 'llama', 'deepseek', 'perplexity'],
          logs: ['Cross-critiques complete. Formatting consensus output...'],
        });
      }
    }, 5000);

    try {
      const data = await executeDebate(prompt, mode, intensity, userKeys);

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const assistantMsg: ChatMessage = {
        id: data.id,
        role: 'assistant',
        consensusResult: data,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setHistory((prev) => [data, ...prev.filter((h) => h.id !== data.id)]);

      setProgress({
        currentStep: 0,
        statusText: 'Consensus generated successfully!',
        activeAgents: [],
        logs: [],
      });
    } catch (err: any) {
      console.error('Error during debate pipeline:', err);
      setError(err?.message || 'An unexpected network error occurred.');
      setProgress({
        currentStep: 0,
        statusText: 'Pipeline error occurred.',
        activeAgents: [],
        logs: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleSelectHistoryDebate = (debate: ConsensusResult) => {
    setMessages([
      {
        id: `user_${debate.id}`,
        role: 'user',
        content: debate.prompt,
        timestamp: debate.timestamp,
      },
      {
        id: debate.id,
        role: 'assistant',
        consensusResult: debate,
        timestamp: debate.timestamp,
      },
    ]);
  };

  const handleClearCache = async () => {
    try {
      await fetch('/api/cache/clear', { method: 'POST' });
      alert('Debate cache cleared successfully!');
    } catch (err) {
      console.error('Failed to clear cache:', err);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your saved debate history?')) {
      setHistory([]);
      localStorage.removeItem('ai_consensus_history');
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#e8e8e8] font-sans selection:bg-yellow-400 selection:text-[#171717] flex flex-col justify-between">
      {/* Fixed Top Navigation Bar */}
      <Header
        onNewChat={handleNewChat}
        onOpenArchitecture={() => setIsArchOpen(true)}
        onOpenApiKeys={() => setIsKeysOpen(true)}
        onToggleHistory={() => setIsHistoryOpen(true)}
        onClearCache={handleClearCache}
        historyCount={history.length}
      />

      {/* Main Chat Thread Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-6 pb-32">
        {/* Empty Chat Welcome Screen */}
        {messages.length === 0 && !isLoading && (
          <div className="text-center my-12 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#e8e8e8] tracking-tight">
              What should the AI models <span className="text-yellow-400">yap</span> about today?
            </h2>
            <p className="text-xs sm:text-sm text-[#888] mt-2 leading-relaxed">
              Ask any question to trigger a structured multi-agent debate between <span className="text-[#ccc] font-medium">ChatGPT</span>, <span className="text-[#ccc] font-medium">Claude 3.5</span>, <span className="text-[#ccc] font-medium">Llama 3.3</span>, and <span className="text-[#ccc] font-medium">Perplexity Search</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-8 text-left text-xs">
              <div className="bg-[#1e1e1e] p-3.5 rounded-xl border border-[#2a2a2a]">
                <div className="text-yellow-400 font-medium mb-1 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" /> 1. Parallel Stances
                </div>
                <div className="text-[#777]">4 AI models generate independent initial answers.</div>
              </div>
              <div className="bg-[#1e1e1e] p-3.5 rounded-xl border border-[#2a2a2a]">
                <div className="text-yellow-400 font-medium mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> 2. Cross-Critique
                </div>
                <div className="text-[#777]">Models critique logical flaws and point out edge cases.</div>
              </div>
              <div className="bg-[#1e1e1e] p-3.5 rounded-xl border border-[#2a2a2a]">
                <div className="text-yellow-400 font-medium mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 3. Master Verdict
                </div>
                <div className="text-[#777]">A single unified consensus is synthesized with confidence score.</div>
              </div>
            </div>
          </div>
        )}

        {/* Message Stream */}
        {messages.map((msg) => (
          <ChatMessageItem key={msg.id} message={msg} />
        ))}

        {/* Live Thinking / Processing Feedback Indicator */}
        {isLoading && <ThinkingIndicator progress={progress} />}

        {/* Error Notification */}
        {error && (
          <div className="bg-red-950/30 border border-red-500/30 text-red-300 p-4 rounded-xl text-xs sm:text-sm mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-xs underline font-medium text-red-400 hover:text-red-300 ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Fixed Bottom Floating Chat Bar (Claude / ChatGPT style) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-[#171717] via-[#171717]/95 to-transparent pt-4">
        <ChatInputBar
          onSubmit={handleStartDebate}
          isLoading={isLoading}
          isEmptyThread={messages.length === 0}
        />
      </div>

      {/* Modals & Sidebars */}
      <ArchitectureModal isOpen={isArchOpen} onClose={() => setIsArchOpen(false)} />
      <ApiKeysModal
        isOpen={isKeysOpen}
        onClose={() => setIsKeysOpen(false)}
        userKeys={userKeys}
        onSaveKeys={(keys) => setUserKeys(keys)}
      />
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectDebate={handleSelectHistoryDebate}
        onClearHistory={handleClearHistory}
        onDeleteDebate={handleDeleteHistoryItem}
      />
    </div>
  );
}
