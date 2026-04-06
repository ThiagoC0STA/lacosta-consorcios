import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.embarcacoes;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioEmbarcacoesPage() {
  return <CategoryLandingPage category={cat} />;
}
