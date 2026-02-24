import React, { useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Star,
  Bell,
  BarChart3,
  LineChart as LineChartIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { ChartWidget } from "../design-system/ChartWidget";
import { generateChartData, companyFundamentals, analystRatings, featuredStocks } from "../../lib/mockData";

interface StockDetailProps {
  stock: any;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function StockDetail({ stock, onBack, onNavigate }: StockDetailProps) {
  const [chartType, setChartType] = useState<"line" | "area">("area");
  const [isFavorite, setIsFavorite] = useState(false);
  const chartData = generateChartData(90);
  const isPositive = stock.change >= 0;

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-6">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Star
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-warning text-warning" : ""
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("alerts")}
              >
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stock Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-foreground">{stock.symbol}</h2>
              <p className="text-muted-foreground">{stock.name}</p>
            </div>
            <div className="text-right">
              <h2 className="text-foreground">${stock.price.toFixed(2)}</h2>
              <div
                className={`flex items-center gap-1 justify-end ${
                  isPositive ? "market-up" : "market-down"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* High/Low */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <p className="text-muted-foreground text-xs mb-1">Day High</p>
              <p className="text-foreground">${(stock.price + 5.23).toFixed(2)}</p>
            </Card>
            <Card className="p-3">
              <p className="text-muted-foreground text-xs mb-1">Day Low</p>
              <p className="text-foreground">${(stock.price - 3.45).toFixed(2)}</p>
            </Card>
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-foreground">Price Chart</h3>
          <div className="flex gap-2">
            <Button
              variant={chartType === "area" ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType("area")}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "ghost"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6">
          <ChartWidget data={chartData} type={chartType} />
        </div>

        {/* Fundamentals */}
        <div className="mb-6">
          <h3 className="text-foreground mb-4">Company Fundamentals</h3>
          <Card className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-muted-foreground text-xs mb-1">Market Cap</p>
                <p className="text-foreground">{companyFundamentals.marketCap}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">P/E Ratio</p>
                <p className="text-foreground">{companyFundamentals.pe}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">EPS</p>
                <p className="text-foreground">${companyFundamentals.eps}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Dividend</p>
                <p className="text-foreground">${companyFundamentals.dividend}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Yield</p>
                <p className="text-foreground">{companyFundamentals.yield}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">52W High</p>
                <p className="text-foreground">${companyFundamentals.week52High}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">52W Low</p>
                <p className="text-foreground">${companyFundamentals.week52Low}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Avg Volume</p>
                <p className="text-foreground">{companyFundamentals.avgVolume}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Analyst Ratings */}
        <div className="mb-6">
          <h3 className="text-foreground mb-4">Analyst Ratings</h3>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground mb-1">Consensus</p>
                <Badge className="bg-success">{analystRatings.consensus}</Badge>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground mb-1">Price Target</p>
                <p className="text-foreground">${analystRatings.targetPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-success mb-1">{analystRatings.buy}</p>
                <p className="text-muted-foreground text-xs">Buy</p>
              </div>
              <div>
                <p className="text-warning mb-1">{analystRatings.hold}</p>
                <p className="text-muted-foreground text-xs">Hold</p>
              </div>
              <div>
                <p className="text-danger mb-1">{analystRatings.sell}</p>
                <p className="text-muted-foreground text-xs">Sell</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Related Stocks */}
        <div>
          <h3 className="text-foreground mb-4">Related Stocks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredStocks.slice(0, 4).map((relatedStock) => (
              <Card
                key={relatedStock.symbol}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate("stock-detail", relatedStock)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-foreground">{relatedStock.symbol}</h4>
                    <p className="text-muted-foreground text-xs">{relatedStock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground">${relatedStock.price.toFixed(2)}</p>
                    <p
                      className={
                        relatedStock.change >= 0 ? "market-up" : "market-down"
                      }
                    >
                      {relatedStock.change >= 0 ? "+" : ""}
                      {relatedStock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
