import React from "react";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface NewsDetailProps {
  article: any;
  onBack: () => void;
}

export function NewsDetail({ article, onBack }: NewsDetailProps) {
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
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-foreground mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{article.source}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.time}</span>
              </div>
            </div>
          </div>

          {article.image && (
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <ImageWithFallback
                src={`https://source.unsplash.com/800x450/?${article.image}`}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Card className="p-6">
            <p className="text-foreground mb-4">{article.excerpt}</p>
            <p className="text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <p className="text-muted-foreground mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-muted-foreground mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p className="text-muted-foreground">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
