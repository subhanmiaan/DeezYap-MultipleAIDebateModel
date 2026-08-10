import React, { useState } from 'react';
import { ConsensusResult } from '../types';
import { History, Trash2, Search, X, Clock } from 'lucide-react';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: ConsensusResult[];
  onSelectDebate: (debate: ConsensusResult) => void;
  onClearHistory: () => void;
  onDeleteDebate: (id: string) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  history,
  onSelectDebate,
  onClearHistory,
  onDeleteDebate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredHistory = history.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.consensusAnswer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-all">
      <div className="w-full max-w-md bg-[#1e1e1e] border-l border-[#2a2a2a] text-[#e8e8e8] h-full flex flex-col justify-between shadow-2xl">
        {/* Top Header */}
        <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-yellow-400" />
            <h3 className="font-semibold text-sm sm:text-base text-[#e8e8e8]">Debate History</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 font-medium">
              {history.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#252525] text-[#777] hover:text-[#e8e8e8] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3.5 border-b border-[#2a2a2a]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#555] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search previous debates..."
              className="w-full bg-[#171717] text-xs text-[#e8e8e8] placeholder-[#555] rounded-lg pl-8 pr-3 py-2 border border-[#2a2a2a] focus:outline-none focus:border-yellow-400/50 font-sans"
            />
          </div>
        </div>

        {/* List of Debates */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-2.5">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-[#555] text-xs font-normal">
              No saved debates found. Run a debate to store results!
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-[#171717] hover:bg-[#222222] p-3 rounded-xl border border-[#2a2a2a] hover:border-yellow-400/30 transition-all group flex flex-col justify-between gap-2"
              >
                <div
                  onClick={() => {
                    onSelectDebate(item);
                    onClose();
                  }}
                  className="cursor-pointer"
                >
                  <p className="text-xs font-medium text-[#ccc] line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {item.prompt}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-[#666]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-yellow-400" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="text-yellow-400 font-medium">
                      {item.confidenceScore}% Consensus
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#222222]">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#222] text-[#666] uppercase tracking-wider font-mono">
                    {item.mode}
                  </span>

                  <button
                    onClick={() => onDeleteDebate(item.id)}
                    className="text-[#555] hover:text-red-400 p-1 transition-colors cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="p-3.5 border-t border-[#2a2a2a] flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
