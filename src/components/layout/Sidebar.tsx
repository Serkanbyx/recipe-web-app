import CategoryFilter from '@/components/recipe/CategoryFilter';

/**
 * Desktop sidebar with category filters
 * Hidden on mobile, fixed position on desktop
 */
export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-border bg-background/50 backdrop-blur-sm px-4 py-6 lg:block">
      <CategoryFilter />
    </aside>
  );
}
