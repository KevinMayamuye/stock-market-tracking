import React from "react";
import { WifiOff, AlertCircle, Search } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorScreenProps {
  type: "offline" | "404" | "error";
  onRetry?: () => void;
  onGoHome?: () => void;
}

export function ErrorScreen({ type, onRetry, onGoHome }: ErrorScreenProps) {
  const configs = {
    offline: {
      icon: WifiOff,
      title: "No Internet Connection",
      description: "Please check your internet connection and try again",
      action: "Retry",
    },
    "404": {
      icon: Search,
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist",
      action: "Go Home",
    },
    error: {
      icon: AlertCircle,
      title: "Something Went Wrong",
      description: "An error occurred while loading this page",
      action: "Retry",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-6">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-foreground mb-2">{config.title}</h2>
        <p className="text-muted-foreground mb-8">{config.description}</p>
        <div className="flex gap-3 justify-center">
          {type === "404" && onGoHome && (
            <Button onClick={onGoHome}>{config.action}</Button>
          )}
          {(type === "offline" || type === "error") && onRetry && (
            <Button onClick={onRetry}>{config.action}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
