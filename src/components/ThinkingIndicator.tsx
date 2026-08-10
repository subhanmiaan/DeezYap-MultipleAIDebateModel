import React from 'react';
import { ProgressState, AgentId } from '../types';
import { AGENTS } from '../data/agents';
import { Sparkles, Loader2, Cpu, MessageSquare, Scale, CheckCircle2 } from 'lucide-react';

interface ThinkingIndicatorProps {
  progress: ProgressState;
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ progress }) => {
  const { currentStep, statusText, activeAgents } = progress;

  const steps = [
    { id: 1, title: 'Drafting Stances', desc: 'Querying 4 parallel models', icon: Cpu },
    { id: 2, title: 'Cross-Critiquing', desc: 'Auditing flaws & edge cases', icon: MessageSquare },
    { id: 3, title: 'Synthesizing Verdict', desc: 'Generating master consensus', icon: Scale },
  ];

  return (
    <div className="flex gap-3 mb-8">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-lg bg-yellow-400 text-[#171717] flex items-center justify-center font-bold text-sm shrink-0 mt-1 shadow-sm">
        <Sparkles className="w-4 h-4 fill-current animate-pulse" />
      </div>

      <div className="flex-1 bg-[#1e1e1e] border border-yellow-400/30 rounded-2xl p-4 sm:p-5 shadow-sm">
        {/* Header Status */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
            <h4 className="text-xs font-semibold text-[#e8e8e8]">
              {statusText || 'Multi-agent consensus engine running...'}
            </h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 font-medium animate-pulse">
            Live Debate
          </span>
        </div>

        {/* 3 Step Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#222222] border-yellow-400/50'
                    : isCompleted
                    ? 'bg-[#171717] border-[#2a2a2a]'
                    : 'bg-[#171717]/40 border-[#222] opacity-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold ${
                      isCurrent
                        ? 'bg-yellow-400 text-[#171717]'
                        : isCompleted
                        ? 'bg-[#2a2a2a] text-yellow-400'
                        : 'bg-[#222] text-[#555]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${isCurrent ? 'text-yellow-400' : 'text-[#ccc]'}`}>
                      {step.title}
                    </div>
                    <div className="text-[10px] text-[#666]">{step.desc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Participating Model Badges */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#2a2a2a]/60">
          <span className="text-[#666] text-[11px]">Active Agents:</span>
          <div className="flex items-center gap-1.5">
            {Object.values(AGENTS).map((agent) => {
              const isActive = activeAgents.includes(agent.id as AgentId);
              return (
                <div
                  key={agent.id}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border transition-all ${
                    isActive
                      ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30 animate-pulse'
                      : 'bg-[#171717] text-[#555] border-[#2a2a2a] opacity-40'
                  }`}
                >
                  <span>{agent.avatar}</span>
                  <span className="hidden sm:inline">{agent.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
