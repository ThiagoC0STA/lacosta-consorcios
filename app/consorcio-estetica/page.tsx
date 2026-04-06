import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.estetica;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioEsteticaPage() {
  return <CategoryLandingPage category={cat} />;
}
