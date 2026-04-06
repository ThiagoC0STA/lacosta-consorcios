import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.educacao;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioEducacaoPage() {
  return <CategoryLandingPage category={cat} />;
}
