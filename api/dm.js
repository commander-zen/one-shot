const SYSTEM_PROMPT = `You are the Dungeon Master for Lost Mine of Phandelver, running the 2024 D&D rules (5.5e). You control all NPCs, monsters, and the world. The player controls only their character.

You narrate strictly from the adventure as written. You never invent locations, NPCs, or plot points not in the module. You describe what the character sees, hears, and experiences — never what they think or feel.

Keep narration to 3-4 punchy sentences. Name-drop the player character. Make them feel like the hero.

You must ALWAYS respond with valid JSON in exactly this shape:
{
  "narration": "string",
  "mechanicalEvents": [ { "type": "damage|heal|status|xp|item", "description": "string", "value": 0 } ],
  "newCharacterState": { "currentHp": 0, "spellSlotsUsed": 0, "conditions": [] },
  "newCampaignState": { "areaId": "string", "questFlags": {}, "visitedAreas": [] },
  "availableActions": [ "string" ]
}

For combat encounters, availableActions must include relevant attack/spell options for the character's class and current resources. For exploration, offer movement and investigation options. Always include at least one cautious option and one bold option.

Adjudicate all dice rolls yourself. Apply 2024 rules: Advantage/Disadvantage cancel, Exhaustion is one level per failed death save, spell save DC = 8 + proficiency + spellcasting modifier.

Never break character. Never explain the rules unprompted. The info button on the frontend handles rule explanations — you just play.`;

const FALLBACK_ACTIONS = ['Look Around', 'Move On', 'Check Character', 'Rest'];

function extractAreaText(area) {
  for (const e of (area?.entries || [])) {
    if (typeof e === 'string') return e;
    if (e?.entries) {
      for (const sub of e.entries) {
        if (typeof sub === 'string') return sub;
      }
    }
  }
  return '';
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { playerAction, area, character, campaignState, history = [] } = req.body;

  const char = character || {};
  const areaText = extractAreaText(area);
  const userMessage = [
    `Area: ${area?.name || 'Unknown'}`,
    areaText ? `\n${areaText}` : '',
    `\nCharacter: ${char.name || 'Unknown'}, ${char.cls || 'Unknown'}, Level ${char.level || 1}, HP ${char.currentHp ?? char.maxHp ?? '?'}/${char.maxHp || '?'}`,
    `\nPlayer action: ${playerAction}`,
  ].join('');

  const messages = [
    ...history,
    { role: 'user', content: userMessage },
  ];

  const fallback = {
    narration: 'The DM pauses, gathering thoughts. The world holds its breath.',
    mechanicalEvents: [],
    newCharacterState: {
      currentHp: char.currentHp ?? char.maxHp ?? 10,
      spellSlotsUsed: 0,
      conditions: [],
    },
    newCampaignState: campaignState || {},
    availableActions: FALLBACK_ACTIONS,
  };

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1500,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!groqRes.ok) return res.status(200).json(fallback);

    const data = await groqRes.json();
    let raw = data.choices[0].message.content;

    // Strip markdown fences if present
    raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    try {
      const parsed = JSON.parse(raw);
      return res.status(200).json(parsed);
    } catch(e) {
      console.error('DM JSON parse failed:', e.message, '| Raw:', raw.slice(0, 200));
      return res.status(200).json(fallback);
    }
  } catch(err) {
    console.error('DM fetch error:', err.message);
    return res.status(200).json(fallback);
  }
};
