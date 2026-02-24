import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

interface TwoFactorScreenProps {
  onVerify: () => void;
  onResend: () => void;
}

export function TwoFactorScreen({ onVerify, onResend }: TwoFactorScreenProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <TrendingUp className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-foreground mb-2">Two-Factor Authentication</h2>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Verify
            </Button>

            <button
              type="button"
              onClick={onResend}
              className="text-primary hover:underline w-full text-center"
            >
              Resend Code
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
