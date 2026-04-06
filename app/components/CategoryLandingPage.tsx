import type { CategoryData } from "../lib/categoryTypes";
import { getCategoryJsonLd } from "../lib/categories";
import CategoryPageContent from "./CategoryPageContent";

export default function CategoryLandingPage({ category }: { category: CategoryData }) {
  const schemas = getCategoryJsonLd(category);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CategoryPageContent category={category} />
    </>
  );
}
