import { CATEGORIES } from "../lib/categories";
import { generateCategoryOG, OG_SIZE, OG_CONTENT_TYPE } from "../lib/generateCategoryOG";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Consórcio de Reforma Sem Juros | Lacosta Consórcios";

const cat = CATEGORIES.reforma;

export default function Image() {
  return generateCategoryOG({
    name: cat.name,
    shortName: cat.shortName,
    heroAccent: cat.heroAccent,
    avgSaving: cat.avgSaving,
    accent: cat.theme.accent,
    accentLight: cat.theme.accentLight,
  });
}
