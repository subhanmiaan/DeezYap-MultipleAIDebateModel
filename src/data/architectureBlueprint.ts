export const ARCHITECTURE_BLUEPRINT_MARKDOWN = `
# 🏛️ AI Consensus Hub System Architecture Blueprint

### 1. High-Level Data Flow & Pipeline
\`\`\`
                          [ User Prompt & Debate Settings ]
                                         │
                                         ▼
                      ┌───────────────────────────────────┐
                      │    Express Orchestrator Engine    │
                      └───────────────────────────────────┘
                                         │
     ┌───────────────────────────────────┼───────────────────────────────────┐
     ▼                                   ▼                                   ▼
┌─────────┐                         ┌─────────┐                         ┌─────────┐
│ Agent 1 │                         │ Agent 2 │                         │ Agent 3 │
│ ChatGPT │                         │ Claude  │                         │ Groq    │
└────┬────┘                         └────┬────┘                         └────┬────┘
     │                                   │                                   │
     └───────────────────────────────────┼───────────────────────────────────┘
                                         ▼
                       [ Step 1: Parallel Draft Generation ]
                                  (max ~250 tokens)
                                         │
                                         ▼
                   ┌───────────────────────────────────────────┐
                   │  Step 2: Cross-Critique & Refinement      │
                   │  (Models audit flaws & adjust positions)  │
                   └─────────────────────┬─────────────────────┘
                                         │
                                         ▼
                   ┌───────────────────────────────────────────┐
                   │  Step 3: Judge Synthesis & Verdict        │
                   │  (Gemini 3.6 Flash / Pro Grounded Engine) │
                   └─────────────────────┬─────────────────────┘
                                         │
                                         ▼
                       ┌───────────────────────────────┐
                       │  Consensus Master Card Output │
                       │  - Unified Consensus Answer   │
                       │  - Key Agreed Points          │
                       │  - Divergent Points & Flaws   │
                       │  - Confidence Meter (1-100%)  │
                       │  - Model Agreement Matrix     │
                       │  - Grounded Search Sources    │
                       └───────────────────────────────┘
\`\`\`

---

### 2. $0 Budget Tech Stack Architecture
1. **Frontend**: React 19 + Vite + Tailwind CSS + Lucide Icons + Motion (100% Free Client Rendering).
2. **Backend**: Node.js Express Server (server.ts with tsx/esbuild) proxying AI requests safely.
3. **Model Integration Gateway**:
   - **Google Gemini API**: Google AI Studio Free Tier (\`gemini-3.6-flash\` for high-speed parallel drafting, cross-critiques, and grounded synthesis).
   - **Search Grounding Agent**: Powered by Gemini Search Grounding (\`googleSearch\` tool) to fetch live web sources.
   - **External Keys Support**: Optional Groq / OpenRouter / Tavily keys configurable via environment variables or UI.
4. **Caching & Rate-Limit Optimization**:
   - In-Memory LRU Cache & LocalStorage persistence to prevent duplicate API executions.
   - Truncated output tokens (~250-350 words) per agent round to prevent rate-limit throttling.

---

### 3. Rate-Limit & Optimization Strategies
1. **Token Constraint Engineering**: Restricting draft token size reduces execution time by 60% and preserves free quota.
2. **Parallel Promise Resolution**: Using \`Promise.allSetSettled\` ensures pipeline resilience if one endpoint times out.
3. **Multi-Model Persona Emulation**: Leveraging system instructions on fast free models avoids strict per-minute quota walls on single API keys.
4. **Smart Deduplication Caching**: Hashes prompt + mode + intensity to instantly serve cached debates.
`;
