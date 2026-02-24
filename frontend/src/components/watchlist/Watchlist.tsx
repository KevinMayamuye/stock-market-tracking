import React, { useState } from "react";
import { Plus, Search, ListX } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StockCard } from "../design-system/StockCard";
import { EmptyState } from "../design-system/EmptyState";
import { featuredStocks } from "../../lib/mockData";

interface WatchlistProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Watchlist({ onNavigate }: WatchlistProps) {
  const [watchlist, setWatchlist] = useState(featuredStocks);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (symbol: string) => {
    setWatchlist((prev) => prev.filter((stock) => stock.symbol !== symbol));
  };

  const filteredStocks = watchlist.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-foreground">Watchlist</h2>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search watchlist..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredStocks.length === 0 ? (
        <EmptyState
          icon={ListX}
          title="No stocks in watchlist"
          description="Add stocks to your watchlist to track them here"
          actionLabel="Add Stock"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              {...stock}
              isFavorite
              onFavorite={() => toggleFavorite(stock.symbol)}
              onClick={() => onNavigate("stock-detail", stock)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
