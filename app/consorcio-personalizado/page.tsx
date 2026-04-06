import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.personalizado;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioPersonalizadoPage() {
  return <CategoryLandingPage category={cat} />;
}
