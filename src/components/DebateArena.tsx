import React, { useState } from 'react';
import { AgentDraft, AgentCritique, AgentId } from '../types';
import { AGENTS } from '../data/agents';
import { MessageSquare, Check, Copy, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

interface DebateArenaProps {
  drafts: AgentDraft[];
  critiques: AgentCritique[];
}

export const DebateArena: React.FC<DebateArenaProps> = ({ drafts, critiques }) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentId | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDrafts =
    selectedAgent === 'all'
      ? drafts
      : drafts.filter((d) => d.agentId === selectedAgent);

  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-5 lg:p-6 mb-8 shadow-sm">
      {/* Header & Agent Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#2a2a2a]">
        <div>
          <h3 className="text-sm font-semibold text-[#e8e8e8] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-yellow-400" />
            <span>Debate Arena</span>
          </h3>
          <p className="text-xs text-[#888] mt-0.5 font-normal">
            Compare initial stances and cross-critiques from each AI model
          </p>
        </div>

        {/* Filter Agent Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-[#171717] p-1 rounded-xl border border-[#2a2a2a]">
          <button
            type="button"
            onClick={() => setSelectedAgent('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedAgent === 'all'
                ? 'bg-yellow-400 text-[#171717]'
                : 'text-[#777] hover:text-[#bbb]'
            }`}
          >
            All ({drafts.length})
          </button>

          {Object.values(AGENTS).map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => setSelectedAgent(agent.id as AgentId)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedAgent === agent.id
                  ? 'bg-yellow-400 text-[#171717]'
                  : 'text-[#777] hover:text-[#bbb]'
              }`}
            >
              <span>{agent.avatar}</span>
              <span className="hidden md:inline">{agent.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrafts.map((draft) => {
          const agent = AGENTS[draft.agentId];
          const critique = critiques.find((c) => c.agentId === draft.agentId);

          return (
            <div
              key={draft.agentId}
              className="bg-[#171717] rounded-xl p-4 sm:p-5 border border-[#2a2a2a] hover:border-yellow-400/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#222222]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-base">
                      {agent.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#e8e8e8] flex items-center gap-1.5">
                        {agent.name}
                      </h4>
                      <span className="text-[11px] text-[#666] font-normal">{agent.provider}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#222] border border-[#2a2a2a] text-[#888] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-yellow-400" />
                      {(draft.executionTimeMs / 1000).toFixed(1)}s
                    </span>

                    <button
                      onClick={() => handleCopy(draft.draftText, draft.agentId)}
                      className="p-1 rounded bg-[#222] hover:bg-[#2e2e2e] text-[#777] hover:text-yellow-400 transition-colors cursor-pointer"
                      title="Copy Draft"
                    >
                      {copiedId === draft.agentId ? (
                        <Check className="w-3.5 h-3.5 text-yellow-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Initial Draft Stance */}
                <div className="mb-4">
                  <span className="text-[11px] font-medium tracking-wider text-yellow-400 uppercase flex items-center gap-1 mb-1.5">
                    <ChevronRight className="w-3 h-3 text-yellow-400" />
                    Round 1: Initial Stance
                  </span>
                  <div className="bg-[#222222]/70 p-3 rounded-lg border border-[#2a2a2a] text-xs sm:text-sm text-[#ccc] leading-relaxed font-sans whitespace-pre-wrap">
                    {draft.draftText}
                  </div>
                </div>

                {/* Round 2: Cross-Critique if available */}
                {critique && (
                  <div className="pt-2 border-t border-[#222222]">
                    <span className="text-[11px] font-medium tracking-wider text-amber-400 uppercase flex items-center gap-1 mb-1.5">
                      <ChevronRight className="w-3 h-3 text-amber-400" />
                      Round 2: Cross-Critique & Convergence
                    </span>
                    <div className="bg-[#222222]/90 p-3 rounded-lg border border-amber-400/20 text-xs sm:text-sm text-[#ccc] leading-relaxed font-sans whitespace-pre-wrap">
                      {critique.critiqueText}
                    </div>

                    {critique.agreedWithOthers && critique.agreedWithOthers.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#666] font-normal">
                        <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Aligned with:</span>
                        <div className="flex flex-wrap gap-1">
                          {critique.agreedWithOthers.map((modelName, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 font-medium"
                            >
                              {modelName}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
