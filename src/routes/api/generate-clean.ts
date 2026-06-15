import { createFileRoute } from "@tanstack/react-router";
import OpenAI, { toFile } from "openai";

// Server-side route to generate a "cleaned" version of the surface photo using OpenAI Image Edit API
export const Route = createFileRoute("/api/generate-clean")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { imageUrl, surface } = body as { imageUrl: string; surface: string };

          if (!imageUrl) {
            return new Response(JSON.stringify({ error: "Chybí URL obrázku." }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const apiKey = process.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: "Konfigurační chyba: OPENAI_API_KEY není nastavena." }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          const openai = new OpenAI({ apiKey });

          // 1. Download the original image from Supabase URL
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) {
            throw new Error(`Nepodařilo se stáhnout obrázek: ${imageResponse.statusText}`);
          }
          const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

          // 2. Convert to a File object for the OpenAI API
          const imageFile = await toFile(imageBuffer, "surface.png", { type: "image/png" });

          const surfaceLabel = surface || "stavební povrch";

          const prompt = `This is a photograph of a dirty ${surfaceLabel}. Subtly clean it: remove only the visible contamination — dirt, algae, moss, mold, soot, dark stains, water marks, and discoloration. Reveal the original building material color underneath. Do NOT repaint, recolor, or change the material of the facade. Do NOT add new colors or make it look freshly painted. The result should look like a real photograph of a pressure-washed surface, not a 3D render. Preserve the exact same composition, camera angle, lighting, shadows, perspective, windows, doors, roof, surroundings, and all architectural details. The cleaning effect should be realistic and subtle, not dramatic.`;

          // 3. Use OpenAI Image Edit API — this edits the EXISTING photo
          const response = await openai.images.edit({
            model: "gpt-image-1",
            image: imageFile,
            prompt: prompt,
            size: "1024x1024",
            quality: "low",
          });

          const imageData = response.data?.[0];

          if (!imageData || !imageData.b64_json) {
            throw new Error("OpenAI nevrátil žádný obrázek.");
          }

          const dataUrl = `data:image/png;base64,${imageData.b64_json}`;

          return new Response(JSON.stringify({ cleanedImageUrl: dataUrl }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        } catch (error: any) {
          console.error("[API Generate Clean] Chyba:", error);
          return new Response(
            JSON.stringify({
              error: "Chyba při generování vyčištěného obrázku.",
              details: error.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
