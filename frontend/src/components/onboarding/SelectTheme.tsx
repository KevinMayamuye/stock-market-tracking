import React, { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useTheme } from "../../contexts/ThemeContext";

interface SelectThemeProps {
  onComplete: () => void;
}

const themes = [
  { id: "light", name: "Light", icon: Sun },
  { id: "dark", name: "Dark", icon: Moon },
  { id: "system", name: "System", icon: Monitor },
];

export function SelectTheme({ onComplete }: SelectThemeProps) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | "system">(theme);

  const handleComplete = () => {
    setTheme(selectedTheme);
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-background md:items-center md:justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Choose your theme</h2>
          <p className="text-muted-foreground">
            Select your preferred app appearance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = selectedTheme === themeOption.id;

            return (
              <Card
                key={themeOption.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedTheme(themeOption.id as "light" | "dark" | "system")}
              >
                <div className="flex items-center gap-4">
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
                  <div>
                    <h4 className="text-foreground">{themeOption.name}</h4>
                    <p className="text-muted-foreground">
                      {themeOption.id === "light" && "Always use light mode"}
                      {themeOption.id === "dark" && "Always use dark mode"}
                      {themeOption.id === "system" && "Match system preference"}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Button onClick={handleComplete} className="w-full" size="lg">
          Complete Setup
        </Button>
      </div>
    </div>
  );
}
