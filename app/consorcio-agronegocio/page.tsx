import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.agronegocio;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioAgronegocioPage() {
  return <CategoryLandingPage category={cat} />;
}
