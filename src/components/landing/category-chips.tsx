import { categories } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function CategoryChips() {
  return (
    <section id="categories" className="px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="rounded-full border-white/10 bg-white/[0.03] px-6 text-white hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-300"
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
}