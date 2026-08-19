"use client";

import { useState } from "react";
import { AppShell } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/shell";
import { INITIAL_REWARDS } from "@/lib/mock-data";
import { Reward } from "@/types/laundroflow";
import { Gift, Droplets, Percent, CheckCircle2 } from "lucide-react";

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);

  const availableRewards = rewards.filter((r) => !r.isRedeemed);
  const redeemedRewards = rewards.filter((r) => r.isRedeemed);

  const handleRedeem = (id: string) => {
    setRewards((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              isRedeemed: true,
              redeemedAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
            }
          : r
      )
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Rewards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {availableRewards.length} available &middot; {redeemedRewards.length}{" "}
            redeemed
          </p>
        </div>

        {/* Available Rewards */}
        <div className="space-y-3">
          <h2 className="font-heading text-sm font-semibold flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-500" />
            <span>Available Rewards</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRewards.map((reward) => (
              <div
                key={reward.id}
                className="rounded-xl border border-amber-500/20 bg-amber-500/5 text-card-foreground shadow-xs p-5 space-y-4 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                    {reward.title.includes("Wash") ? (
                      <Droplets className="w-5 h-5" />
                    ) : (
                      <Percent className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm font-heading">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {reward.description}
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1 font-mono">
                      Member: {reward.member}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRedeem(reward.id)}
                  className="w-full py-2 px-4 rounded-lg bg-amber-500 text-white font-medium text-xs shadow-xs hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  Mark as Redeemed
                </button>
              </div>
            ))}
            {availableRewards.length === 0 && (
              <div className="col-span-full py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                No available rewards to redeem.
              </div>
            )}
          </div>
        </div>

        {/* Redemption History */}
        <div className="space-y-3 pt-4">
          <h2 className="font-heading text-sm font-semibold">
            Redemption History
          </h2>

          <div className="rounded-xl border border-border bg-card text-card-foreground shadow-xs">
            {redeemedRewards.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No redeemed rewards yet.
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {redeemedRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="p-4 flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="font-medium text-xs">{reward.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {reward.description} &middot; Member: {reward.member}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      Redeemed {reward.redeemedAt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
