import React from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

interface WelcomeScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function WelcomeScreen({ onLogin, onSignup }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary mb-6">
            <TrendingUp className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">StockTracker</h1>
          <p className="text-muted-foreground">
            Track stocks, get real-time alerts, and stay informed
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={onSignup} className="w-full" size="lg">
            Sign Up
          </Button>
          <Button onClick={onLogin} variant="outline" className="w-full" size="lg">
            Log In
          </Button>
        </div>

        <p className="text-center text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
