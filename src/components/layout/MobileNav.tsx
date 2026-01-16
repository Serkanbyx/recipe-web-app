import { NavLink } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Mobile bottom navigation bar
 * Shows on mobile devices only
 */
export default function MobileNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/favorites', icon: Heart, label: 'Favorites' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/80 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
