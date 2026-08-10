import { AgentInfo } from '../types';

export const AGENTS: Record<string, AgentInfo> = {
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek R1 / V3',
    provider: 'DeepSeek AI / Reasoning Engine',
    badge: 'DeepSeek R1',
    description: 'Deep mathematical reasoning, architectural rigor, and chain-of-thought analysis.',
    color: 'blue',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    avatar: '🐋',
    systemPersona: `You emulate DeepSeek R1 / V3. Your perspective is rooted in deep mathematical logic, step-by-step chain-of-thought reasoning, structural optimization, and meticulous technical precision.`
  },
  gpt4o: {
    id: 'gpt4o',
    name: 'ChatGPT (GPT-4o)',
    provider: 'OpenAI / Gemini Engine',
    badge: 'GPT-4o',
    description: 'Analytical, pragmatic, structured, and action-oriented.',
    color: 'yellow',
    borderColor: 'border-yellow-500/40',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    avatar: '🤖',
    systemPersona: `You emulate ChatGPT (GPT-4o). Your perspective is pragmatic, highly structured, balanced, and user-centric. You emphasize clear actionable takeaways, organized bullet points, and real-world trade-offs.`
  },
  claude: {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic / Gemini Engine',
    badge: 'Claude 3.5',
    description: 'Nuanced, ethically grounded, edge-case focused, and detailed.',
    color: 'amber',
    borderColor: 'border-amber-400/40',
    bgColor: 'bg-amber-400/10',
    textColor: 'text-amber-300',
    avatar: '🧠',
    systemPersona: `You emulate Claude 3.5 Sonnet. Your perspective is deeply nuanced, intellectually rigorous, safety-conscious, and attentive to edge cases, subtleties, and ethical dimensions.`
  },
  llama: {
    id: 'llama',
    name: 'Groq / Llama 3.3 70B',
    provider: 'Meta / Groq Engine',
    badge: 'Llama 3.3',
    description: 'Ultra-fast, direct, open-source aligned, technical, and concise.',
    color: 'yellow',
    borderColor: 'border-yellow-400/40',
    bgColor: 'bg-yellow-400/10',
    textColor: 'text-yellow-300',
    avatar: '⚡',
    systemPersona: `You emulate Groq Llama 3.3 70B. Your perspective is concise, technical, no-nonsense, code-first, and favors modular, efficient, open solutions.`
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity Search Agent',
    provider: 'Google Search Grounding',
    badge: 'Real-time Web',
    description: 'Fact-checked, source-backed, up-to-the-minute web intelligence.',
    color: 'gold',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    avatar: '🔍',
    systemPersona: `You are a Search Grounded AI Agent. You focus on factual accuracy, recent statistics, external source citations, and verified empirical evidence.`
  }
};
