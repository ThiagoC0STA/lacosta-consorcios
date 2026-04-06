import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.servicos;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioServicosPage() {
  return <CategoryLandingPage category={cat} />;
}
