import React, { useState } from 'react';
import { Key, Save, X, Lock, ShieldCheck } from 'lucide-react';
import { UserApiKeys } from '../types';

interface ApiKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
  userKeys: UserApiKeys;
  onSaveKeys: (keys: UserApiKeys) => void;
}

export const ApiKeysModal: React.FC<ApiKeysModalProps> = ({
  isOpen,
  onClose,
  userKeys,
  onSaveKeys,
}) => {
  const [groqKey, setGroqKey] = useState(userKeys.groqKey || '');
  const [deepseekKey, setDeepseekKey] = useState(userKeys.deepseekKey || '');
  const [openRouterKey, setOpenRouterKey] = useState(userKeys.openRouterKey || '');
  const [tavilyKey, setTavilyKey] = useState(userKeys.tavilyKey || '');
  const [savedMsg, setSavedMsg] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKeys({
      groqKey: groqKey.trim() || undefined,
      deepseekKey: deepseekKey.trim() || undefined,
      openRouterKey: openRouterKey.trim() || undefined,
      tavilyKey: tavilyKey.trim() || undefined,
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-yellow-400/10 rounded-lg border border-yellow-400/20 text-yellow-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-[#e8e8e8] text-sm sm:text-base">Custom API Keys</h3>
              <p className="text-xs text-[#888] font-normal">
                Optional developer keys for custom routing
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

        <form onSubmit={handleSave} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#ccc] mb-1">
              Groq Free Tier API Key (Llama 3.3 70B)
            </label>
            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full bg-[#171717] text-xs text-[#e8e8e8] placeholder-[#555] rounded-lg p-2.5 border border-[#2a2a2a] focus:outline-none focus:border-yellow-400/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#ccc] mb-1">
              DeepSeek Official API Key (real DeepSeek V3)
            </label>
            <input
              type="password"
              value={deepseekKey}
              onChange={(e) => setDeepseekKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-[#171717] text-xs text-[#e8e8e8] placeholder-[#555] rounded-lg p-2.5 border border-[#2a2a2a] focus:outline-none focus:border-yellow-400/50 font-mono"
            />
            <p className="text-[10px] text-[#666] mt-1">
              From platform.deepseek.com — new accounts get a 5M token trial, no card required.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#ccc] mb-1">
              OpenRouter API Key (not yet used)
            </label>
            <input
              type="password"
              value={openRouterKey}
              onChange={(e) => setOpenRouterKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full bg-[#171717] text-xs text-[#e8e8e8] placeholder-[#555] rounded-lg p-2.5 border border-[#2a2a2a] focus:outline-none focus:border-yellow-400/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#ccc] mb-1">
              Tavily Web Search API Key (not yet used)
            </label>
            <input
              type="password"
              value={tavilyKey}
              onChange={(e) => setTavilyKey(e.target.value)}
              placeholder="tvly-..."
              className="w-full bg-[#171717] text-xs text-[#e8e8e8] placeholder-[#555] rounded-lg p-2.5 border border-[#2a2a2a] focus:outline-none focus:border-yellow-400/50 font-mono"
            />
          </div>

          <div className="bg-[#171717] p-3 rounded-xl border border-[#2a2a2a] text-[11px] text-[#888] flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
            <span>
              Groq and DeepSeek keys route those two agents to the real model instead of a Gemini-simulated persona. Without them, ChatGPT/Claude/Llama/DeepSeek all still run — just simulated via Gemini, since OpenAI/Anthropic have no free API tier. Keys entered here stay in browser memory only and are sent with each request; a server-side key in .env is safer for personal use.
            </span>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-[#2a2a2a]">
            {savedMsg ? (
              <span className="text-xs text-yellow-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                Keys Saved
              </span>
            ) : (
              <span className="text-xs text-[#555]">Local Client Storage</span>
            )}

            <button
              type="submit"
              className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-[#171717] font-semibold rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
