const CHARACTER_SYSTEM_PROMPT = `You are an expert D&D 5e character builder. Given a player's vibe or backstory description, generate a complete RPGBOT-optimal Level 1 character for the Phandelver and Below: The Shattered Obelisk adventure. Choose the best class, species, background, ability score array assignment (from Standard Array: 15,14,13,12,10,8), skill proficiencies, and spells (if applicable) to maximize effectiveness while fitting the vibe. Return ONLY valid JSON, no preamble, no markdown, in this exact shape: { "name": "...", "class": "...", "species": "...", "background": "...", "scores": { "STR": 0, "DEX": 0, "CON": 0, "INT": 0, "WIS": 0, "CHA": 0 }, "skills": ["..."], "spells": ["..."], "vibeTagline": "...", "whyThisWorks": "..." }`;

const VALID_CLASSES = ['Artificer','Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard'];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { vibe } = req.body;
  if (!vibe || !vibe.trim()) return res.status(400).json({ error: 'Vibe is required' });

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 800,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: CHARACTER_SYSTEM_PROMPT },
          { role: 'user', content: vibe.trim() },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq character error:', groqRes.status, errText.slice(0, 200));
      return res.status(502).json({ error: 'Character generator unavailable' });
    }

    const data = await groqRes.json();
    let raw = data.choices[0].message.content;

    // Strip markdown fences if present
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    const parsed = JSON.parse(raw);

    // Normalize class name capitalization
    if (parsed.class) {
      const match = VALID_CLASSES.find(c => c.toLowerCase() === parsed.class.toLowerCase());
      if (match) parsed.class = match;
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Character generation error:', err.message);
    return res.status(500).json({ error: 'Character generation failed' });
  }
};
