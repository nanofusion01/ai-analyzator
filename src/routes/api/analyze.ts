import { createFileRoute } from "@tanstack/react-router";
import OpenAI from "openai";

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

          const apiKey = process.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
          if (!apiKey) {
            console.error("[API Analyze] Chybí OPENAI_API_KEY v prostředí serveru.");
            return new Response(
              JSON.stringify({ error: "Konfigurační chyba: OPENAI_API_KEY není nastavena." }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const openai = new OpenAI({ apiKey });

          // 2. Call GPT-4o-mini vision model with a specialized prompt
          const systemPrompt = `Jsi certifikovaný odborník na diagnostiku a sanaci stavebních povrchů s 15letou praxí v oboru. Spolupracuješ s firmou Nanofusion, která se specializuje na profesionální čištění, impregnace a nano-ochranu povrchů.

Tvým úkolem je provést odbornou vizuální diagnostiku povrchu z přiložené fotografie a vypracovat realistický, konkrétní a důvěryhodný posudek.

Parametry analýzy:
- Typ povrchu: "${surface}"

HODNOTÍCÍ STUPNICE (dodržuj přísně):
* Skóre 1-2 (Štítek: "Kritický"): Extrémní degradace — více než 70 % plochy pokryto souvislým biologickým nárůstem (mech, řasy, plísně), hlubokými sazovými usazeninami nebo viditelným narušením povrchové struktury materiálu. Naléhavost: "Doporučit ihned".
* Skóre 3-4 (Štítek: "Špatný"): Pokročilé znečištění na 30–70 % plochy. Výrazné tmavé mapy, plošný výskyt řas/plísní, silné atmosférické usazeniny nebo vodní výkvěty. Materiál je vizuálně degradován. Naléhavost: "Doporučit ihned".
* Skóre 5-6 (Štítek: "Průměrný"): Střední znečištění na 10–30 % plochy. Lokální biologický nárůst (zejména v zastíněných partiích, spárách, pod parapety), mírné zašednutí od prachu a smogu. Naléhavost: "Do 3 měsíců".
* Skóre 7-8 (Štítek: "Dobrý"): Lehké znečištění pod 10 % plochy. Drobné prachové usazeniny, lokální zašlost, počáteční stopy mikroorganismů. Naléhavost: "Preventivní ošetření".
* Skóre 9-10 (Štítek: "Výborný"): Povrch v téměř ideálním stavu. Minimální prachové usazeniny, žádné biologické nárůsty. Naléhavost: "Preventivní ošetření".

PRAVIDLA PRO KONZISTENCI:
1. Doporučení (recommendations) musí být KONKRÉTNÍ a ODBORNÁ — zmiňuj skutečné postupy:
   - U biologického znečištění: "Aplikace biocidního přípravku NanoClean Bio pro likvidaci kořenového systému mikroorganismů, následné šetrné tlakové čištění (80–120 bar)."
   - U atmosférické špíny/sazí: "Hloubkové tlakové čištění horkou vodou (100–150 bar) s alkalickým čisticím prostředkem pro rozpuštění organických usazenin."
   - U minerálních výkvětů: "Chemické ošetření kyselým čističem pro rozpuštění vápenných a solných výkvětů, následný oplach čistou vodou."
   - Vždy jako poslední doporučení uveď ochranu: "Aplikace hydrofobní nano-impregnace Nanofusion NanoShield pro dlouhodobou ochranu (životnost 5–8 let), samočisticí efekt a prevenci opětovného uchycení nečistot."
   - U čistého povrchu (skóre 8+): doporuč pouze preventivní nano-ochranu.
2. Složení znečištění (breakdown) musí přesně odpovídat vizuální analýze. Pokud na fotce vidíš zelené/tmavé skvrny, přiřaď vysoké procento biologickým nečistotám. Pokud je povrch rovnoměrně zašedlý, přiřaď vysoké procento atmosférickému znečištění. Součet musí být přesně 100 %.
3. Naléhavost a štítek musí logicky korespondovat se skóre.

Vrátíš VÝHRADNĚ platný JSON (bez komentářů, bez markdown):
{
  "score": (číslo 1–10),
  "label": ("Výborný" | "Dobrý" | "Průměrný" | "Špatný" | "Kritický"),
  "breakdown": [
    {"label": "(konkrétní název typu znečištění, např. 'Řasy a mechy', 'Atmosférické usazeniny', 'Minerální výkvěty')", "value": (číslo), "color": "(#86efac pro biologické, #94a3b8 pro prach/saze, #93c5fd pro minerální, #cbd5e1 pro jiné)"},
    {"label": "...", "value": ..., "color": "..."},
    {"label": "...", "value": ..., "color": "..."}
  ],
  "recommendations": [
    "(1. konkrétní postup čištění s uvedením metody a parametrů)",
    "(2. druhý krok ošetření)",
    "(3. závěrečná ochrana — vždy zmínit Nanofusion nano-impregnaci)"
  ],
  "urgency": ("Doporučit ihned" | "Do 3 měsíců" | "Preventivní ošetření"),
  "improvementPercent": (číslo 40–95 — realistický odhad vizuálního zlepšení. Silně znečištěný povrch = 80–95 %, mírně znečištěný = 55–75 %, téměř čistý = 40–55 %)
}

Piš stručně, odborně, konkrétně. Používej českou odbornou terminologii.`;

          const model = process.env.OPENAI_MODEL || "gpt-4o";

          const response = await openai.chat.completions.create({
            model: model,
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
