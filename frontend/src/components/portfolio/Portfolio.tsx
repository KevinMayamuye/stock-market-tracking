import React from "react";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { Card } from "../ui/card";
import { ChartWidget } from "../design-system/ChartWidget";
import { portfolioHoldings, generateChartData } from "../../lib/mockData";

export function Portfolio() {
  const chartData = generateChartData(30);

  const totalValue = portfolioHoldings.reduce((sum, holding) => sum + holding.value, 0);
  const totalGain = portfolioHoldings.reduce((sum, holding) => sum + holding.gain, 0);
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <h2 className="text-foreground mb-6">Portfolio</h2>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="h-4 w-4 text-primary" />
            <p className="text-muted-foreground">Total Value</p>
          </div>
          <h2 className="text-foreground">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground mb-2">Total Gain/Loss</p>
          <div className="flex items-center gap-2">
            <h2 className={totalGain >= 0 ? "market-up" : "market-down"}>
              ${Math.abs(totalGain).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            {totalGain >= 0 ? (
              <TrendingUp className="h-5 w-5 market-up" />
            ) : (
              <TrendingDown className="h-5 w-5 market-down" />
            )}
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground mb-2">Total Return</p>
          <h2 className={totalGainPercent >= 0 ? "market-up" : "market-down"}>
            {totalGainPercent >= 0 ? "+" : ""}
            {totalGainPercent.toFixed(2)}%
          </h2>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <div className="mb-6">
        <h3 className="text-foreground mb-4">Portfolio Performance</h3>
        <ChartWidget data={chartData} />
      </div>

      {/* Holdings */}
      <div>
        <h3 className="text-foreground mb-4">Holdings</h3>
        <div className="space-y-3">
          {portfolioHoldings.map((holding) => (
            <Card key={holding.symbol} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-foreground">{holding.symbol}</h4>
                  <p className="text-muted-foreground">{holding.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground">${holding.currentPrice.toFixed(2)}</p>
                  <p className={holding.gain >= 0 ? "market-up" : "market-down"}>
                    {holding.gain >= 0 ? "+" : ""}
                    {holding.gainPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Shares</p>
                  <p className="text-foreground">{holding.shares}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Avg Cost</p>
                  <p className="text-foreground">${holding.avgCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Total Value</p>
                  <p className="text-foreground">${holding.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
