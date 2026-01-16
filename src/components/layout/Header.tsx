import { Link } from 'react-router-dom';
import { ChefHat, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from '@/components/recipe/SearchForm';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import CategoryFilter from '@/components/recipe/CategoryFilter';
import { useState } from 'react';

/**
 * Header with logo, search, and mobile menu
 */
export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <ChefHat className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold hidden sm:block">
            Tarif<span className="text-primary">App</span>
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchForm />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent side="left">
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Mutfaklar
                </DrawerTitle>
              </DrawerHeader>
              <div className="mt-4 overflow-y-auto max-h-[70vh]">
                <CategoryFilter onCategorySelect={() => setIsDrawerOpen(false)} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Search - Mobile */}
      <div className="md:hidden px-4 pb-4">
        <SearchForm />
      </div>
    </header>
  );
}
