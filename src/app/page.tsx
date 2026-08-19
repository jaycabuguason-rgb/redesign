"use client";

import Link from "next/link";
import { Package, DollarSign, Droplets, Users } from "lucide-react";
import { AppShell } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/shell";
import { StatusBadge } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/status-badge";
import { OrderStatusChart } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/root-8a5edab2/OrderStatusChart";
import { INITIAL_ORDERS, INITIAL_MEMBERS } from "@/lib/mock-data";

export default function DashboardPage() {
  const orders = INITIAL_ORDERS;
  const members = INITIAL_MEMBERS;

  const statusCounts = {
    Received: orders.filter((o) => o.status === "Received").length,
    Washing: orders.filter((o) => o.status === "Washing").length,
    Drying: orders.filter((o) => o.status === "Drying").length,
    Ready: orders.filter((o) => o.status === "Ready").length,
    Claimed: orders.filter((o) => o.status === "Claimed").length,
  };

  const chartData = [
    { name: "Received", count: statusCounts.Received, color: "#463ACB" },
    { name: "Washing", count: statusCounts.Washing, color: "#26ACD9" },
    { name: "Drying", count: statusCounts.Drying, color: "#F5930A" },
    { name: "Ready", count: statusCounts.Ready, color: "#2EB88A" },
    { name: "Claimed", count: statusCounts.Claimed, color: "#6E7487" },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tuesday, August 18, 2026
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Today&apos;s Orders
                </p>
                <p className="text-2xl font-heading font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">transactions today</p>
              </div>
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Package className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Revenue Today
                </p>
                <p className="text-2xl font-heading font-bold text-foreground">₱0</p>
                <p className="text-xs text-muted-foreground">total earnings</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Active Orders
                </p>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {orders.length - statusCounts.Claimed}
                </p>
                <p className="text-xs text-muted-foreground">
                  {statusCounts.Ready} ready for pickup
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Droplets className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Loyalty Members
                </p>
                <p className="text-2xl font-heading font-bold text-foreground">
                  {members.length}
                </p>
                <p className="text-xs text-muted-foreground">registered members</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Order Status Donut Chart */}
          <div className="bg-card rounded-xl border border-border p-5 lg:col-span-1">
            <h3 className="font-heading text-sm font-semibold mb-4">
              Order Status
            </h3>
            <OrderStatusChart data={chartData} />
          </div>

          {/* Recent Orders Table */}
          <div className="bg-card rounded-xl border border-border p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-sm font-semibold">
                Recent Orders
              </h3>
              <Link
                href="/orders"
                className="text-xs text-primary hover:underline font-medium"
              >
                View All &rarr;
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                    <th className="py-2.5 px-2 font-medium">Ticket</th>
                    <th className="py-2.5 px-2 font-medium">Customer</th>
                    <th className="py-2.5 px-2 font-medium hidden sm:table-cell">
                      Service
                    </th>
                    <th className="py-2.5 px-2 font-medium">Status</th>
                    <th className="py-2.5 px-2 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-2.5 px-2 font-mono text-xs text-primary font-semibold">
                        {order.ticket}
                      </td>
                      <td className="py-2.5 px-2 font-medium">{order.customer}</td>
                      <td className="py-2.5 px-2 text-muted-foreground hidden sm:table-cell text-xs capitalize">
                        {order.service}
                      </td>
                      <td className="py-2.5 px-2">
                        <StatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-2.5 px-2 text-right font-semibold">
                        ₱{order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
