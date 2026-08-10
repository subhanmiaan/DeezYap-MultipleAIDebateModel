import { ConsensusResult, DebateIntensity, DebateMode, UserApiKeys } from '../types';

export async function executeDebate(
  prompt: string,
  mode: DebateMode = 'balanced',
  intensity: DebateIntensity = 'deep',
  userKeys?: UserApiKeys
): Promise<ConsensusResult> {
  // The real pipeline (Gemini + optional real Groq/DeepSeek keys) always runs
  // server-side in server/orchestrator.ts via this route. There is
  // intentionally no client-side fallback that fabricates a plausible-looking
  // answer when this call fails - a fabricated "consensus" that ignores your
  // actual prompt is worse than a visible error, since it looks correct but
  // silently isn't.
  const res = await fetch('/api/debate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, mode, intensity, keys: userKeys }),
  });

  if (!res.ok) {
    let message = `Server responded with ${res.status}`;
    try {
      const errBody = await res.json();
      if (errBody?.error) message = errBody.error;
    } catch {
      // response wasn't JSON - keep the status-based message
    }
    throw new Error(message);
  }

  return await res.json();
}
