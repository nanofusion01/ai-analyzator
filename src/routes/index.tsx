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
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    track("page_view");
  }, []);

  const handleFileSelect = useCallback((file: File, preview: string) => {
    setPreviewUrl(preview);
    setSelectedFile(file);
  }, []);

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    setSurface(null);
    setSelectedFile(null);
    setUploadedPhotoUrl(null);
    setLeadId(null);
  }, []);

  const handleSurfaceSelect = useCallback((s: SurfaceType) => {
    setSurface(s);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!previewUrl || !surface || !selectedFile) {
      toast.error("Vyberte fotografii a typ povrchu.");
      return;
    }

    track("analysis_started");
    setAnalysisResult(null);
    setAnalysisDone(false);
    setView("loading");

    try {
      // 1. Upload photo to Supabase Storage bucket 'surface-images'
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("surface-images")
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("surface-images")
        .getPublicUrl(fileName);

      setUploadedPhotoUrl(publicUrl);

      // 3. Trigger visual AI analysis on the server using GPT-4o-mini
      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: publicUrl,
          surface: surface,
        }),
      });

      if (!analyzeResponse.ok) {
        const errData = await analyzeResponse.json();
        throw new Error(
          errData.details 
            ? `${errData.error} (${errData.details})` 
            : (errData.error || "Chyba při komunikaci s AI serverem.")
        );
      }

      const result = await analyzeResponse.json();
      setAnalysisResult(result);
      setAnalysisDone(true);
      track("analysis_complete", { score: result.score, isMock: false });

    } catch (err: any) {
      console.error("[Storage Upload] Error:", err);
      toast.error("Nahrávání snímku selhalo: " + err.message);
      setView("intro");
    }
  }, [previewUrl, surface, selectedFile]);

  const handleLoadingComplete = useCallback(() => {
    setView("lead");
  }, []);

  const handleLeadSubmit = useCallback(async (data: LeadData) => {
    setLeadData(data);
    setView("results");

    // Map urgency level to the client's schema: "nízká" | "střední" | "vysoká"
    const urgencyMapping: Record<string, string> = {
      "Doporučit ihned": "vysoká",
      "Do 3 měsíců": "střední",
      "Preventivní ošetření": "nízká",
    };
    const mappedUrgency = urgencyMapping[analysisResult?.urgency ?? ""] || "střední";

    // Format analysis result as a structured text block for the admin panel's text window
    const serializedAnalysis = analysisResult
      ? `Skóre znečištění: ${analysisResult.score}/10 (${analysisResult.label})
Odhadované zlepšení: ${analysisResult.improvementPercent}%

Složení znečištění:
${analysisResult.breakdown.map((b) => `- ${b.label}: ${b.value}%`).join("\n")}

Doporučení:
${analysisResult.recommendations.map((r) => `- ${r}`).join("\n")}`
      : "";

    const leadPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      object_type: data.propertyType || null,
      analysis_type: surface || null,
      urgency: mappedUrgency,
      original_photo_url: uploadedPhotoUrl || "",
      before_photo_url: uploadedPhotoUrl || null,
      after_photo_url: uploadedPhotoUrl || null, // Will represent cleaned state in visualization
      analysis_result: serializedAnalysis,
      status: "new",
    };

    const { data: inserted, error } = await supabase
      .from("leads")
      .insert(leadPayload)
      .select("id")
      .single();

    if (error) {
      console.error("[Leads Database] Insert error:", error);
      toast.error("Uložení kontaktu selhalo: " + error.message);
    } else if (inserted) {
      setLeadId(inserted.id);
    }
  }, [surface, analysisResult, uploadedPhotoUrl]);

  const handleRestart = useCallback(() => {
    setView("intro");
    setPreviewUrl(null);
    setSurface(null);
    setAnalysisResult(null);
    setAnalysisDone(false);
    setLeadData(null);
    setSelectedFile(null);
    setUploadedPhotoUrl(null);
    setLeadId(null);
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
            leadId={leadId}
            onRestart={handleRestart}
          />
        ) : null}
      </div>
    </div>
  );
}
