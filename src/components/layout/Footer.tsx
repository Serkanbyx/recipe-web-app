import { Github, Globe } from 'lucide-react';

/**
 * Footer component with author signature
 * Displays creator info with links to website and GitHub
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-center gap-2 px-4 py-4 text-sm text-muted-foreground lg:ml-64">
        <span>Created by</span>
        <a
          href="https://serkanbayraktar.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
        >
          <Globe className="h-3.5 w-3.5" />
          Serkanby
        </a>
        <span className="text-border">|</span>
        <a
          href="https://github.com/Serkanbyx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
