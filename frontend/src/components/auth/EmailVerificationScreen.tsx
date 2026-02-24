import React from "react";
import { CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

interface EmailVerificationScreenProps {
  onContinue: () => void;
}

export function EmailVerificationScreen({ onContinue }: EmailVerificationScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
          <TrendingUp className="h-8 w-8 text-primary-foreground" />
        </div>

        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-foreground mb-2">Email Verified!</h2>
          <p className="text-muted-foreground">
            Your email has been successfully verified. You can now access all features.
          </p>
        </div>

        <Button onClick={onContinue} className="w-full" size="lg">
          Continue to App
        </Button>
      </div>
    </div>
  );
}
