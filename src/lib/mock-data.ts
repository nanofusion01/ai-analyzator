import { AnalysisResult } from "./types";

export const mockAnalysisResult: AnalysisResult = {
  score: 5,
  label: "Průměrný",
  breakdown: [
    { label: "Atmosferická špína", value: 42, color: "#94a3b8" },
    { label: "Biologický nárůst", value: 33, color: "#86efac" },
    { label: "Vodní kámen", value: 25, color: "#93c5fd" },
  ],
  recommendations: [
    "Doporučujeme profesionální tlakové čištění před aplikací nanopovlaku.",
    "Nanopovlak Nanofusion prodlouží životnost povrchu o 3–5 let.",
    "Po ošetření bude povrch odolný vůči biologickému nárůstu a povětrnosti.",
  ],
  urgency: "Do 3 měsíců",
  improvementPercent: 75,
  isMock: true,
};
