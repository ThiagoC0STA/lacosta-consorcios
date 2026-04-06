import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.imovel;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioImovelPage() {
  return <CategoryLandingPage category={cat} />;
}
