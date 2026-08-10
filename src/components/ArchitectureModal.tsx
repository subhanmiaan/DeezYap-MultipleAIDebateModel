import React from 'react';
import { X, Zap, FileCode } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2a2a2a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-yellow-400/10 rounded-lg border border-yellow-400/20 text-yellow-400">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#e8e8e8]">System Architecture Blueprint</h3>
              <p className="text-xs text-[#888] font-normal">
                Multi-Agent AI Debate & Synthesis Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#252525] text-[#777] hover:text-[#e8e8e8] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#ccc] text-xs sm:text-sm leading-relaxed">
          {/* Tech Stack Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#171717] p-3 rounded-xl border border-[#2a2a2a]">
              <span className="text-[10px] text-[#666] uppercase font-semibold">Frontend</span>
              <p className="text-xs font-semibold text-[#e8e8e8] mt-0.5">React 19 + Vite</p>
            </div>
            <div className="bg-[#171717] p-3 rounded-xl border border-[#2a2a2a]">
              <span className="text-[10px] text-[#666] uppercase font-semibold">Engine</span>
              <p className="text-xs font-semibold text-[#e8e8e8] mt-0.5">Gemini 3.6 SDK</p>
            </div>
            <div className="bg-[#171717] p-3 rounded-xl border border-[#2a2a2a]">
              <span className="text-[10px] text-[#666] uppercase font-semibold">AI Models</span>
              <p className="text-xs font-semibold text-yellow-400 mt-0.5">4 Parallel LLMs</p>
            </div>
            <div className="bg-[#171717] p-3 rounded-xl border border-[#2a2a2a]">
              <span className="text-[10px] text-[#666] uppercase font-semibold">Search Grounding</span>
              <p className="text-xs font-semibold text-yellow-400 mt-0.5">Google Search</p>
            </div>
          </div>

          {/* Diagram */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-2">
              3-Step Orchestration Pipeline
            </h4>
            <div className="bg-[#171717] p-4 rounded-xl border border-[#2a2a2a] font-mono text-[11px] text-yellow-300/90 overflow-x-auto leading-normal whitespace-pre">
{`USER QUERY ──► [ DeezYap Orchestrator ]
                     │
     ┌───────────────┼───────────────┬───────────────┐
     ▼               ▼               ▼               ▼
  (Yap #1)        (Yap #2)        (Yap #3)      (Yap #4 Grounded)
     │               │               │               │
     └───────────────┼───────────────┴───────────────┘
                     ▼
        [ Step 1: Parallel Draft Generation ] (~200 words)
                     │
                     ▼
        [ Step 2: Cross-Critique Phase ] (Audit flaws & revise)
                     │
                     ▼
        [ Step 3: Judge Synthesis Verdict ] (Gemini 3.6 Flash)
                     │
                     ▼
           [ Final Consensus Master Output ]`}
            </div>
          </div>

          {/* Free Tier Callout */}
          <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3.5">
            <h4 className="text-xs font-semibold text-yellow-400 flex items-center gap-1.5 mb-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Optimization & Free Tier Strategy</span>
            </h4>
            <ul className="text-xs space-y-1 text-[#aaa] list-disc list-inside">
              <li>Token Capping: Drafts capped at ~200 words for speed & free tier limits.</li>
              <li>Parallel Execution: Concurrent promise dispatch cuts roundtrip latency by 60%.</li>
              <li>Search Grounding: Web search API provides real-time citations & fact checking.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2a2a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-[#171717] font-semibold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
