export type AgentId = 'gpt4o' | 'claude' | 'llama' | 'perplexity' | 'deepseek';

export interface AgentInfo {
  id: AgentId;
  name: string;
  provider: string;
  badge: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  avatar: string;
  systemPersona: string;
}

export type DebateIntensity = 'fast' | 'deep';

export type DebateMode = 'balanced' | 'technical' | 'factcheck' | 'creative';

export interface AgentDraft {
  agentId: AgentId;
  agentName: string;
  provider: string;
  draftText: string;
  timestamp: string;
  executionTimeMs: number;
}

export interface AgentCritique {
  agentId: AgentId;
  agentName: string;
  critiqueText: string;
  revisedStance: string;
  agreedWithOthers: string[];
  disagreedWithOthers: string[];
  executionTimeMs: number;
}

export interface GroundingSource {
  title: string;
  url: string;
  snippet?: string;
}

export interface ModelAlignmentScore {
  agentId: AgentId;
  agentName: string;
  alignmentPercent: number;
  keyContribution: string;
}

export interface JudgeModelScore {
  agentId: AgentId;
  agentName: string;
  score: number; // 0-100
  feedback: string;
}

export interface JudgeEvaluation {
  judgeName: string;
  unbiasedRationale: string;
  modelScores: JudgeModelScore[];
}

export interface ConsensusResult {
  id: string;
  prompt: string;
  mode: DebateMode;
  intensity: DebateIntensity;
  timestamp: string;
  drafts: AgentDraft[];
  critiques: AgentCritique[];
  consensusAnswer: string;
  keyAgreedPoints: string[];
  divergentPoints: string[];
  confidenceScore: number;
  modelAgreementMatrix: ModelAlignmentScore[];
  sources: GroundingSource[];
  judgeEvaluation?: JudgeEvaluation;
  totalExecutionTimeMs: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content?: string;
  consensusResult?: ConsensusResult;
  timestamp: string;
}

export interface ProgressState {
  currentStep: 0 | 1 | 2 | 3;
  statusText: string;
  activeAgents: AgentId[];
  logs: string[];
  error?: string;
}

export interface UserApiKeys {
  groqKey?: string;
  deepseekKey?: string;
  openRouterKey?: string;
  tavilyKey?: string;
}
