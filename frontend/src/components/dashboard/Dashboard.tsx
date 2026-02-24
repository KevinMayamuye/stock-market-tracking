import React from "react";
import { TrendingUp, TrendingDown, Plus, Bell, PieChart, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { StockCard } from "../design-system/StockCard";
import { ChartWidget } from "../design-system/ChartWidget";
import { marketIndexes, featuredStocks, trendingStocks, generateChartData } from "../../lib/mockData";

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const chartData = generateChartData(30);

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      {/* Mobile Search */}
      <div className="mb-6 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search stocks..." className="pl-10" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4"
          onClick={() => onNavigate("watchlist")}
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs">Add Stock</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4"
          onClick={() => onNavigate("alerts")}
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs">Create Alert</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col gap-2 h-auto py-4"
          onClick={() => onNavigate("portfolio")}
        >
          <PieChart className="h-5 w-5" />
          <span className="text-xs">Portfolio</span>
        </Button>
      </div>

      {/* Market Overview */}
      <div className="mb-6">
        <h3 className="text-foreground mb-4">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketIndexes.map((index) => {
            const isPositive = index.change >= 0;
            return (
              <Card key={index.symbol} className="p-4">
                <p className="text-muted-foreground mb-1">{index.name}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-foreground">{index.price.toLocaleString()}</h3>
                    <div
                      className={`flex items-center gap-1 ${
                        isPositive ? "market-up" : "market-down"
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>
                        {isPositive ? "+" : ""}
                        {index.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Market Chart */}
      <div className="mb-6">
        <h3 className="text-foreground mb-4">Market Summary</h3>
        <ChartWidget data={chartData} showTabs={false} />
      </div>

      {/* Featured Stocks */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Featured Stocks</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredStocks.slice(0, 6).map((stock) => (
            <StockCard
              key={stock.symbol}
              {...stock}
              onClick={() => onNavigate("stock-detail", stock)}
            />
          ))}
        </div>
      </div>

      {/* Trending Stocks */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Trending Today</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              {...stock}
              onClick={() => onNavigate("stock-detail", stock)}
            />
          ))}
        </div>
      </div>

      {/* Watchlist Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">My Watchlist</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("watchlist")}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredStocks.slice(0, 4).map((stock) => (
            <StockCard
              key={stock.symbol}
              {...stock}
              isFavorite
              onFavorite={() => {}}
              onClick={() => onNavigate("stock-detail", stock)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
