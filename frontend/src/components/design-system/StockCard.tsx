import React from "react";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import { Card } from "../ui/card";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  onFavorite?: () => void;
  isFavorite?: boolean;
  onClick?: () => void;
}

export function StockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  onFavorite,
  isFavorite,
  onClick,
}: StockCardProps) {
  const isPositive = change >= 0;

  return (
    <Card
      className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-foreground">{symbol}</h4>
            {onFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite();
                }}
                className="text-muted-foreground hover:text-warning transition-colors"
              >
                <Star
                  className={`h-4 w-4 ${isFavorite ? "fill-warning text-warning" : ""}`}
                />
              </button>
            )}
          </div>
          <p className="text-muted-foreground">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-foreground">${price.toFixed(2)}</p>
          <div
            className={`flex items-center gap-1 ${isPositive ? "market-up" : "market-down"}`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
