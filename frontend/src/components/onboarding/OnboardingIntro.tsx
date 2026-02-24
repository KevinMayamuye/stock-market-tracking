import React, { useState } from "react";
import { TrendingUp, Bell, Newspaper, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface OnboardingIntroProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: TrendingUp,
    title: "Track stocks easily",
    description: "Monitor your favorite stocks in real-time with live price updates and detailed charts",
  },
  {
    icon: Bell,
    title: "Get alerts in real time",
    description: "Set custom price alerts and never miss important market movements",
  },
  {
    icon: Newspaper,
    title: "Follow news & charts",
    description: "Stay informed with the latest market news and interactive trading charts",
  },
];

export function OnboardingIntro({ onComplete }: OnboardingIntroProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-background">
      <button
        onClick={handleSkip}
        className="self-end text-muted-foreground hover:text-foreground"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8">
          <Icon className="h-12 w-12 text-primary" />
        </div>

        <h2 className="text-foreground mb-4 text-center">{step.title}</h2>
        <p className="text-muted-foreground text-center mb-8">
          {step.description}
        </p>

        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleNext} className="w-full max-w-md" size="lg">
        {currentStep < steps.length - 1 ? (
          <>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          "Get Started"
        )}
      </Button>
    </div>
  );
}
