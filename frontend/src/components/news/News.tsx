import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NewsCard } from "../design-system/NewsCard";
import { newsArticles } from "../../lib/mockData";

interface NewsProps {
  onNavigate: (page: string, data?: any) => void;
}

export function News({ onNavigate }: NewsProps) {
  const [category, setCategory] = useState("all");

  const categories = ["all", "Markets", "Technology", "Economy", "Energy", "Crypto"];

  const filteredArticles =
    category === "all"
      ? newsArticles
      : newsArticles.filter((article) => article.category === category);

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <h2 className="text-foreground mb-6">Financial News</h2>

      <div className="mb-6 overflow-x-auto">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="w-full md:w-auto">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat === "all" ? "All" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <NewsCard
            key={article.id}
            {...article}
            onClick={() => onNavigate("news-detail", article)}
          />
        ))}
      </div>
    </div>
  );
}
