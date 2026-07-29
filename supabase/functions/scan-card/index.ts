// GradeHouse card scanner — identifies every card in a photo via Claude vision.
// Secrets: ANTHROPIC_API_KEY (set via `supabase secrets set`).
import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CATS = [
  "hockey", "basketball", "baseball", "football", "golf", "soccer",
  "pokemon", "anime", "tcg", "comics", "coins", "toys", "sneakers", "watches",
];

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["cards"],
  properties: {
    cards: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "set_name", "cat", "grade", "price_estimate", "box"],
        properties: {
          title: { type: "string", description: "Player/character name and card name, e.g. 'Connor Bedard Rookie'" },
          set_name: { type: "string", description: "Set, year, and card number if visible, e.g. '2023 Upper Deck Young Guns #451'" },
          cat: { type: "string", enum: CATS },
          grade: {
            type: "string",
            enum: ["10", "9", "8", "7", "raw"],
            description: "Grade from the slab label if the card is in a graded case, otherwise 'raw'",
          },
          price_estimate: { type: "integer", description: "Rough market value estimate in CAD" },
          box: {
            type: "object",
            additionalProperties: false,
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

For each one, identify it as precisely as you can (player/character, set, year, card number). If it's in a graded slab, read the grade from the label. Estimate a rough market value in CAD — be conservative, and use 0 if you truly can't tell. Give a tight bounding box for each card as fractions of the image dimensions.

Only include actual cards/collectibles — skip binder edges, hands, table surfaces. If the image contains no cards, return an empty array.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // Require a signed-in GradeHouse user (keeps API costs from being burned anonymously)
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

    const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") });
    const response = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 4096,
      output_config: { format: { type: "json_schema", schema: SCHEMA } },
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: media_type || "image/jpeg", data: image } },
          { type: "text", text: PROMPT },
        ],
      }],
    });

    const text = response.content.find((b) => b.type === "text")?.text ?? '{"cards":[]}';
    return new Response(text, {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message ?? err) }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
