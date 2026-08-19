"use client";

import { useState } from "react";
import { AppShell } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/shell";
import { StatusBadge } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/status-badge";
import { INITIAL_ORDERS } from "@/lib/mock-data";
import { Order, OrderStatus } from "@/types/laundroflow";
import { Inbox, Droplets, Wind, CheckCircle, Check, Clock, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS: { status: OrderStatus; icon: React.ElementType; colorClass: string; bgClass: string; borderClass: string }[] = [
  {
    status: "Received",
    icon: Inbox,
    colorClass: "text-primary",
    bgClass: "bg-primary/5",
    borderClass: "border-primary/30",
  },
  {
    status: "Washing",
    icon: Droplets,
    colorClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-500/5",
    borderClass: "border-cyan-500/30",
  },
  {
    status: "Drying",
    icon: Wind,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500/5",
    borderClass: "border-amber-500/30",
  },
  {
    status: "Ready",
    icon: CheckCircle,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500/5",
    borderClass: "border-emerald-500/30",
  },
  {
    status: "Claimed",
    icon: Check,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/30",
    borderClass: "border-border",
  },
];

export default function OrderBoardPage() {
  const [orders] = useState<Order[]>(INITIAL_ORDERS);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Order Board</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage all laundry orders
          </p>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {COLUMNS.map((col) => {
            const ColumnIcon = col.icon;
            const columnOrders = orders.filter((o) => o.status === col.status);

            return (
              <div
                key={col.status}
                className={cn(
                  "flex-shrink-0 w-72 rounded-xl border-2 p-3 space-y-3",
                  col.borderClass,
                  col.bgClass
                )}
              >
                {/* Column Header */}
                <div className="flex items-center gap-2 px-1">
                  <ColumnIcon className={cn("w-4 h-4", col.colorClass)} />
                  <h3 className="font-heading text-sm font-semibold">
                    {col.status}
                  </h3>
                  <span className="ml-auto text-xs font-medium bg-background rounded-full px-2 py-0.5 text-muted-foreground border border-border shadow-2xs">
                    {columnOrders.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
                  {columnOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card rounded-lg border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {order.ticket}
                        </span>
                        <StatusBadge status={order.status} size="sm" />
                      </div>

                      <h4 className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                        {order.customer}
                      </h4>

                      <p className="text-xs text-muted-foreground mb-3 font-medium">
                        {order.service}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5" />
                          <span>{order.weight} kg</span>
                        </div>
                        <span className="font-semibold text-foreground">
                          ₱{order.amount.toFixed(2)}
                        </span>
                      </div>

                      {order.eta && (
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground/80 mt-2">
                          <Clock className="w-3 h-3" />
                          <span>ETA: {order.eta}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {columnOrders.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/60 rounded-lg">
                      No orders in {col.status}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
