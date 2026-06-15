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

function compressImage(file: File, maxW: number = 1200, maxH: number = 1200): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxW) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          }
        } else {
          if (h > maxH) {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

function Index() {
  const [view, setView] = useState<AppView>("intro");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [surface, setSurface] = useState<SurfaceType | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [cleanedImageUrl, setCleanedImageUrl] = useState<string | null>(null);
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
      // Compress the image before uploading to avoid timeouts on slower networks
      let fileToUpload = selectedFile;
      try {
        fileToUpload = await compressImage(selectedFile);
      } catch (compressErr) {
        console.warn("Client-side compression failed, uploading original:", compressErr);
      }

      // 1. Upload photo to Supabase Storage bucket 'surface-images'
      const fileExt = fileToUpload.name.split(".").pop();
      const randomId = (typeof crypto !== "undefined" && crypto.randomUUID)
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const fileName = `${randomId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("surface-images")
        .upload(fileName, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("surface-images")
        .getPublicUrl(fileName);

      setUploadedPhotoUrl(publicUrl);

      // 3. Trigger visual AI analysis AND image generation in parallel
      const [analyzeResponse, cleanResponse] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: publicUrl, surface }),
        }),
        fetch("/api/generate-clean", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: publicUrl, surface }),
        }).catch((err) => {
          console.warn("[Generate Clean] Failed, will use CSS fallback:", err);
          return null;
        }),
      ]);

      if (!analyzeResponse.ok) {
        const errData = await analyzeResponse.json();
        throw new Error(
          errData.details 
            ? `${errData.error} (${errData.details})` 
            : (errData.error || "Chyba při komunikaci s AI serverem.")
        );
      }

      const result = await analyzeResponse.json();
      console.log("[Index handleAnalyze] API result received:", result);
      setAnalysisResult(result);

      // Process cleaned image if generation succeeded
      if (cleanResponse && cleanResponse.ok) {
        try {
          const cleanData = await cleanResponse.json();
          if (cleanData.cleanedImageUrl) {
            setCleanedImageUrl(cleanData.cleanedImageUrl);
            console.log("[Index handleAnalyze] AI cleaned image received.");
          }
        } catch (e) {
          console.warn("[Generate Clean] Failed to parse response:", e);
        }
      }

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
    setCleanedImageUrl(null);
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
            afterImageUrl={cleanedImageUrl || undefined}
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
