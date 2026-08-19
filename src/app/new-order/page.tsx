"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/shell";
import { SERVICE_PRICES } from "@/lib/mock-data";
import { ServiceType } from "@/types/laundroflow";
import { Check } from "lucide-react";

export default function NewOrderPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceType>("Wash, Dry & Fold");
  const [weight, setWeight] = useState<string>("");
  const [fabricSoftener, setFabricSoftener] = useState(false);
  const [fold, setFold] = useState(false);
  const [notes, setNotes] = useState("");

  const currentServiceObj = SERVICE_PRICES.find((s) => s.type === selectedService) || SERVICE_PRICES[0];
  const numericWeight = parseFloat(weight) || 0;
  const totalAmount = numericWeight * currentServiceObj.pricePerKg;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order creation
    router.push("/orders");
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="font-heading text-2xl font-bold">New Order</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information Card */}
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-xs">
            <div className="p-6 pb-2 border-b border-border/50">
              <h2 className="font-heading font-semibold text-base">
                Customer Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Customer name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Email (for loyalty)
                </label>
                <input
                  type="email"
                  placeholder="Customer email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Service Details Card */}
          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-xs">
            <div className="p-6 pb-2 border-b border-border/50">
              <h2 className="font-heading font-semibold text-base">
                Service Details
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Service Type *</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value as ServiceType)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  >
                    {SERVICE_PRICES.map((s) => (
                      <option key={s.type} value={s.type}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    placeholder="0.0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>

              {/* Add-ons checkboxes */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fabricSoftener}
                    onChange={(e) => setFabricSoftener(e.target.checked)}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-primary accent-primary"
                  />
                  <span>Fabric Softener</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fold}
                    onChange={(e) => setFold(e.target.checked)}
                    className="w-4 h-4 rounded border-input text-primary focus:ring-primary accent-primary"
                  />
                  <span>Fold</span>
                </label>
              </div>

              {/* Special Notes */}
              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium">Special Notes</label>
                <textarea
                  rows={3}
                  placeholder="Any special instructions for handling..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          {/* Total Amount & Submit Card */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total Amount
                </p>
                <p className="text-3xl font-heading font-bold text-primary mt-0.5">
                  ₱{totalAmount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {numericWeight} kg &times; ₱{currentServiceObj.pricePerKg}/kg
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-md hover:bg-primary/90 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Create Order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
