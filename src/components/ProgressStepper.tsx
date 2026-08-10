import React from 'react';
import { Cpu, MessageSquare, Scale, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { ProgressState, AgentId } from '../types';
import { AGENTS } from '../data/agents';

interface ProgressStepperProps {
  progress: ProgressState;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ progress }) => {
  const { currentStep, statusText, activeAgents } = progress;

  const steps = [
    {
      id: 1,
      title: 'Querying Models',
      subtitle: 'Parallel draft generation',
      icon: Cpu,
    },
    {
      id: 2,
      title: 'Cross-Critiquing',
      subtitle: 'Auditing positions & flaws',
      icon: MessageSquare,
    },
    {
      id: 3,
      title: 'Synthesizing Consensus',
      subtitle: 'Generating final verdict',
      icon: Scale,
    },
  ];

  return (
    <div className="bg-[#1e1e1e] border border-yellow-400/30 rounded-2xl p-5 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <h3 className="text-sm font-semibold text-[#e8e8e8]">Debate Engine Active</h3>
        </div>
        <span className="text-[11px] px-2 py-0.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-md font-medium animate-pulse">
          Processing
        </span>
      </div>

      {/* Stepper Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-[#222] border-yellow-400/50'
                  : isCompleted
                  ? 'bg-[#171717] border-[#2a2a2a] text-[#888]'
                  : 'bg-[#171717]/50 border-[#222] text-[#444]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold ${
                    isCurrent
                      ? 'bg-yellow-400 text-[#171717]'
                      : isCompleted
                      ? 'bg-[#2a2a2a] text-yellow-400'
                      : 'bg-[#222] text-[#555]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-medium ${isCurrent ? 'text-yellow-400' : 'text-[#ccc]'}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-[#666] mt-0.5">{step.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Agents Badge Glow */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#2a2a2a]">
        <div className="text-xs text-[#888] flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
          <span>{statusText || 'Orchestrating multi-agent pipeline...'}</span>
        </div>

        {/* Participating AI Agents */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#555] font-medium">Agents:</span>
          <div className="flex items-center gap-1.5">
            {Object.values(AGENTS).map((agent) => {
              const isActive = activeAgents.includes(agent.id as AgentId);
              return (
                <div
                  key={agent.id}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border transition-all ${
                    isActive
                      ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30 animate-pulse'
                      : 'bg-[#171717] text-[#555] border-[#2a2a2a] opacity-40'
                  }`}
                >
                  <span>{agent.avatar}</span>
                  <span className="text-[10px] hidden lg:inline">{agent.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
