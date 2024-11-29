import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NavItem } from '../types';
import { cn } from '../utils/cn';

const navItems: NavItem[] = [
  { label: 'Accueil', icon: 'home', href: '#' },
  { label: 'Fonctionnalités', icon: 'layout', href: '#features' },
  { label: 'Configuration', icon: 'settings', href: '#config' },
  { label: 'À Propos', icon: 'info', href: '#about' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed left-1/2 -translate-x-1/2 top-6 z-50 transition-all duration-300",
      scrolled && "top-4 scale-95"
    )}>
      <div className={cn(
        "bg-gray-900/90 backdrop-blur-sm rounded-full px-6 py-3",
        "border border-gray-800/50 shadow-lg",
        "transition-all duration-300",
        scrolled ? "shadow-blue-500/5" : "shadow-blue-500/10"
      )}>
        <div className="flex items-center gap-6">
          <button 
            className="lg:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
          
          <div className={cn(
            "flex items-center gap-6",
            isOpen ? "flex" : "hidden",
            "lg:flex"
          )}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "relative text-gray-300 hover:text-white transition-all duration-300",
                  "px-3 py-2 rounded-full text-sm font-medium",
                  "after:absolute after:inset-0 after:rounded-full",
                  "after:bg-blue-500/10 after:opacity-0 hover:after:opacity-100",
                  "after:transition-opacity after:duration-300"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};