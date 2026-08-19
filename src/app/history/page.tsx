"use client";

import { useState } from "react";
import { AppShell } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/shell";
import { StatusBadge } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/status-badge";
import { INITIAL_ORDERS } from "@/lib/mock-data";
import { Order } from "@/types/laundroflow";
import { Search, ChevronDown, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [orders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [selectedService, setSelectedService] = useState<string>("All Services");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.ticket.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All Status" || o.status === selectedStatus;
    const matchesService =
      selectedService === "All Services" || o.service === selectedService;
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalAmount = filteredOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalWeight = filteredOrders.reduce((sum, o) => sum + o.weight, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Transaction History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredOrders.length} orders &middot; ₱{totalAmount.toFixed(0)}{" "}
            total &middot; {totalWeight.toFixed(1)} kg
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-transparent text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Status Filter */}
          <div className="relative w-36">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-9 px-3 pr-8 rounded-lg border border-input bg-background text-xs font-medium shadow-2xs appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="Received">Received</option>
              <option value="Washing">Washing</option>
              <option value="Drying">Drying</option>
              <option value="Ready">Ready</option>
              <option value="Claimed">Claimed</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none opacity-50" />
          </div>

          {/* Service Filter */}
          <div className="relative w-40">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full h-9 px-3 pr-8 rounded-lg border border-input bg-background text-xs font-medium shadow-2xs appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <option value="All Services">All Services</option>
              <option value="Wash, Dry & Fold">Wash, Dry & Fold</option>
              <option value="Wash Only">Wash Only</option>
              <option value="Dry Clean">Dry Clean</option>
              <option value="Press Only">Press Only</option>
              <option value="Comforter">Comforter</option>
              <option value="Curtains">Curtains</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none opacity-50" />
          </div>
        </div>

        {/* List / Table of Transactions */}
        <div className="space-y-2">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/20 transition-all flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md shrink-0">
                  {order.ticket}
                </span>
                <div>
                  <h4 className="font-medium text-sm text-foreground">
                    {order.customer}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {order.service} &middot; {order.weight} kg
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <StatusBadge status={order.status} size="sm" />

                {/* Payment Badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border",
                    order.paymentStatus === "Paid"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  )}
                >
                  <CreditCard className="w-3 h-3" />
                  <span>{order.paymentStatus}</span>
                </span>

                <div className="text-right min-w-[70px]">
                  <p className="font-heading font-semibold text-sm">
                    ₱{order.amount}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {order.date}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl text-xs">
              No transactions match your search/filter criteria.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
