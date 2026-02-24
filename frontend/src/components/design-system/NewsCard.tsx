import React from "react";
import { Card } from "../ui/card";
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface NewsCardProps {
  title: string;
  source: string;
  time: string;
  category: string;
  image?: string;
  excerpt?: string;
  onClick?: () => void;
}

export function NewsCard({
  title,
  source,
  time,
  category,
  image,
  excerpt,
  onClick,
}: NewsCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <ImageWithFallback
            src={`https://source.unsplash.com/400x225/?${image}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {category}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
        </div>
        <h4 className="text-foreground mb-2 line-clamp-2">{title}</h4>
        {excerpt && (
          <p className="text-muted-foreground line-clamp-2 mb-2">{excerpt}</p>
        )}
        <p className="text-muted-foreground">{source}</p>
      </div>
    </Card>
  );
}
