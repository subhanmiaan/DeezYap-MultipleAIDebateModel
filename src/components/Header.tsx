import React from 'react';
import { Zap, Settings, FileCode, Trash2, History, Plus } from 'lucide-react';

interface HeaderProps {
  onNewChat: () => void;
  onOpenArchitecture: () => void;
  onOpenApiKeys: () => void;
  onToggleHistory: () => void;
  onClearCache: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNewChat,
  onOpenArchitecture,
  onOpenApiKeys,
  onToggleHistory,
  onClearCache,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#171717]/90 backdrop-blur-md border-b border-[#2a2a2a] px-4 lg:px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 text-[#171717] flex items-center justify-center font-bold">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-lg text-[#e8e8e8] tracking-tight">
              Deez<span className="text-yellow-400">Yap</span>
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#222] text-yellow-400 border border-[#333] font-medium hidden sm:inline">
              Multi-Agent AI
            </span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2">
          {/* New Chat */}
          <button
            onClick={onNewChat}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#171717] text-xs font-semibold transition-colors cursor-pointer"
            title="Start New Debate Thread"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>

          {/* Architecture */}
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-[#888] hover:text-[#e8e8e8] text-xs font-medium transition-colors border border-[#2a2a2a] cursor-pointer"
            title="System Blueprint"
          >
            <FileCode className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden sm:inline">Blueprint</span>
          </button>

          {/* API Keys */}
          <button
            onClick={onOpenApiKeys}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-[#888] hover:text-[#e8e8e8] text-xs font-medium transition-colors border border-[#2a2a2a] cursor-pointer"
            title="API Keys"
          >
            <Settings className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden md:inline">API Keys</span>
          </button>

          {/* History */}
          <button
            onClick={onToggleHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#282828] text-[#888] hover:text-[#e8e8e8] text-xs font-medium transition-colors border border-[#2a2a2a] cursor-pointer"
            title="History"
          >
            <History className="w-3.5 h-3.5 text-yellow-400" />
            <span className="hidden md:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-yellow-400 text-[#171717] rounded-full text-[10px] font-bold">
                {historyCount}
              </span>
            )}
          </button>

          {/* Clear Cache */}
          <button
            onClick={onClearCache}
            className="p-1.5 rounded-lg bg-[#1e1e1e] hover:bg-red-500/10 text-[#666] hover:text-red-400 transition-colors border border-[#2a2a2a] cursor-pointer"
            title="Clear Cache"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
