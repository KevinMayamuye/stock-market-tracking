import React, { useState } from "react";
import { Plus, Bell as BellIcon, Trash2, Edit, BellOff } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { EmptyState } from "../design-system/EmptyState";

interface Alert {
  id: string;
  symbol: string;
  type: string;
  condition: string;
  value: number;
  active: boolean;
}

export function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      symbol: "AAPL",
      type: "Price",
      condition: "above",
      value: 180,
      active: true,
    },
    {
      id: "2",
      symbol: "TSLA",
      type: "Price",
      condition: "below",
      value: 240,
      active: true,
    },
    {
      id: "3",
      symbol: "MSFT",
      type: "% Change",
      condition: "above",
      value: 5,
      active: false,
    },
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-foreground">Alerts</h2>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Stock Symbol</Label>
                <Input placeholder="e.g., AAPL" />
              </div>
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select defaultValue="price">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="percent">% Change</SelectItem>
                    <SelectItem value="volume">Volume</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select defaultValue="above">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <Button className="w-full" onClick={() => setIsCreating(false)}>
                Create Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {alerts.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title="No alerts set yet"
          description="Create alerts to get notified about important price movements"
          actionLabel="Create Alert"
          onAction={() => setIsCreating(true)}
        />
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-foreground">{alert.symbol}</h4>
                    <Badge variant={alert.active ? "default" : "secondary"}>
                      {alert.active ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {alert.type} {alert.condition} {alert.value}
                    {alert.type === "% Change" ? "%" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleAlert(alert.id)}
                  >
                    <BellIcon
                      className={`h-4 w-4 ${alert.active ? "" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Notification Settings */}
      <div className="mt-8">
        <h3 className="text-foreground mb-4">Notification Settings</h3>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-foreground">Push Notifications</h4>
                <p className="text-muted-foreground">
                  Receive push notifications for alerts
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-foreground">Email Notifications</h4>
                <p className="text-muted-foreground">
                  Receive email notifications for alerts
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-foreground">In-App Notifications</h4>
                <p className="text-muted-foreground">
                  Show in-app notifications for alerts
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
