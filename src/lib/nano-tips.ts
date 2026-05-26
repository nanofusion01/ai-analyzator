// NanoTipy zobrazované během analýzy.
// Tato data budou později spravována z admin panelu — udržujte stejný tvar.
export interface NanoTip {
  id: string;
  title: string;
  text: string;
}

export const NANO_TIPS: NanoTip[] = [
  {
    id: "lifetime",
    title: "Životnost",
    text: "Nanopovlak Nanofusion chrání povrch 3–5 let bez nutnosti opakování.",
  },
  {
    id: "self-cleaning",
    title: "Samočistící efekt",
    text: "Díky hydrofobní vrstvě stéká voda i nečistoty samy — povrch se čistí deštěm.",
  },
  {
    id: "uv",
    title: "UV ochrana",
    text: "Nanovrstva odráží UV záření a brání vyblednutí barev fasády či auta.",
  },
  {
    id: "bio",
    title: "Stop mechům a řasám",
    text: "Ošetřený povrch zabraňuje opětovnému usazování mechů, řas a lišejníků.",
  },
  {
    id: "eco",
    title: "Šetrné k okolí",
    text: "Naše přípravky jsou biologicky odbouratelné a bezpečné pro rostliny i zvířata.",
  },
  {
    id: "warranty",
    title: "Záruka kvality",
    text: "Na profesionální aplikaci poskytujeme záruku až 5 let písemně.",
  },
  {
    id: "speed",
    title: "Rychlá realizace",
    text: "Běžnou fasádu rodinného domu zvládneme ošetřit za 1–2 dny.",
  },
];
