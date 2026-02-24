import React from "react";
import {
  User,
  Settings,
  Bell,
  Moon,
  Sun,
  Monitor,
  Lock,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ProfileProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Profile({ onNavigate, onLogout }: ProfileProps) {
  const { theme, setTheme } = useTheme();

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Information",
          description: "Update your personal details",
          action: () => {},
        },
        {
          icon: Settings,
          label: "Account Settings",
          description: "Manage your account preferences",
          action: () => {},
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          description: "Configure notification settings",
          action: () => {},
        },
        {
          icon: theme === "light" ? Sun : theme === "dark" ? Moon : Monitor,
          label: "Appearance",
          description: `Current: ${theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"}`,
          action: () => {},
          showThemeDialog: true,
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          icon: Lock,
          label: "Privacy Settings",
          description: "Control your privacy preferences",
          action: () => {},
        },
      ],
    },
    {
      title: "Subscription",
      items: [
        {
          icon: CreditCard,
          label: "Upgrade to Premium",
          description: "Get advanced features",
          action: () => {},
        },
        {
          icon: CreditCard,
          label: "Billing History",
          description: "View your payment history",
          action: () => {},
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <h2 className="text-foreground mb-6">Profile</h2>

      {/* User Info */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-foreground">John Doe</h3>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>
      </Card>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <div key={section.title} className="mb-6">
          <h4 className="text-foreground mb-3">{section.title}</h4>
          <Card className="overflow-hidden">
            {section.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  {item.showThemeDialog ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div className="text-left">
                              <p className="text-foreground">{item.label}</p>
                              <p className="text-muted-foreground text-xs">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Appearance</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 pt-4">
                          <button
                            onClick={() => setTheme("light")}
                            className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                              theme === "light"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted"
                            }`}
                          >
                            <Sun className="h-5 w-5" />
                            <span>Light</span>
                          </button>
                          <button
                            onClick={() => setTheme("dark")}
                            className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                              theme === "dark"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted"
                            }`}
                          >
                            <Moon className="h-5 w-5" />
                            <span>Dark</span>
                          </button>
                          <button
                            onClick={() => setTheme("system")}
                            className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                              theme === "system"
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted"
                            }`}
                          >
                            <Monitor className="h-5 w-5" />
                            <span>System</span>
                          </button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <button
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="text-foreground">{item.label}</p>
                          <p className="text-muted-foreground text-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                  {index < section.items.length - 1 && (
                    <div className="border-b border-border" />
                  )}
                </div>
              );
            })}
          </Card>
        </div>
      ))}

      {/* Logout */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="p-4 cursor-pointer hover:bg-destructive/5 transition-colors">
            <div className="flex items-center gap-3 text-destructive">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-4">
            Are you sure you want to log out?
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={onLogout}
            >
              Log Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
