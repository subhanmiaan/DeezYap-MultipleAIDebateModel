<div align="center">

# DeezYap ⚡ AI Consensus Hub

**Explore a question through parallel drafts, cross-critique and a synthesized answer.**

React · TypeScript · Express · Gemini · Optional Groq & DeepSeek

[How it works](#how-it-works) · [Model routing](#model-routing) · [Setup](#local-setup) · [Limitations](#limitations)

</div>

## Overview

DeezYap is a multi-agent debate experiment. It runs several agent perspectives, optionally cross-critiques their answers, synthesizes a consensus, and performs a separate judging pass. The interface presents agreement, divergence and model-generated evaluation scores.

The current repository uses **React 19, Vite, TypeScript, Tailwind CSS and an Express backend**. It is not the earlier Next.js/Supabase architecture described in some project summaries.

## How it works

1. **Draft:** generate independent agent responses in parallel.
2. **Critique:** in Deep mode, compare and challenge the drafts; Fast mode skips this stage.
3. **Synthesize:** produce a combined answer, agreed points, differences and alignment scores.
4. **Evaluate:** run a separate judge pass to assess agent contributions.

The application supports balanced, technical, fact-check and creative modes. Search grounding is collected during the search agent’s draft and carried into the synthesis output.

## Model routing

Agent names in the interface do not always mean a direct call to the named provider.

| Agent | Current implementation |
|---|---|
| Llama | Groq API when a key is configured; draft fallback can use a Gemini persona |
| DeepSeek | Official DeepSeek chat API when a key is configured; draft fallback can use a Gemini persona |
| Search / Perplexity-style agent | Gemini with Google Search grounding; not a direct Perplexity API integration |
| ChatGPT-style agent | A Gemini-powered persona; not the OpenAI API |
| Claude-style agent | A Gemini-powered persona; not the Anthropic API |

Provider errors may also produce generic fallback content. Read the limitations below before interpreting a result.

## Local setup

Use a Node.js version compatible with the versions in `package.json`. Configure a Gemini API key; Groq and DeepSeek keys are optional. Provider pricing, quotas and model availability are external requirements—this project does not guarantee free access.

```bash
git clone https://github.com/subhanmiaan/DeezYap-MultipleAIDebateModel.git
cd DeezYap-MultipleAIDebateModel
npm install
```

Create an untracked `.env` file at the repository root:

```dotenv
GEMINI_API_KEY=replace_with_your_key
GROQ_API_KEY=optional_key
DEEPSEEK_API_KEY=optional_key
```

```bash
npm run dev
```

Open **http://localhost:3000**. The server binds to `0.0.0.0`, but localhost is the address to use in your browser.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Express with Vite development middleware |
| `npm run build` | Build the Vite frontend and bundle the Node server |
| `npm run start` | Run the compiled server |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run preview` | Preview the Vite frontend only; not a replacement for the API server |

For a production-mode local run on macOS/Linux:

```bash
npm run build
NODE_ENV=production npm run start
```

PowerShell:

```powershell
npm run build
$env:NODE_ENV = "production"
npm run start
```

## Architecture

| Location | Responsibility |
|---|---|
| `server.ts` | Express server, API routes and frontend serving |
| `server/orchestrator.ts` | Provider calls, cache, drafting, critique, synthesis and evaluation |
| `src/App.tsx` | Application state and debate experience |
| `src/components/` | Interface components |
| `src/services/debateService.ts` | Client-to-server debate requests |
| `src/data/agents.ts` | Agent configuration and personas |
| `src/types.ts` | Shared TypeScript types |

The Express server exposes `/api/health`, `/api/debate` and `/api/cache/clear`. The implementation uses an in-memory debate cache; it is not a durable database.

## Limitations

- **Consensus is not verification.** Generated confidence and alignment scores are model judgments, not calibrated probabilities or benchmarks.
- The code clamps some scores and supplies generic fallback answers when calls fail. An apparently complete result does not prove all providers succeeded.
- The critique metadata uses heuristics and fallback values; do not treat it as a measured agreement statistic.
- The in-memory cache key uses the prompt, mode and intensity. It does not isolate results by user or configured provider keys and should be reviewed before multi-user deployment.
- Model identifiers are defined in the orchestrator. Verify their availability with your provider before running.
- Local browser history and the server cache serve different purposes; neither is a production account system.
- This repository needs runtime, access-control and provider-behavior review before public production deployment. This README refresh did not execute live AI calls.

Keep API keys out of source control. Prompts are sent to the configured external AI providers; avoid entering confidential data without reviewing those providers and the application’s handling.

---

Built by [**Muhammad Subhan**](https://github.com/subhanmiaan) · [Contact](mailto:wsubhan5969@gmail.com)
