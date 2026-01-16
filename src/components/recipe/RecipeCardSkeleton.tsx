/**
 * Skeleton loading state for recipe cards
 * Matches the dimensions of RecipeCard for smooth loading
 */
export default function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-card border border-border">
      {/* Image skeleton */}
      <div className="aspect-[4/3] skeleton" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded skeleton" />
        <div className="h-4 w-1/2 rounded skeleton" />
      </div>
    </div>
  );
}
