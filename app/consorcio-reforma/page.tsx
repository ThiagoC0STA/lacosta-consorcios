import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.reforma;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioReformaPage() {
  return <CategoryLandingPage category={cat} />;
}
