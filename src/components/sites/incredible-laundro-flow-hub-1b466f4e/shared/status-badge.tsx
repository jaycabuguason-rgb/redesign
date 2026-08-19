import React from "react";
import { OrderStatus } from "@/types/laundroflow";
import { cn } from "@/lib/utils";
import { Droplets, Inbox, CheckCircle, Check, Wind } from "lucide-react";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
  size?: "sm" | "default";
}

export function StatusBadge({ status, className, size = "default" }: StatusBadgeProps) {
  const config = {
    Received: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
      icon: Inbox,
    },
    Washing: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-500/20",
      icon: Droplets,
    },
    Drying: {
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/20",
      icon: Wind,
    },
    Ready: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/20",
      icon: CheckCircle,
    },
    Claimed: {
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-600 dark:text-slate-400",
      border: "border-slate-200 dark:border-slate-700",
      icon: Check,
    },
  }[status] || {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    icon: Inbox,
  };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        config.bg,
        config.text,
        config.border,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-0.5 text-xs",
        className
      )}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      <span>{status}</span>
    </span>
  );
}
