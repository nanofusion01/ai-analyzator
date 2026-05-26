import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// This server-side route handles secure fetching of leads by the external admin panel.
export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // 1. Secure API Token Validation
        const authHeader = request.headers.get("Authorization");
        const secretToken = process.env.ADMIN_API_SECRET;

        if (!secretToken) {
          return new Response(
            JSON.stringify({
              error: "API error: ADMIN_API_SECRET environment variable is not configured on the server.",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        if (authHeader !== `Bearer ${secretToken}`) {
          return new Response(
            JSON.stringify({
              error: "Unauthorized: Invalid or missing secret token in Authorization header.",
            }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        // 2. Initialize Supabase Client with Service Role Key to bypass RLS for administrative access
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
          return new Response(
            JSON.stringify({
              error: "API error: Supabase environment variables are missing on the server.",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const adminSupabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        });

        // 3. Fetch all leads ordered by newest first
        const { data, error } = await adminSupabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("[API Leads] Supabase error:", error);
          return new Response(
            JSON.stringify({
              error: "Failed to fetch leads from database.",
              details: error.message,
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        // 4. Return leads data
        return new Response(
          JSON.stringify({
            count: data.length,
            leads: data,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store, max-age=0",
            },
          }
        );
      },
    },
  },
});
