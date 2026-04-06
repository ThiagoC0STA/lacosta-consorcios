import { CATEGORIES } from "../lib/categories";
import { buildCategoryMetadata } from "../lib/categoryMetadata";
import CategoryLandingPage from "../components/CategoryLandingPage";

const cat = CATEGORIES.veiculo;

export const metadata = buildCategoryMetadata(cat);

export default function ConsorcioVeiculoPage() {
  return <CategoryLandingPage category={cat} />;
}
