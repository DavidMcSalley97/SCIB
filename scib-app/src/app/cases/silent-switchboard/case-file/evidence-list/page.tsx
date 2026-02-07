import Image from "next/image";
import Link from "next/link";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <Tag>SCIB-CC-1991-022</Tag>
      </div>
      <div className="text-slate-200 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function HintBlock({
  label,
  hint1,
  hint2,
  hint3,
}: {
  label: string;
  hint1: string;
  hint2: string;
  hint3: string;
}) {
  return (
    <details className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
      <summary className="cursor-pointer select-none flex items-center justify-between gap-3">
        <span className="font-medium">Hints: {label}</span>
        <span className="text-xs text-slate-500">Click to reveal</span>
      </summary>

      <div className="mt-4 space-y-3 text-sm text-slate-200">
        <details className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <summary className="cursor-pointer select-none font-medium">Hint 1 (nudge)</summary>
          <div className="mt-2 text-slate-200">{hint1}</div>
        </details>

        <details className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <summary className="cursor-pointer select-none font-medium">Hint 2 (direction)</summary>
          <div className="mt-2 text-slate-200">{hint2}</div>
        </details>

        <details className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
          <summary className="cursor-pointer select-none font-medium">Hint 3 (near-solve)</summary>
          <div className="mt-2 text-slate-200">{hint3}</div>
        </details>
      </div>
    </details>
  );
}

function EvidenceTable() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/30 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/50">
        <div className="text-xs text-slate-400">EVIDENCE REGISTER</div>
        <div className="font-mono text-sm">West Harrow Exchange • Intake Log</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-400 bg-slate-950/40">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Ref</th>
              <th className="text-left px-5 py-3 font-medium">Item</th>
              <th className="text-left px-5 py-3 font-medium">Collected</th>
              <th className="text-left px-5 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr className="align-top">
              <td className="px-5 py-4 font-mono">E-01</td>
              <td className="px-5 py-4">Lanyard + Access Card</td>
              <td className="px-5 py-4">03/05/91 04:22</td>
              <td className="px-5 py-4 text-slate-200">
                Card label: <span className="font-mono">MKELLS</span>. Lanyard clip fractured (fresh).
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-5 py-4 font-mono">E-02</td>
              <td className="px-5 py-4">Coffee Cup</td>
              <td className="px-5 py-4">03/05/91 04:28</td>
              <td className="px-5 py-4 text-slate-200">
                Cosmetic transfer on rim (lipstick). No matching statement in initial interviews.
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-5 py-4 font-mono">E-03</td>
              <td className="px-5 py-4">Dot-matrix Access Log (partial)</td>
              <td className="px-5 py-4">03/05/91 04:35</td>
              <td className="px-5 py-4 text-slate-200">
                Header stamp: <span className="font-mono">WHX/OPS</span>. Internal reference printed faintly at footer:
                <span className="font-mono"> 1991-022-03</span>.
                <div className="text-xs text-slate-500 mt-2">
                  (SCIB note: this footer reference completes the retrieval key hinted in Crime Scene Summary.)
                </div>
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-5 py-4 font-mono">E-04</td>
              <td className="px-5 py-4">Engineer Notebook Page</td>
              <td className="px-5 py-4">03/05/91 04:41</td>
              <td className="px-5 py-4 text-slate-200">
                Handwritten line: <span className="font-mono">DON’T TRUST THE SWITCHBOARD</span>.
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-5 py-4 font-mono">E-05</td>
              <td className="px-5 py-4">Master Key Inventory Sheet</td>
              <td className="px-5 py-4">—</td>
              <td className="px-5 py-4 text-slate-200">
                Reported missing during first sweep. Located later (unverified chain-of-custody).
                <span className="ml-2 inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-300">
                  FLAG
                </span>
              </td>
            </tr>

            <tr className="align-top">
              <td className="px-5 py-4 font-mono">E-06</td>
              <td className="px-5 py-4">Maintenance Console Printout</td>
              <td className="px-5 py-4">03/05/91 05:12</td>
              <td className="px-5 py-4 text-slate-200">
                Console placed into routine maintenance mode. No technician name recorded on first print.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
              <p className="text-sm text-slate-300">Property & Intake Register • Extract</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#hints"
              className="rounded-xl border border-slate-700 hover:bg-slate-900 transition px-4 py-2 text-sm font-medium"
            >
              Hints
            </a>
            <Link href="/cases/silent-switchboard" className="text-sm text-slate-300 hover:text-white">
              Back to Case
            </Link>
          </div>
        </header>

        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <div className="text-xs text-slate-400">CASE</div>
                <div className="font-medium">SCIB-CC-1991-022 • The Silent Switchboard</div>
              </div>
              <div className="sm:text-right">
                <div className="text-xs text-slate-400">REGISTER STATUS</div>
                <div className="font-medium">Incomplete chain-of-custody noted</div>
              </div>
            </div>

            <p className="text-slate-200 text-sm">
              Items below are taken from the original intake log with SCIB annotations added on reopen.
              Several entries contain system stamps and reference numbers that may function as retrieval keys.
            </p>
          </div>

          <Panel title="Evidence Register (extract)">
            <EvidenceTable />
          </Panel>

          <Panel title="SCIB Analyst Notes (added on reopen)">
            <div className="space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                <div className="text-xs text-slate-400">NOTE 01 • RETRIEVAL HINT</div>
                <div className="mt-1">
                  The access log footer reference <span className="font-mono">1991-022-03</span> is likely required alongside the
                  header stamp <span className="font-mono">WHX/OPS</span>.
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                <div className="text-xs text-slate-400">NOTE 02</div>
                <div className="mt-1">
                  Missing chain-of-custody on the Master Key sheet is notable. If the sheet reappeared later, identify who “found” it.
                </div>
              </div>
            </div>
          </Panel>

          {/* Hints section */}
          <div id="hints" className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Hints</h2>
                <p className="text-xs text-slate-500">Expand only if you’re stuck.</p>
              </div>
              <Link href="/cases/silent-switchboard" className="text-sm text-slate-300 hover:text-white">
                Back to Case
              </Link>
            </div>

            <HintBlock
              label="Access log retrieval key (stamp + digits)"
              hint1="One evidence item mentions a header stamp and also a faint footer reference."
              hint2="The Crime Scene Summary told you to look here for appended digits."
              hint3="Use WHX/OPS plus the footer reference 1991-022-03 (combine in the Recovery Terminal format you decide later)."
            />

            <HintBlock
              label="Coffee cup significance"
              hint1="The autopsy mentions coffee close to time of death."
              hint2="The crime scene mentions lipstick transfer on the cup."
              hint3="It suggests someone else handled or drank from the cup, or the cup was used to dose the sedative."
            />

            <HintBlock
              label="Master key sheet anomaly"
              hint1="One item was missing during the first sweep."
              hint2="It later reappeared with no verified chain-of-custody."
              hint3="That’s a classic sign of evidence manipulation — track who reported it ‘found’ later (future recovered memo)."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/cases/silent-switchboard"
              className="rounded-xl border border-slate-700 hover:bg-slate-900 transition px-4 py-3 font-medium text-center"
            >
              Back to Case
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
