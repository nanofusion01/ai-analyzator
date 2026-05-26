
-- Leads from analysis flow
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  property_type TEXT,
  surface TEXT,
  score NUMERIC,
  label TEXT,
  description TEXT,
  timeline TEXT,
  image_url TEXT,
  location TEXT,
  urgency TEXT,
  source TEXT DEFAULT 'analyzer',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (anon) can submit a lead from the landing page
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated (admin) users can read/update/delete
CREATE POLICY "Authenticated can read leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (true);

-- Editable site settings (counts, accuracy, nano tips, texts)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can upsert site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Seed default values
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_stats', '{"analyses": "2 847", "accuracy": "98 %"}'::jsonb),
  ('nano_tips', '["Nanopovlak Nanofusion prodlouží životnost povrchu o 3–5 let.", "Analýza využívá srovnání s 2 800+ referenčními fotografiemi.", "Doporučení vychází z typu povrchu a klimatických podmínek ČR.", "Po ošetření odpuzuje povrch vodu, mastnotu i biologický nárůst."]'::jsonb);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
