import React from "react";
import { TrendingUp, Search, Menu } from "lucide-react";
import { Input } from "../ui/input";

interface HeaderProps {
  onMenuClick?: () => void;
  showSearch?: boolean;
}

export function Header({ onMenuClick, showSearch = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="md:hidden text-foreground"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-foreground hidden sm:block">StockTracker</h3>
            </div>
          </div>

          {showSearch && (
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
