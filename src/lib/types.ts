export type SurfaceType = "Střecha" | "Fasáda" | "Okna" | "Dlažba" | "Jiné";

export type AnalysisLabel = "Výborný" | "Dobrý" | "Průměrný" | "Špatný" | "Kritický";

export type UrgencyType = "Doporučit ihned" | "Do 3 měsíců" | "Preventivní ošetření";

export interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

export interface AnalysisResult {
  score: number;
  label: AnalysisLabel;
  breakdown: BreakdownItem[];
  recommendations: string[];
  urgency: UrgencyType;
  improvementPercent: number;
  isMock?: boolean;
}

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
}

export type AppView = "intro" | "loading" | "lead" | "results";
