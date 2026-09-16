export interface DemoParams {
  name: string;
  city: string;
  address: string;
  field: string;
  fieldDisplay: string;
  isFemale: boolean;
  prefix: string;
}

export async function getDemoParams(searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }> | undefined): Promise<DemoParams> {
  const searchParams = searchParamsPromise ? await searchParamsPromise : {};
  
  const getParam = (key: string): string | undefined => {
    const val = searchParams[key];
    if (Array.isArray(val)) return val[0];
    return val;
  };

  // Supporta parametri URL per demo dinamiche (Lumina engine) mantenendo Giovanna Padalino come default
  const rawName = getParam("name") || "Dott.ssa Giovanna V. Padalino";
  const rawCity = getParam("city") || "Bologna";
  const rawAddress = getParam("address") || "Via della Beverara, 224/6. Piano 2, 40100 Bologna BO";
  const rawField = getParam("field") || "pedagogista, tecnico ABA e psicologa";

  // Rimuovi i trattini dall'URL e rendi la prima lettera maiuscola (es. "terapia-di-coppia" -> "Terapia di coppia")
  const fieldWithoutHyphens = rawField.replace(/-/g, " ");
  const fieldDisplay = fieldWithoutHyphens.charAt(0).toUpperCase() + fieldWithoutHyphens.slice(1);

  // Determina il sesso in base al prefisso
  const lowerName = rawName.toLowerCase();
  const isFemale = lowerName.includes("dott.ssa") || lowerName.includes("dottoressa");
  const prefix = isFemale ? "la Dottoressa" : "il Dottor";

  return {
    name: rawName,
    city: rawCity,
    address: rawAddress,
    field: rawField,
    fieldDisplay,
    isFemale,
    prefix
  };
}

export function getDictionary(field: string) {
  const f = field.toLowerCase();
  
  if (f.includes("sessuolog")) {
    return {
      heroTitle: "Siediti. Parla. Ritrova l'intimità.",
      heroSubtitle: "Un percorso calmo, sicuro e riservato per esplorare e superare le difficoltà legate alla sfera relazionale e intima."
    };
  } else if (f.includes("coppia")) {
    return {
      heroTitle: "Siediti. Parlate. Ritrovatevi.",
      heroSubtitle: "Uno spazio neutrale ed empatico dove ristabilire l'equilibrio della coppia, riscoprendo serenità e comunicazione profonda."
    };
  } else if (f.includes("dipendenz")) {
    return {
      heroTitle: "Siediti. Parla. Ritrova la tua libertà.",
      heroSubtitle: "Affronta e supera le dinamiche disfunzionali in un ambiente accogliente e autenticamente non giudicante. Insieme."
    };
  }

  // Default
  return {
    heroTitle: "Siediti. Parla. Ritrova la serenità.",
    heroSubtitle: "Un supporto psicologico dedicato e altamente professionale per superare l'impasse e ritrovare il proprio centro."
  };
}
