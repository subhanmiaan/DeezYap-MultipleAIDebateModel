export interface PresetPrompt {
  id: string;
  category: 'Tech & Architecture' | 'AI & Future' | 'Business & Economics' | 'Science & Philosophy';
  title: string;
  prompt: string;
  mode: 'balanced' | 'technical' | 'factcheck' | 'creative';
  icon: string;
}

export const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: '1',
    category: 'Tech & Architecture',
    title: 'Monolith vs Microservices',
    prompt: 'When building a modern web application scaling to 100k daily users, should a start-up choose a modular monolith or microservices architecture? Weigh engineering velocity, cloud costs, and complexity.',
    mode: 'technical',
    icon: '🏗️'
  },
  {
    id: '2',
    category: 'AI & Future',
    title: 'AGI Timeline & Alignment Safety',
    prompt: 'Will Artificial General Intelligence (AGI) be achieved before 2030? What are the biggest technological bottlenecks (compute, data limits, energy, architecture) and safety concerns?',
    mode: 'balanced',
    icon: '🔮'
  },
  {
    id: '3',
    category: 'Business & Economics',
    title: 'Universal Basic Income & AI Automation',
    prompt: 'As AI and humanoid robotics automate knowledge work and physical manufacturing, is Universal Basic Income (UBI) economically sustainable or inflationary? Provide concrete evidence and counter-arguments.',
    mode: 'factcheck',
    icon: '💎'
  },
  {
    id: '4',
    category: 'Tech & Architecture',
    title: 'SQL vs NoSQL Databases in 2026',
    prompt: 'Are traditional relational SQL databases (PostgreSQL) now capable of replacing Document/NoSQL databases for almost all startup use cases, or do document stores still hold a core performance advantage?',
    mode: 'technical',
    icon: '⚡'
  },
  {
    id: '5',
    category: 'Science & Philosophy',
    title: 'Is Quantum Computing Overhyped?',
    prompt: 'What are the realistic timelines for practical quantum supremacy in cryptography and drug discovery vs commercial marketing hype? Point out key hardware error-correction hurdles.',
    mode: 'factcheck',
    icon: '🔬'
  },
  {
    id: '6',
    category: 'Business & Economics',
    title: 'Remote vs In-Office Work Productivity',
    prompt: 'Does fully remote work reduce innovation and mentorship compared to hybrid or in-office setups? Evaluate long-term productivity data, retention, and corporate culture.',
    mode: 'balanced',
    icon: '💼'
  }
];
