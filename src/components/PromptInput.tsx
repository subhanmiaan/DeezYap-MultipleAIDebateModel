import React, { useState } from 'react';
import { ArrowUp, Zap, Sparkles, BookOpen, Compass, Code2 } from 'lucide-react';
import { DebateIntensity, DebateMode } from '../types';
import { PRESET_PROMPTS, PresetPrompt } from '../data/presetPrompts';

interface PromptInputProps {
  onSubmit: (prompt: string, mode: DebateMode, intensity: DebateIntensity) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<DebateMode>('balanced');
  const [intensity, setIntensity] = useState<DebateIntensity>('deep');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim(), mode, intensity);
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
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Minimalist Input Area */}
        <div className="relative bg-[#222222] border border-[#2a2a2a] rounded-xl p-3 focus-within:border-yellow-400/50 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask DeezYap to debate any question across ChatGPT, Claude, Llama & Perplexity..."
            rows={3}
            disabled={isLoading}
            className="w-full bg-transparent text-[#e8e8e8] placeholder-[#555555] text-sm sm:text-base outline-none resize-none disabled:opacity-50 font-sans leading-relaxed"
          />
          <div className="flex items-center justify-between pt-2 border-t border-[#2a2a2a]/60">
            <span className="text-[11px] text-[#555]">
              Press <kbd className="px-1.5 py-0.5 rounded bg-[#171717] border border-[#333] text-[#777] text-[10px]">Enter</kbd> to debate
            </span>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-30 text-[#171717] font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-[#171717]/30 border-t-[#171717] rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-3.5 h-3.5" />
              )}
              <span>Start Debate</span>
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          {/* Focus Modes */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#666] font-medium mr-1">Focus:</span>

            <button
              type="button"
              onClick={() => setMode('balanced')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
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
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
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
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
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
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'creative'
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                  : 'bg-[#171717] text-[#777] hover:text-[#bbb] border border-[#2a2a2a]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Creative</span>
            </button>
          </div>

          {/* Intensity Toggle */}
          <div className="flex items-center gap-1 bg-[#171717] p-1 rounded-lg border border-[#2a2a2a] self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIntensity('fast')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                intensity === 'fast'
                  ? 'bg-[#282828] text-yellow-400'
                  : 'text-[#666] hover:text-[#aaa]'
              }`}
            >
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Fast (1-Round)</span>
            </button>

            <button
              type="button"
              onClick={() => setIntensity('deep')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                intensity === 'deep'
                  ? 'bg-yellow-400 text-[#171717]'
                  : 'text-[#666] hover:text-[#aaa]'
              }`}
            >
              <span>Deep Debate</span>
            </button>
          </div>
        </div>
      </form>

      {/* Preset Prompts Chips */}
      <div className="mt-4 pt-3 border-t border-[#2a2a2a]/60">
        <div className="text-[11px] text-[#555] font-medium mb-2">Suggested Topics:</div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_PROMPTS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              disabled={isLoading}
              className="text-xs bg-[#171717] hover:bg-[#252525] text-[#888] hover:text-yellow-400 px-2.5 py-1 rounded-lg border border-[#2a2a2a] transition-all flex items-center gap-1.5 text-left disabled:opacity-50 cursor-pointer"
            >
              <span>{preset.icon}</span>
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
