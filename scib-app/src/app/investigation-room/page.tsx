"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type RecKey = "REC-01" | "REC-02" | "REC-03" | "REC-04";

type Activity = {
  ts: number;
  who: string;
  action: string;
};

type Note = {
  id: string;
  ts: number;
  who: string;
  text: string;
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function Page() {
  // --- Prototype identity (stubbed auth) ---
  const detective = useMemo(
    () => ({
      name: "Detective Monteith",
      badge: "1234",
      title: "SCIB Detective",
      // If you want to swap to your badge card image later, we can.
      badgeImage: "/brand/scib-badge.png",
    }),
    []
  );

  // --- Prototype: pull unlocks from the Recovery Terminal localStorage ---
  const unlockStorageKey = "scib_unlocks_silent_switchboard_v1";

  const [unlocks, setUnlocks] = useState<Record<RecKey, boolean>>({
    "REC-01": false,
    "REC-02": false,
    "REC-03": false,
    "REC-04": false,
  });

  // --- Shared state (prototype-only, localStorage) ---
  const roomKey = "scib_room_case01_v1";

  const [activity, setActivity] = useState<Activity[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState("");

  // Fake investigators for now (later: invites / realtime presence)
  const investigators = useMemo(
    () => [
      { name: "Detective Monteith", badge: "1234", status: "Online" },
      { name: "Detective Kelly", badge: "5678", status: "Offline" },
    ],
    []
  );

  // Load everything
  useEffect(() => {
    // Load unlocks
    try {
      const raw = localStorage.getItem(unlockStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setUnlocks((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}

    // Load room state
    try {
      const raw = localStorage.getItem(roomKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.activity) setActivity(parsed.activity);
        if (parsed?.notes) setNotes(parsed.notes);
      } else {
        // Seed with a first entry
        const seed: Activity[] = [
          {
            ts: Date.now(),
            who: "SYSTEM",
            action: "Investigation room initialized for Case 01.",
          },
        ];
        setActivity(seed);
        localStorage.setItem(roomKey, JSON.stringify({ activity: seed, notes: [] }));
      }
    } catch {}
  }, []);

  // Persist room state
  useEffect(() => {
    try {
      localStorage.setItem(roomKey, JSON.stringify({ activity, notes }));
    } catch {}
  }, [activity, notes]);

  // When unlocks change, write an activity entry (best-effort)
  useEffect(() => {
    // We only log when something is unlocked (not on first load if all false)
    const unlockedList = (Object.keys(unlocks) as RecKey[]).filter((k) => unlocks[k]);
    if (unlockedList.length === 0) return;

    // Create a stable signature and store it so we don't spam logs on refresh
    const sigKey = "scib_room_case01_unlock_sig_v1";
    const sig = unlockedList.sort().join(",");

    try {
      const existing = localStorage.getItem(sigKey);
      if (existing === sig) return;
      localStorage.setItem(sigKey, sig);
    } catch {}

    const newEntries: Activity[] = unlockedList.map((k) => ({
      ts: Date.now(),
      who: detective.name,
      action: `Unlocked ${k} in Recovery Terminal.`,
    }));

    // Add only entries we haven't already added (simple dedupe by action)
    setActivity((prev) => {
      const existingActions = new Set(prev.map((p) => p.action));
      const toAdd = newEntries.filter((e) => !existingActions.has(e.action));
      return toAdd.length ? [...toAdd, ...prev] : prev;
    });
  }, [unlocks, detective.name]);

  function addNote() {
    const t = noteText.trim();
    if (!t) return;

    const n: Note = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ts: Date.now(),
      who: detective.name,
      text: t,
    };

    setNotes((prev) => [n, ...prev]);
    setActivity((prev) => [
      { ts: Date.now(), who: detective.name, action: "Added a case note." },
      ...prev,
    ]);
    setNoteText("");
  }

  const solved = unlocks["REC-01"] && unlocks["REC-02"] && unlocks["REC-03"] && unlocks["REC-04"];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/brand/scib-badge.png" alt="SCIB Badge" width={48} height={48} priority />
            <div>
              <div className="text-xs text-slate-400">SCIB INVESTIGATION ROOM</div>
              <h1 className="text-xl font-semibold">Join Investigation Room</h1>
              <p className="text-sm text-slate-300">Prototype • Auth stubbed • Shared state is local for now</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cases/silent-switchboard" className="text-sm text-slate-300 hover:text-white">
              Go to Case 01
            </Link>
            <Link href="/" className="text-sm text-slate-300 hover:text-white">
              Home
            </Link>
          </div>
        </header>

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Panel title="Detective Identity">
            <div className="flex items-center gap-4">
              <Image src={detective.badgeImage} alt="Badge" width={56} height={56} />
              <div>
                <div className="font-semibold">{detective.name}</div>
                <div className="text-sm text-slate-300">{detective.title}</div>
                <div className="text-xs text-slate-400">Badge #{detective.badge}</div>
              </div>
            </div>
            <div className="pt-3 text-xs text-slate-500">
              Later: email/SMS login + invites will populate this automatically.
            </div>
          </Panel>

          <Panel title="Active Case">
            <div className="space-y-2">
              <div className="font-semibold">Case 01 — The Silent Switchboard</div>
              <div className="flex flex-wrap gap-2">
                <Tag>SCIB-CC-1991-022</Tag>
                <Tag>Status: {solved ? "SOLVED" : "IN PROGRESS"}</Tag>
              </div>

              <div className="pt-3 grid grid-cols-2 gap-2 text-sm">
                {(["REC-01", "REC-02", "REC-03", "REC-04"] as RecKey[]).map((k) => (
                  <div key={k} className="rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 flex items-center justify-between">
                    <span className="font-mono">{k}</span>
                    <span className={unlocks[k] ? "text-emerald-300" : "text-slate-500"}>
                      {unlocks[k] ? "UNLOCKED" : "LOCKED"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex gap-3">
                <Link
                  href="/cases/silent-switchboard/recovered"
                  className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-900 transition px-4 py-2 text-sm font-medium text-center"
                >
                  Recovery Terminal
                </Link>
                <Link
                  href="/cases/silent-switchboard/case-resolution"
                  className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-900 transition px-4 py-2 text-sm font-medium text-center"
                >
                  Case Resolution
                </Link>
              </div>
            </div>
          </Panel>

          <Panel title="Investigators">
            <div className="space-y-2">
              {investigators.map((p) => (
                <div key={p.badge} className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-400">Badge #{p.badge}</div>
                  </div>
                  <div className={`text-xs ${p.status === "Online" ? "text-emerald-300" : "text-slate-500"}`}>
                    {p.status}
                  </div>
                </div>
              ))}
              <div className="text-xs text-slate-500 pt-2">
                Later: invite links per case + live presence.
              </div>
            </div>
          </Panel>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Shared Activity Log">
            <div className="space-y-2">
              {activity.slice(0, 10).map((a, idx) => (
                <div key={`${a.ts}-${idx}`} className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-medium">{a.who}</div>
                    <div className="text-xs text-slate-500">{new Date(a.ts).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-slate-200 mt-1">{a.action}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Shared Notes">
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-800 bg-black px-4 py-3">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note for your team (prototype: stored locally)…"
                  className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 min-h-[90px] resize-none"
                />
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={addNote}
                    className="rounded-xl border border-slate-700 hover:bg-slate-900 transition px-4 py-2 text-sm font-medium"
                  >
                    Add Note
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {notes.slice(0, 6).map((n) => (
                  <div key={n.id} className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-medium">{n.who}</div>
                      <div className="text-xs text-slate-500">{new Date(n.ts).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-slate-200 mt-2 whitespace-pre-wrap">{n.text}</div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-500">
                Later: real multiplayer syncing (database + websockets).
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}
