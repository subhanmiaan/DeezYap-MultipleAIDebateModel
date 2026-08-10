<<<<<<< HEAD
# ⚡ DeezYap — Multi-Agent AI Consensus Hub

**DeezYap** debates your question across multiple AI models in parallel, has them cross-critique each other, then synthesizes a single, judged consensus answer — instead of trusting any one model's first response.

Built with React, TypeScript, Express, and the Gemini API, with real free-tier Groq and DeepSeek integration.

---

## ✨ Features

- **Parallel multi-agent drafting** — ChatGPT, Claude, Llama 3.3, DeepSeek, and a live-search-grounded Perplexity-style agent all answer your prompt independently.
- **Cross-critique round** (Deep mode) — agents review and challenge each other's positions before a final answer is formed.
- **Synthesized master consensus** — a dedicated judge pass merges everything into one answer, with explicit agreed points and points of divergence.
- **Independent Judge Verdict** — a separate, impartial scoring pass rates each agent's contribution 0–100 with specific feedback, so you can see who actually helped.
- **Agreement Matrix** — visual breakdown of how closely each model's answer aligned with the final consensus.
- **Real-time web grounding** — the Perplexity-style agent uses live Google Search grounding, with sources shown and cited.
- **Debate modes** — Balanced, Technical, Fact Check, and Creative, each shifting how agents are prompted.
- **Fast vs Deep intensity** — skip the critique round for quick answers, or run the full debate for higher-confidence results.
- **Debate history** — past debates are saved locally in your browser and revisitable from the sidebar.

## 🧠 How It Works

```
Your Prompt
    │
    ▼
┌─────────────────────────────────────────────┐
│ Step 1 — Parallel Draft Generation           │
│ Each agent answers independently             │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│ Step 2 — Cross-Critique (Deep mode only)     │
│ Agents review and challenge each other       │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│ Step 3 — Synthesis                           │
│ Chief Judge merges everything into one       │
│ consensus answer + agreement matrix          │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│ Step 4 — Independent Judge Evaluation        │
│ A separate pass scores each agent 0–100      │
└─────────────────────────────────────────────┘
```

### Which agents are "real" vs simulated?

| Agent | Backend | Notes |
|---|---|---|
| 🐋 DeepSeek R1 / V3 | **Real** (with key) | Calls DeepSeek's official API directly. Falls back to a Gemini-simulated persona if no key is set. |
| ⚡ Groq / Llama 3.3 70B | **Real** (with key) | Calls Groq's free-tier API directly. Falls back to a Gemini-simulated persona if no key is set. |
| 🔍 Perplexity Search Agent | **Real** | Uses Gemini with live Google Search grounding — genuinely fetches current web sources. |
| 🤖 ChatGPT (GPT-4o) | Simulated | OpenAI has no free API tier, so this persona runs on Gemini with a GPT-4o-style system prompt. |
| 🧠 Claude 3.5 Sonnet | Simulated | Anthropic has no free API tier, so this persona runs on Gemini with a Claude-style system prompt. |

This is stated plainly in-app too (API Keys modal) — no agent pretends to be something it isn't without disclosure.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite
- **Backend:** Express (wrapping Vite as middleware), TypeScript, `tsx`
- **AI:** Google Gemini API (`@google/genai`), Groq API, DeepSeek API

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A free [Google Gemini API key](https://aistudio.google.com/app/apikey) (required)
- Optional: a free [Groq API key](https://console.groq.com/keys) for real Llama 3.3 70B
- Optional: a free [DeepSeek API key](https://platform.deepseek.com/) (5M token trial, no card) for real DeepSeek

### Installation

```bash
git clone https://github.com/subhanmiaan/deezyap.git
cd deezyap
npm install
```

### Configuration

Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

```env
GEMINI_API_KEY=your_gemini_key_here

# Optional — enables real (non-simulated) agents:
GROQ_API_KEY=your_groq_key_here
DEEPSEEK_API_KEY=your_deepseek_key_here
```

> Groq and DeepSeek keys can also be entered directly in the app's **API Keys** modal instead of `.env` — useful if you're deploying somewhere you can't set server env vars.

### Run locally

```bash
npm run dev
```

Then open **http://localhost:3000**.

> ⚠️ Use `localhost:3000`, not `0.0.0.0:3000` — the latter is a bind address, not a browsable URL.

## 📁 Project Structure

```
.
├── server.ts                 # Express entry point (wraps Vite middleware, hosts /api routes)
├── server/
│   └── orchestrator.ts       # Core debate pipeline: drafts → critiques → synthesis → judge
├── src/
│   ├── App.tsx                # Root component, debate state & progress tracking
│   ├── components/            # UI components (chat, tabs, modals, cards)
│   ├── services/
│   │   └── debateService.ts   # Client → /api/debate bridge
│   ├── data/
│   │   └── agents.ts          # Agent personas, avatars, colors
│   └── types.ts                # Shared TypeScript types
└── .env.example
```

## 🔒 Security Note

Never commit your `.env` file — it's already excluded via `.gitignore`. If you ever paste an API key into a chat, commit, or screenshot by mistake, revoke and regenerate it immediately from the provider's dashboard.

## 📄 License

MIT — feel free to fork and adapt.

---

<div align="center">
Built by <a href="https://github.com/subhanmiaan">@subhanmiaan</a>
</div>
=======
# DeezYap-MultipleAIDebateModel
Multi-agent AI consensus engine — debates your prompt across Gemini, real Groq Llama 3.3, and DeepSeek in parallel, cross-critiques, then synthesizes a judged verdict.
>>>>>>> 54c78ff0b9496bbf033deb190f772775e5fb01e4
