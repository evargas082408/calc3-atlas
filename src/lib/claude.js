// Optional: free-form answers from Claude with the student's own API key, straight from the browser.
// The key stays in this browser's localStorage and is sent only to api.anthropic.com.

const SYSTEM = `You are a patient tutor for Purdue MA 261 (multivariate calculus, Spring 2026, Sunkula).
Explain at the level of a student studying for an exam: say what each symbol means, why each step is taken, and what the picture looks like in 3D.
Use $...$ for inline math and $$...$$ for displayed math (KaTeX). Keep it under about 350 words unless the question needs a full worked solution.
When it helps, end with one short "Exam trap" line naming the most common mistake on this kind of problem.`;

export async function askClaude({ apiKey, model, question, context, onText }) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
  const stream = client.beta.messages.stream({
    model: model || 'claude-opus-5-5',
    max_tokens: 4000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: 'medium' },
    system: SYSTEM,
    messages: [{ role: 'user', content: context ? `${context}\n\nQuestion: ${question}` : question }],
  });
  stream.on('text', (delta) => onText?.(delta));
  const message = await stream.finalMessage();
  if (message.stop_reason === 'refusal') {
    throw new Error('Claude declined to answer this one. Try rephrasing it as a math question.');
  }
  return message;
}

export async function describeError(err) {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  if (err instanceof Anthropic.AuthenticationError) return 'That API key was rejected. Check it in Settings.';
  if (err instanceof Anthropic.RateLimitError) return 'Rate limited. Wait a moment and ask again.';
  if (err instanceof Anthropic.APIConnectionError) return "Couldn't reach the API. Check your connection.";
  if (err instanceof Anthropic.APIError) return `API error ${err.status}: ${err.message}`;
  return err?.message ?? String(err);
}
