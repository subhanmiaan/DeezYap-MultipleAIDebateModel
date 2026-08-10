import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Zap, Sparkles, BookOpen, Compass, Code2 } from 'lucide-react';
import { DebateIntensity, DebateMode } from '../types';
import { PRESET_PROMPTS, PresetPrompt } from '../data/presetPrompts';

interface ChatInputBarProps {
  onSubmit: (prompt: string, mode: DebateMode, intensity: DebateIntensity) => void;
  isLoading: boolean;
  isEmptyThread: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  onSubmit,
  isLoading,
  isEmptyThread,
}) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<DebateMode>('balanced');
  const [intensity, setIntensity] = useState<DebateIntensity>('deep');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim(), mode, intensity);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSelectPreset = (preset: PresetPrompt) => {
    setInput(preset.prompt);
    setMode(preset.mode);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2">
      {/* Preset Topics if thread is empty */}
      {isEmptyThread && (
        <div className="mb-4">
          <div className="text-[11px] text-[#666] font-medium mb-2 text-center">
            Suggested Conversation Starters:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {PRESET_PROMPTS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                disabled={isLoading}
                className="bg-[#1e1e1e] hover:bg-[#252525] text-[#ccc] hover:text-yellow-400 p-3 rounded-xl border border-[#2a2a2a] hover:border-yellow-400/30 transition-all text-left text-xs cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 font-semibold text-[#e8e8e8] mb-1">
                  <span>{preset.icon}</span>
                  <span>{preset.title}</span>
                </div>
                <div className="text-[11px] text-[#777] line-clamp-2">{preset.prompt}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Chat Input Box */}
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-3 shadow-lg focus-within:border-yellow-400/50 transition-colors">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask DeezYap to debate any question across ChatGPT, Claude, Llama & Perplexity..."
            rows={1}
            disabled={isLoading}
            className="w-full bg-transparent text-[#e8e8e8] placeholder-[#555] text-sm sm:text-[15px] outline-none resize-none disabled:opacity-50 font-sans leading-relaxed px-1"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 mt-1 border-t border-[#2a2a2a]/60">
            {/* Mode selector chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              <button
                type="button"
                onClick={() => setMode('balanced')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  mode === 'balanced'
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                    : 'bg-[#171717] text-[#777] hover:text-[#bbb] border border-[#2a2a2a]'
                }`}
              >
                <Compass className="w-3 h-3" />
                <span>Balanced</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('technical')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  mode === 'technical'
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                    : 'bg-[#171717] text-[#777] hover:text-[#bbb] border border-[#2a2a2a]'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>Technical</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('factcheck')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  mode === 'factcheck'
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                    : 'bg-[#171717] text-[#777] hover:text-[#bbb] border border-[#2a2a2a]'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Fact Check</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('creative')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                  mode === 'creative'
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                    : 'bg-[#171717] text-[#777] hover:text-[#bbb] border border-[#2a2a2a]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Creative</span>
              </button>
            </div>

            {/* Intensity & Submit */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => setIntensity(intensity === 'fast' ? 'deep' : 'fast')}
                className="text-xs text-[#888] hover:text-yellow-400 transition-colors flex items-center gap-1 font-medium cursor-pointer"
                title="Toggle Debate Depth"
              >
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>{intensity === 'deep' ? 'Deep (2-Round)' : 'Fast (1-Round)'}</span>
              </button>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:opacity-30 text-[#171717] font-bold flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                title="Send Message"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#171717]/30 border-t-[#171717] rounded-full animate-spin" />
                ) : (
                  <ArrowUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
