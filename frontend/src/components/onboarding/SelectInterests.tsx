import React, { useState } from "react";
import { Cpu, DollarSign, Zap, Heart, Bitcoin, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface SelectInterestsProps {
  onComplete: () => void;
}

const interests = [
  { id: "tech", name: "Technology", icon: Cpu },
  { id: "finance", name: "Finance", icon: DollarSign },
  { id: "energy", name: "Energy", icon: Zap },
  { id: "healthcare", name: "Healthcare", icon: Heart },
  { id: "crypto", name: "Cryptocurrency", icon: Bitcoin },
  { id: "retail", name: "Retail", icon: ShoppingBag },
];

export function SelectInterests({ onComplete }: SelectInterestsProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-background md:items-center md:justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Select your interests</h2>
          <p className="text-muted-foreground">
            Choose the sectors you want to follow
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = selected.includes(interest.id);

            return (
              <Card
                key={interest.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleInterest(interest.id)}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isSelected ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <span className="text-foreground">{interest.name}</span>
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          onClick={onComplete}
          className="w-full"
          size="lg"
          disabled={selected.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
