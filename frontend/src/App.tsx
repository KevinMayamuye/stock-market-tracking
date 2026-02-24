import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/layout/Header";
import { MobileNav } from "./components/layout/MobileNav";

// Auth screens
import { WelcomeScreen } from "./components/auth/WelcomeScreen";
import { LoginScreen } from "./components/auth/LoginScreen";
import { SignupScreen } from "./components/auth/SignupScreen";
import { TwoFactorScreen } from "./components/auth/TwoFactorScreen";
import { ForgotPasswordScreen } from "./components/auth/ForgotPasswordScreen";
import { EmailVerificationScreen } from "./components/auth/EmailVerificationScreen";

// Onboarding screens
import { OnboardingIntro } from "./components/onboarding/OnboardingIntro";
import { SelectInterests } from "./components/onboarding/SelectInterests";
import { SelectTheme } from "./components/onboarding/SelectTheme";

// Main app screens
import { Dashboard } from "./components/dashboard/Dashboard";
import { Watchlist } from "./components/watchlist/Watchlist";
import { StockDetail } from "./components/stock/StockDetail";
import { Alerts } from "./components/alerts/Alerts";
import { News } from "./components/news/News";
import { NewsDetail } from "./components/news/NewsDetail";
import { Portfolio } from "./components/portfolio/Portfolio";
import { Profile } from "./components/profile/Profile";
import { ErrorScreen } from "./components/errors/ErrorScreen";

type AppScreen =
  | "welcome"
  | "login"
  | "signup"
  | "2fa"
  | "forgot-password"
  | "email-verification"
  | "onboarding-intro"
  | "select-interests"
  | "select-theme"
  | "dashboard"
  | "watchlist"
  | "stock-detail"
  | "alerts"
  | "news"
  | "news-detail"
  | "portfolio"
  | "profile"
  | "error";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome");
  const [selectedData, setSelectedData] = useState<any>(null);

  const navigate = (screen: AppScreen, data?: any) => {
    setCurrentScreen(screen);
    if (data) setSelectedData(data);
  };

  const mainScreens = [
    "dashboard",
    "watchlist",
    "stock-detail",
    "alerts",
    "news",
    "news-detail",
    "portfolio",
    "profile",
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      // Auth Flow
      case "welcome":
        return (
          <WelcomeScreen
            onLogin={() => navigate("login")}
            onSignup={() => navigate("signup")}
          />
        );
      case "login":
        return (
          <LoginScreen
            onBack={() => navigate("welcome")}
            onLogin={() => navigate("2fa")}
            onForgotPassword={() => navigate("forgot-password")}
          />
        );
      case "signup":
        return (
          <SignupScreen
            onBack={() => navigate("welcome")}
            onSignup={() => navigate("email-verification")}
          />
        );
      case "2fa":
        return (
          <TwoFactorScreen
            onVerify={() => navigate("onboarding-intro")}
            onResend={() => {}}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordScreen
            onBack={() => navigate("login")}
            onSubmit={() => navigate("login")}
          />
        );
      case "email-verification":
        return (
          <EmailVerificationScreen
            onContinue={() => navigate("onboarding-intro")}
          />
        );

      // Onboarding Flow
      case "onboarding-intro":
        return (
          <OnboardingIntro onComplete={() => navigate("select-interests")} />
        );
      case "select-interests":
        return (
          <SelectInterests onComplete={() => navigate("select-theme")} />
        );
      case "select-theme":
        return <SelectTheme onComplete={() => navigate("dashboard")} />;

      // Main App
      case "dashboard":
        return <Dashboard onNavigate={navigate} />;
      case "watchlist":
        return <Watchlist onNavigate={navigate} />;
      case "stock-detail":
        return (
          <StockDetail
            stock={selectedData}
            onBack={() => navigate("dashboard")}
            onNavigate={navigate}
          />
        );
      case "alerts":
        return <Alerts />;
      case "news":
        return <News onNavigate={navigate} />;
      case "news-detail":
        return (
          <NewsDetail
            article={selectedData}
            onBack={() => navigate("news")}
          />
        );
      case "portfolio":
        return <Portfolio />;
      case "profile":
        return (
          <Profile
            onNavigate={navigate}
            onLogout={() => navigate("welcome")}
          />
        );

      // Error
      case "error":
        return (
          <ErrorScreen
            type="error"
            onRetry={() => navigate("dashboard")}
            onGoHome={() => navigate("dashboard")}
          />
        );

      default:
        return (
          <ErrorScreen
            type="404"
            onGoHome={() => navigate("dashboard")}
          />
        );
    }
  };

  const isMainApp = mainScreens.includes(currentScreen);
  const showMobileNav = isMainApp && !["stock-detail", "news-detail"].includes(currentScreen);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {isMainApp && !["stock-detail", "news-detail"].includes(currentScreen) && (
          <Header showSearch />
        )}
        {renderScreen()}
        {showMobileNav && (
          <MobileNav
            currentPage={currentScreen}
            onNavigate={(page) => navigate(page as AppScreen)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
