import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.saude;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioSaudePage() {
  return <CategoryLandingPage category={cat} />;
}
