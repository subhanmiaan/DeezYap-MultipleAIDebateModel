import React, { useState } from 'react';
import { ConsensusResult } from '../types';
import {
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  Download,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react';

interface ConsensusCardProps {
  consensus: ConsensusResult;
}

export const ConsensusCard: React.FC<ConsensusCardProps> = ({ consensus }) => {
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(true);

  const handleCopy = () => {
    const textToCopy = `# DeezYap Master Verdict

Query: ${consensus.prompt}
Confidence Score: ${consensus.confidenceScore}%

## Final Consensus Answer
${consensus.consensusAnswer}

## Key Agreed Points
${consensus.keyAgreedPoints.map((p) => `- ${p}`).join('\n')}

## Points of Divergence / Nuance
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
Mode: ${consensus.mode}
Execution Time: ${(consensus.totalExecutionTimeMs / 1000).toFixed(2)}s

## Final Consensus Answer
${consensus.consensusAnswer}

## Key Agreed Points
${consensus.keyAgreedPoints.map((p) => `- ${p}`).join('\n')}

## Divergent Points
${consensus.divergentPoints.map((p) => `- ${p}`).join('\n')}

## Grounded Sources
${consensus.sources.map((s) => `- [${s.title}](${s.url})`).join('\n')}
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
    <div className="bg-[#1e1e1e] border border-yellow-400/40 rounded-2xl p-6 lg:p-7 mb-8 shadow-sm">
      {/* Header & Confidence Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2a2a2a]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-xs font-medium flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 fill-current" />
              Consensus Verdict
            </span>
            <span className="text-xs text-[#666] font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-yellow-400" />
              {(consensus.totalExecutionTimeMs / 1000).toFixed(2)}s
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-[#e8e8e8]">
            Synthesized Consensus Answer
          </h2>
          <p className="text-xs text-[#888] mt-0.5 max-w-2xl font-normal">
            Evaluated across ChatGPT, Claude 3.5, Llama 3.3, DeepSeek, and Perplexity Search.
          </p>
        </div>

        {/* Confidence Badge */}
        <div className="bg-[#222222] p-3 rounded-xl border border-[#2a2a2a] flex items-center gap-3 shrink-0">
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400 leading-tight">
              {consensus.confidenceScore}%
            </div>
            <div className="text-[10px] text-[#666] uppercase tracking-wider font-medium">Confidence</div>
          </div>
          <div className="h-8 w-[1px] bg-[#333]" />
          <div className="text-xs text-[#aaa]">
            {consensus.confidenceScore >= 90
              ? 'High Model Alignment'
              : 'Moderate Agreement'}
          </div>
        </div>
      </div>

      {/* Main Consensus Text Output */}
      <div className="py-5 border-b border-[#2a2a2a]">
        <div className="text-[#e8e8e8] text-sm sm:text-[15px] leading-relaxed font-sans space-y-4 whitespace-pre-wrap">
          {consensus.consensusAnswer}
        </div>
      </div>

      {/* Grid: Agreed Points vs Divergent Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 border-b border-[#2a2a2a]">
        {/* Agreed Points */}
        <div className="bg-[#171717] rounded-xl p-4 border border-[#2a2a2a]">
          <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
            <CheckCircle className="w-3.5 h-3.5 text-yellow-400" />
            <span>Key Agreed Points</span>
          </h4>
          <ul className="space-y-2">
            {consensus.keyAgreedPoints.map((point, i) => (
              <li key={i} className="text-xs sm:text-sm text-[#ccc] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divergent Points */}
        <div className="bg-[#171717] rounded-xl p-4 border border-[#2a2a2a]">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Divergent Points & Nuances</span>
          </h4>
          <ul className="space-y-2">
            {consensus.divergentPoints.map((point, i) => (
              <li key={i} className="text-xs sm:text-sm text-[#ccc] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible Grounded Sources */}
      {consensus.sources && consensus.sources.length > 0 && (
        <div className="pt-4 border-b border-[#2a2a2a] pb-4">
          <button
            onClick={() => setShowSources(!showSources)}
            className="flex items-center justify-between w-full text-xs font-medium text-[#888] hover:text-yellow-400 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-yellow-400" />
              Verified Sources & Search Grounding ({consensus.sources.length})
            </span>
            {showSources ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSources && (
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {consensus.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#171717] hover:bg-[#222222] p-2.5 rounded-lg border border-[#2a2a2a] hover:border-yellow-400/40 transition-all text-xs text-yellow-400 hover:text-yellow-300 flex items-center justify-between group"
                >
                  <span className="truncate pr-2 font-medium">{source.title}</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[#555]">
          Debate ID: <span className="font-mono text-[#777]">{consensus.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-[#171717] hover:bg-[#252525] text-[#ccc] text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#2a2a2a] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-yellow-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-yellow-400" />
                <span>Copy Verdict</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportMarkdown}
            className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#171717] text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>
    </div>
  );
};
