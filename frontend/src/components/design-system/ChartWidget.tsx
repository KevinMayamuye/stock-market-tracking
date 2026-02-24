import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface ChartWidgetProps {
  data: any[];
  showTabs?: boolean;
  type?: "line" | "area";
}

export function ChartWidget({ data, showTabs = true, type = "area" }: ChartWidgetProps) {
  const [timeframe, setTimeframe] = useState("1D");

  const timeframes = ["1D", "5D", "1M", "6M", "YTD", "1Y", "MAX"];

  return (
    <Card className="p-4">
      {showTabs && (
        <div className="mb-4">
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList className="grid grid-cols-7 w-full">
              {timeframes.map((tf) => (
                <TabsTrigger key={tf} value={tf} className="text-xs">
                  {tf}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        {type === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="rgb(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="rgb(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--card))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke="rgb(59, 130, 246)"
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="rgb(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="rgb(var(--muted-foreground))" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(var(--card))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="rgb(59, 130, 246)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
