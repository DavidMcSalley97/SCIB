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
              <h1 className="text-xl font-semibold">Evidence List</h1>
              <p className="text-sm text-slate-300">Logged items • Chain-of-custody (stub)</p>
            </div>
          </div>
          <Link href="/cases/silent-switchboard" className="text-sm text-slate-300 hover:text-white">Back to Case</Link>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
          <p className="text-slate-200">
            This is a stub page. Next phase: render real content from the database and store media in the Evidence Vault.
          </p>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm text-slate-200">
            <div className="text-xs text-slate-400 pb-1">Current Path</div>
            <div className="font-mono">.\src\app\cases\silent-switchboard\case-file\evidence-list\page.tsx</div>
          </div>
        </section>
      </div>
    </main>
  );
}
