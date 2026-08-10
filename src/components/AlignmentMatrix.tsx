import React from 'react';
import { ModelAlignmentScore } from '../types';
import { AGENTS } from '../data/agents';
import { BarChart2, Award } from 'lucide-react';

interface AlignmentMatrixProps {
  alignmentScores: ModelAlignmentScore[];
}

export const AlignmentMatrix: React.FC<AlignmentMatrixProps> = ({ alignmentScores }) => {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-5 lg:p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2a2a2a]">
        <div>
          <h3 className="text-sm font-semibold text-[#e8e8e8] flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-yellow-400" />
            <span>Model Agreement & Alignment Matrix</span>
          </h3>
          <p className="text-xs text-[#888] mt-0.5 font-normal">
            Quantifying how closely each AI model aligns with the final synthesized consensus
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {alignmentScores.map((score) => {
          const agent = AGENTS[score.agentId] || {
            name: score.agentName,
            badge: score.agentName,
          };

          return (
            <div
              key={score.agentId}
              className="bg-[#171717] rounded-xl p-4 border border-[#2a2a2a] flex flex-col justify-between hover:border-yellow-400/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#e8e8e8]">
                      {agent.badge}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                    {score.alignmentPercent}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#222222] h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
                    style={{ width: `${score.alignmentPercent}%` }}
                  />
                </div>

                <p className="text-xs text-[#aaa] leading-normal line-clamp-3">
                  <span className="text-[#666] font-medium">Contribution: </span>
                  {score.keyContribution}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#222222] flex items-center gap-1.5 text-[11px] text-[#666]">
                <Award className="w-3 h-3 text-yellow-400" />
                <span>Verified in Synthesis</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
