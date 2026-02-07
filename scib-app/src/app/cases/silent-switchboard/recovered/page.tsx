import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Image src="/brand/scib-badge.png" alt="SCIB Badge" width={48} height={48} priority />
            <div>
              <div className="text-xs text-slate-400">SCIB Case Database</div>
              <h1 className="text-xl font-semibold">Recovered Evidence</h1>
              <p className="text-sm text-slate-300">LOCKED — requires retrieval keys</p>
            </div>
          </div>
          <Link href="/cases/silent-switchboard" className="text-sm text-slate-300 hover:text-white">Back to Case</Link>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="text-sm font-medium">Access Restricted</div>
            <p className="text-slate-200 mt-2">
              This directory is locked. Use the Recovery Terminal to retrieve REC packages using keys found in the official case file.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Prototype: next step is building the Recovery Terminal UI and storing unlocks in the database.
          </div>
        </section>
      </div>
    </main>
  );
}
