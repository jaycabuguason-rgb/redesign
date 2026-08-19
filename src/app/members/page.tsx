"use client";

import { useState } from "react";
import { AppShell } from "@/components/sites/incredible-laundro-flow-hub-1b466f4e/shared/shell";
import { INITIAL_MEMBERS } from "@/lib/mock-data";
import { Member } from "@/types/laundroflow";
import { UserPlus, Search, Phone, Stamp, Award, RotateCcw, Scale } from "lucide-react";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm)
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberPhone) return;
    const newM: Member = {
      id: Date.now().toString(),
      name: newMemberName,
      phone: newMemberPhone,
      email: newMemberEmail,
      stamps: 0,
      totalStamps: 7,
      visits: 0,
      kgWashed: 0,
      rewards: 0,
    };
    setMembers([newM, ...members]);
    setShowAddModal(false);
    setNewMemberName("");
    setNewMemberPhone("");
    setNewMemberEmail("");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-heading text-2xl font-bold">Loyalty Members</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {members.length} registered members
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-transparent text-sm shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-base">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{member.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
                  <Stamp className="w-3.5 h-3.5" />
                  <span>
                    {member.stamps}/{member.totalStamps} stamps
                  </span>
                </div>
              </div>

              {/* Stamp Cards Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Loyalty Progress</span>
                  <span className="font-medium text-foreground">
                    {Math.round((member.stamps / member.totalStamps) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${(member.stamps / member.totalStamps) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50 text-center">
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    <span>Visits</span>
                  </p>
                  <p className="font-heading font-bold text-sm">
                    {member.visits}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Scale className="w-3 h-3" />
                    <span>kg Washed</span>
                  </p>
                  <p className="font-heading font-bold text-sm">
                    {member.kgWashed}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Award className="w-3 h-3 text-primary" />
                    <span>Rewards</span>
                  </p>
                  <p className="font-heading font-bold text-sm text-primary">
                    {member.rewards}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {filteredMembers.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
              No members found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h2 className="font-heading text-lg font-bold">Add New Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="09171234567"
                  value={newMemberPhone}
                  onChange={(e) => setNewMemberPhone(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-sm shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
