import { createFileRoute } from "@tanstack/react-router";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Server-side route to handle visual AI analysis of the surface photo using GPT-4o-mini
export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // 1. Authenticate / Validate inputs
          const body = await request.json();
          const { imageUrl, surface } = body as { imageUrl: string; surface: string };

          if (!imageUrl || !surface) {
            return new Response(JSON.stringify({ error: "Chybí URL obrázku nebo typ povrchu." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (!process.env.OPENAI_API_KEY) {
            console.error("[API Analyze] Chybí OPENAI_API_KEY v prostředí serveru.");
            return new Response(
              JSON.stringify({ error: "Konfigurační chyba: OPENAI_API_KEY není nastavena." }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // 2. Call GPT-4o-mini vision model with a specialized prompt
          const systemPrompt = `Jsi specializovaný expert na čištění, sanaci a nano-ochranu stavebních povrchů pro firmu Nanofusion. 
Analyzuješ znečištěný povrch z fotografie a navrhuješ optimální řešení.

Tvým úkolem je reálně zhodnotit typ povrchu: "${surface}" a míru jeho znečištění z poskytnuté fotografie.

Vrátíš výhradně platný JSON objekt v tomto přesném formátu (v češtině):
{
  "score": (číslo od 1 do 10, kde 10 je dokonale čistý povrch bez chyb, a 1 je extrémně znečištěný/poškozený povrch s nutností okamžité sanace),
  "label": (jeden z textů: "Výborný" (skóre 9-10) | "Dobrý" (skóre 7-8) | "Průměrný" (skóre 5-6) | "Špatný" (skóre 3-4) | "Kritický" (skóre 1-2)),
  "breakdown": [
    (pole přesně 3 prvků vyjadřujících odhadované složení znečištění v procentech. Součet hodnot musí být přesně 100.
     Pro fasády/střechy typicky použij biologický nárůst (řasy/plísně), prach/saze, vodní kámen/výkvěty.
     Příklad pro breakdown položky):
    { "label": "Název znečištění", "value": 45, "color": "#xxxxxx" }
  ],
  "recommendations": [
    (pole 3 konkrétních doporučení v češtině, např. "Doporučujeme tlakové mytí s fungicidním přípravkem.", "Aplikace nanopovlaku Nanofusion zajistí ochranu na 5 let."...)
  ],
  "urgency": (jeden z textů určující naléhavost: "Doporučit ihned" | "Do 3 měsíců" | "Preventivní ošetření"),
  "improvementPercent": (číslo od 50 do 99 vyjadřující o kolik procent se zlepší vzhled po vyčištění a aplikaci nanopovlaku Nanofusion)
}

Pro breakdown položky barvy (color):
- Biologické nečistoty (mechy, řasy) = #86efac
- Prach, saze, atmosférická špína = #94a3b8
- Minerální usazeniny, výkvěty, vodní kámen = #93c5fd
- Jiné nečistoty = #cbd5e1

Piš stručně, odborně a důvěryhodně v češtině.`;

          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: systemPrompt },
                  {
                    type: "image_url",
                    image_url: {
                      url: imageUrl,
                    },
                  },
                ],
              },
            ],
            response_format: { type: "json_object" },
            max_tokens: 600,
            temperature: 0.2,
          });

          const contentText = response.choices[0]?.message?.content;
          if (!contentText) {
            throw new Error("OpenAI nevrátil žádný obsah.");
          }

          const parsedResult = JSON.parse(contentText);

          return new Response(JSON.stringify(parsedResult), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        } catch (error: any) {
          console.error("[API Analyze] Chyba:", error);
          return new Response(
            JSON.stringify({
              error: "Chyba při provádění AI analýzy.",
              details: error.message,
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
