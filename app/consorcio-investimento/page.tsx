import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.investimento;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioInvestimentoPage() {
  return <CategoryLandingPage category={cat} />;
}
