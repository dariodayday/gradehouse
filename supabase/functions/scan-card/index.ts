// GradeHouse card scanner — identifies every card in a photo via Google Gemini
// (free tier). Secrets: GEMINI_API_KEY (set via `supabase secrets set`).
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CATS = [
  "hockey", "basketball", "baseball", "football", "golf", "soccer",
  "pokemon", "anime", "tcg", "comics", "coins", "toys", "sneakers", "watches",
];

const RESPONSE_SCHEMA = {
  type: "object",
  required: ["cards"],
  properties: {
    cards: {
      type: "array",
      items: {
        type: "object",
        required: ["title", "set_name", "cat", "grade", "price_estimate", "box"],
        properties: {
          title: { type: "string", description: "Player/character name and card name, e.g. 'Connor Bedard Rookie'" },
          set_name: { type: "string", description: "Set, year, and card number if visible" },
          cat: { type: "string", enum: CATS },
          grade: {
            type: "string",
            enum: ["10", "9", "8", "7", "raw"],
            description: "Grade from the slab label if graded, otherwise 'raw'",
          },
          price_estimate: { type: "integer", description: "Rough market value estimate in CAD" },
          box: {
            type: "object",
            required: ["x", "y", "w", "h"],
            description: "Bounding box of the card as fractions of image size (0-1)",
            properties: {
              x: { type: "number" }, y: { type: "number" },
              w: { type: "number" }, h: { type: "number" },
            },
          },
        },
      },
    },
  },
};

const PROMPT = `Find every distinct trading card, graded slab, or collectible visible in this image. It may be a single card, a graded slab, or a binder page with many cards.

For each one, identify it as precisely as you can (player/character, set, year, card number). If it's in a graded slab, read the grade from the label. Estimate a rough market value in CAD — be conservative, and use 0 if you truly can't tell. Give a tight bounding box for each card as fractions of the image dimensions (x, y = top-left corner; w, h = width and height; all between 0 and 1).

Only include actual cards/collectibles — skip binder edges, hands, table surfaces. If the image contains no cards, return an empty cards array.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // Require a signed-in GradeHouse user (keeps the free quota for real users)
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } },
    );
    const { data: { user } } = await supa.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Sign in to scan cards" }), {
        status: 401, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const { image, media_type } = await req.json();
    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const key = Deno.env.get("GEMINI_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "Scanner not configured yet" }), {
        status: 503, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const gemini = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: media_type || "image/jpeg", data: image } },
              { text: PROMPT },
            ],
          }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      },
    );

    if (!gemini.ok) {
      const detail = await gemini.text();
      console.error("Gemini error", gemini.status, detail.slice(0, 500));
      const friendly = gemini.status === 429
        ? "Scanner is busy (free quota) — wait a minute and try again"
        : "Scanner error — try again";
      return new Response(JSON.stringify({ error: friendly }), {
        status: 502, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const result = await gemini.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? '{"cards":[]}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { cards: [] };
    }
    if (!Array.isArray(parsed.cards)) parsed.cards = [];

    return new Response(JSON.stringify(parsed), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
