import { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Navbar } from "@/components/nanofusion/Navbar";
import { IntroView } from "@/components/nanofusion/IntroView";
import { LoadingView } from "@/components/nanofusion/LoadingView";
import { LeadGateView } from "@/components/nanofusion/LeadGateView";
import { ResultsView } from "@/components/nanofusion/ResultsView";
import { AppView, SurfaceType, AnalysisResult, LeadData } from "@/lib/types";
import { mockAnalysisResult } from "@/lib/mock-data";
import { track } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [view, setView] = useState<AppView>("intro");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [surface, setSurface] = useState<SurfaceType | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  useEffect(() => {
    track("page_view");
  }, []);

  const handleFileSelect = useCallback((file: File, preview: string) => {
    setPreviewUrl(preview);
  }, []);

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    setSurface(null);
  }, []);

  const handleSurfaceSelect = useCallback((s: SurfaceType) => {
    setSurface(s);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!previewUrl || !surface) {
      toast.error("Vyberte fotografii a typ povrchu.");
      return;
    }

    track("analysis_started");
    setAnalysisResult(null);
    setAnalysisDone(false);
    setAnalysisId(crypto.randomUUID());
    setView("loading");

    // Simulate API call with mock data (backend not wired yet)
    setTimeout(() => {
      const result = { ...mockAnalysisResult, isMock: true };
      setAnalysisResult(result);
      setAnalysisDone(true);
      track("analysis_complete", { score: result.score, isMock: true });
    }, 2000);
  }, [previewUrl, surface]);

  const handleLoadingComplete = useCallback(() => {
    setView("lead");
  }, []);

  const handleLeadSubmit = useCallback((data: LeadData) => {
    setLeadData(data);
    setView("results");

    // Submit lead asynchronously to Supabase Database
    supabase
      .from("leads")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email,
        property_type: data.propertyType,
        surface: surface ?? null,
        score: analysisResult?.score ?? null,
        label: analysisResult?.label ?? null,
        urgency: analysisResult?.urgency ?? null,
        source: "analyzer",
      })
      .then(({ error }) => {
        if (error) console.error("lead insert failed", error);
      });
  }, [surface, analysisResult]);

  const handleRestart = useCallback(() => {
    setView("intro");
    setPreviewUrl(null);
    setSurface(null);
    setAnalysisResult(null);
    setAnalysisDone(false);
    setAnalysisId(null);
    setLeadData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ display: view === "intro" ? "block" : "none" }}>
        <IntroView
          previewUrl={previewUrl}
          surface={surface}
          onFileSelect={handleFileSelect}
          onClear={handleClear}
          onSurfaceSelect={handleSurfaceSelect}
          onAnalyze={handleAnalyze}
        />
      </div>

      <div style={{ display: view === "loading" ? "block" : "none" }}>
        <LoadingView onComplete={handleLoadingComplete} apiDone={analysisDone} isActive={view === "loading"} />
      </div>

      <div style={{ display: view === "lead" ? "block" : "none" }}>
        <LeadGateView onSubmit={handleLeadSubmit} />
      </div>

      <div style={{ display: view === "results" ? "block" : "none" }}>
        {analysisResult && previewUrl && surface ? (
          <ResultsView
            imageUrl={previewUrl}
            surface={surface}
            analysis={analysisResult}
            leadName={leadData?.name ?? ""}
            leadPhone={leadData?.phone ?? ""}
            leadEmail={leadData?.email ?? ""}
            onRestart={handleRestart}
          />
        ) : null}
      </div>
    </div>
  );
}
