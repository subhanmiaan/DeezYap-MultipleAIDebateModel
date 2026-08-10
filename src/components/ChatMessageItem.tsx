import React, { useState } from 'react';
import { ChatMessage, AgentId } from '../types';
import { AGENTS } from '../data/agents';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Download,
  Clock,
  ChevronRight,
  MessageSquare,
  BarChart2,
  ShieldCheck,
} from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const [activeTab, setActiveTab] = useState<'consensus' | 'drafts' | 'critiques' | 'matrix' | 'judge'>('consensus');
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>('gpt4o');
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="bg-[#222222] border border-[#2a2a2a] rounded-2xl rounded-tr-sm px-4 py-3 max-w-2xl text-[#e8e8e8] text-sm sm:text-[15px] leading-relaxed shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  const consensus = message.consensusResult;
  if (!consensus) return null;

  const handleCopy = () => {
    const textToCopy = `# DeezYap Master Verdict
Query: ${consensus.prompt}
Confidence: ${consensus.confidenceScore}%

## Final Consensus Answer
${consensus.consensusAnswer}

## Key Agreed Points
${consensus.keyAgreedPoints.map((p) => `- ${p}`).join('\n')}

## Points of Divergence
${consensus.divergentPoints.map((p) => `- ${p}`).join('\n')}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    const markdownContent = `# DeezYap Verdict
Query: ${consensus.prompt}
Date: ${new Date(consensus.timestamp).toLocaleString()}
Confidence: ${consensus.confidenceScore}%

## Final Consensus Answer
${consensus.consensusAnswer}

## Key Agreed Points
${consensus.keyAgreedPoints.map((p) => `- ${p}`).join('\n')}

## Divergent Points
${consensus.divergentPoints.map((p) => `- ${p}`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deezyap-verdict-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex gap-3 mb-8">
      {/* Assistant Avatar */}
      <div className="w-8 h-8 rounded-lg bg-yellow-400 text-[#171717] flex items-center justify-center font-bold text-sm shrink-0 mt-1 shadow-sm">
        <Sparkles className="w-4 h-4 fill-current" />
      </div>

      <div className="flex-1 bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-4 sm:p-6 shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#2a2a2a]">
          <div className="flex flex-wrap items-center gap-1 bg-[#171717] p-1 rounded-xl border border-[#2a2a2a]">
            <button
              onClick={() => setActiveTab('consensus')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'consensus'
                  ? 'bg-yellow-400 text-[#171717]'
                  : 'text-[#777] hover:text-[#ccc]'
              }`}
            >
              💡 Master Consensus
            </button>

            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'drafts'
                  ? 'bg-yellow-400 text-[#171717]'
                  : 'text-[#777] hover:text-[#ccc]'
              }`}
            >
              🤖 Agent Stances ({consensus.drafts.length})
            </button>

            <button
              onClick={() => setActiveTab('critiques')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'critiques'
                  ? 'bg-yellow-400 text-[#171717]'
                  : 'text-[#777] hover:text-[#ccc]'
              }`}
            >
              ⚔️ Cross-Critiques
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-yellow-400 text-[#171717]'
                  : 'text-[#777] hover:text-[#ccc]'
              }`}
            >
              📊 Agreement Matrix
            </button>

            {consensus.judgeEvaluation && (
              <button
                onClick={() => setActiveTab('judge')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'judge'
                    ? 'bg-yellow-400 text-[#171717]'
                    : 'text-[#777] hover:text-[#ccc]'
                }`}
              >
                ⚖️ Judge Verdict
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-400 font-semibold px-2 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/20">
              {consensus.confidenceScore}% Consensus
            </span>
            <span className="text-[11px] text-[#666] font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-yellow-400" />
              {(consensus.totalExecutionTimeMs / 1000).toFixed(1)}s
            </span>
          </div>
        </div>

        {/* TAB 1: Consensus Verdict */}
        {activeTab === 'consensus' && (
          <div>
            <div className="text-[#e8e8e8] text-sm sm:text-[15px] leading-relaxed font-sans space-y-4 whitespace-pre-wrap mb-5">
              {consensus.consensusAnswer}
            </div>

            {/* Grid: Key Agreed vs Divergent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#171717] rounded-xl p-3.5 border border-[#2a2a2a]">
                <h4 className="text-xs font-semibold text-yellow-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Key Agreed Points</span>
                </h4>
                <ul className="space-y-1.5">
                  {consensus.keyAgreedPoints.map((point, i) => (
                    <li key={i} className="text-xs text-[#ccc] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#171717] rounded-xl p-3.5 border border-[#2a2a2a]">
                <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Divergent Points & Nuances</span>
                </h4>
                <ul className="space-y-1.5">
                  {consensus.divergentPoints.map((point, i) => (
                    <li key={i} className="text-xs text-[#ccc] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Agent Stances */}
        {activeTab === 'drafts' && (
          <div>
            {/* Agent Selectors */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {consensus.drafts.map((draft) => {
                const agent = AGENTS[draft.agentId];
                const isSelected = selectedAgentId === draft.agentId;
                return (
                  <button
                    key={draft.agentId}
                    onClick={() => setSelectedAgentId(draft.agentId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/40'
                        : 'bg-[#171717] text-[#777] border-[#2a2a2a] hover:text-[#ccc]'
                    }`}
                  >
                    <span>{agent.avatar}</span>
                    <span>{agent.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Display Selected Agent Draft */}
            {(() => {
              const draft = consensus.drafts.find((d) => d.agentId === selectedAgentId) || consensus.drafts[0];
              const agent = AGENTS[draft.agentId];
              return (
                <div className="bg-[#171717] rounded-xl p-4 border border-[#2a2a2a]">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#222]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{agent.avatar}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-[#e8e8e8]">{agent.name}</h4>
                        <span className="text-[10px] text-[#666]">{agent.provider}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#666] font-mono">
                      {(draft.executionTimeMs / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-[#ccc] leading-relaxed whitespace-pre-wrap font-sans">
                    {draft.draftText}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 3: Cross Critiques */}
        {activeTab === 'critiques' && (
          <div className="space-y-3">
            {consensus.critiques.map((critique) => {
              const agent = AGENTS[critique.agentId];
              return (
                <div key={critique.agentId} className="bg-[#171717] rounded-xl p-3.5 border border-[#2a2a2a]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{agent.avatar}</span>
                      <span className="text-xs font-semibold text-[#e8e8e8]">{agent.name} Critique</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#ccc] leading-relaxed whitespace-pre-wrap mb-2">
                    {critique.critiqueText}
                  </div>
                  {critique.agreedWithOthers && critique.agreedWithOthers.length > 0 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
                      <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Aligned with:</span>
                      <div className="flex flex-wrap gap-1">
                        {critique.agreedWithOthers.map((m, idx) => (
                          <span key={idx} className="px-1.5 py-0.2 rounded bg-yellow-400/10 text-yellow-400 text-[10px]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: Alignment Matrix */}
        {activeTab === 'matrix' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {consensus.modelAgreementMatrix.map((score) => {
              const agent = AGENTS[score.agentId];
              return (
                <div key={score.agentId} className="bg-[#171717] p-3 rounded-xl border border-[#2a2a2a]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#e8e8e8]">{agent.badge}</span>
                    <span className="text-xs font-semibold text-yellow-400">{score.alignmentPercent}%</span>
                  </div>
                  <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${score.alignmentPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#888] line-clamp-2">{score.keyContribution}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 5: Judge Verdict */}
        {activeTab === 'judge' && consensus.judgeEvaluation && (
          <div>
            <div className="bg-[#171717] rounded-xl p-3.5 border border-[#2a2a2a] mb-3">
              <h4 className="text-xs font-semibold text-yellow-400 mb-1.5">
                {consensus.judgeEvaluation.judgeName}
              </h4>
              <p className="text-xs text-[#ccc] leading-relaxed">
                {consensus.judgeEvaluation.unbiasedRationale}
              </p>
            </div>

            <div className="space-y-2.5">
              {[...consensus.judgeEvaluation.modelScores]
                .sort((a, b) => b.score - a.score)
                .map((s) => {
                  const agent = AGENTS[s.agentId];
                  return (
                    <div key={s.agentId} className="bg-[#171717] rounded-xl p-3.5 border border-[#2a2a2a]">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span>{agent?.avatar}</span>
                          <span className="text-xs font-semibold text-[#e8e8e8]">{agent?.name || s.agentName}</span>
                        </div>
                        <span className="text-xs font-semibold text-yellow-400">{s.score}/100</span>
                      </div>
                      <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-[#888]">{s.feedback}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Collapsible Grounded Sources */}
        {consensus.sources && consensus.sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#2a2a2a]">
            <button
              onClick={() => setShowSources(!showSources)}
              className="text-xs font-medium text-[#777] hover:text-yellow-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
              <span>Grounded Web Search Sources ({consensus.sources.length})</span>
            </button>

            {showSources && (
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {consensus.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#171717] hover:bg-[#222] p-2 rounded-lg border border-[#2a2a2a] text-xs text-yellow-400 truncate flex items-center justify-between"
                  >
                    <span className="truncate">{source.title}</span>
                    <ExternalLink className="w-3 h-3 opacity-50 shrink-0 ml-1" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Footer */}
        <div className="mt-4 pt-3 border-t border-[#2a2a2a] flex items-center justify-between text-xs">
          <span className="text-[#555] text-[11px]">ID: {consensus.id}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-[#171717] hover:bg-[#252525] text-[#ccc] text-xs transition-colors flex items-center gap-1 border border-[#2a2a2a] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-yellow-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportMarkdown}
              className="px-2.5 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#171717] font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
