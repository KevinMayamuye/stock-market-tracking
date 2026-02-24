import React from "react";
import { Card } from "../ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface HeatMapItem {
  symbol: string;
  name: string;
  change: number;
  changePercent: number;
  marketCap: string;
}

const heatMapData: HeatMapItem[] = [
  { symbol: "AAPL", name: "Apple", change: 2.34, changePercent: 1.33, marketCap: "Large" },
  { symbol: "MSFT", name: "Microsoft", change: -1.45, changePercent: -0.39, marketCap: "Large" },
  { symbol: "GOOGL", name: "Alphabet", change: 0.89, changePercent: 0.64, marketCap: "Large" },
  { symbol: "AMZN", name: "Amazon", change: 3.21, changePercent: 2.26, marketCap: "Large" },
  { symbol: "TSLA", name: "Tesla", change: -5.67, changePercent: -2.28, marketCap: "Large" },
  { symbol: "META", name: "Meta", change: 4.23, changePercent: 1.30, marketCap: "Large" },
  { symbol: "NVDA", name: "NVIDIA", change: 12.45, changePercent: 2.62, marketCap: "Large" },
  { symbol: "AMD", name: "AMD", change: -2.34, changePercent: -1.86, marketCap: "Medium" },
];

export function HeatMap() {
  const getColorIntensity = (changePercent: number) => {
    const intensity = Math.min(Math.abs(changePercent) * 30, 100);
    return changePercent >= 0
      ? `rgba(34, 197, 94, ${intensity / 100})`
      : `rgba(239, 68, 68, ${intensity / 100})`;
  };

  return (
    <Card className="p-4">
      <h3 className="text-foreground mb-4">Market Heatmap</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {heatMapData.map((item) => (
          <div
            key={item.symbol}
            className="p-3 rounded-lg transition-all hover:scale-105 cursor-pointer"
            style={{ backgroundColor: getColorIntensity(item.changePercent) }}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-foreground text-sm">{item.symbol}</p>
              {item.changePercent >= 0 ? (
                <TrendingUp className="h-3 w-3 text-foreground" />
              ) : (
                <TrendingDown className="h-3 w-3 text-foreground" />
              )}
            </div>
            <p className="text-foreground">
              {item.changePercent >= 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
