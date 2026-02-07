import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Image src="/brand/scib-badge.png" alt="SCIB Badge" width={48} height={48} priority />
            <div>
              <div className="text-xs text-slate-400">SCIB Secure Access</div>
              <h1 className="text-xl font-semibold">Welcome Back</h1>
            </div>
          </div>

          <Link href="/" className="text-sm text-slate-300 hover:text-white">
            Exit
          </Link>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="text-sm text-slate-300">Signed in as</div>
              <div className="text-2xl font-semibold">Detective Kelly</div>
              <div className="text-slate-300">
                Badge Number: <span className="font-medium text-slate-100">SCIB-2972</span>
              </div>

              <div className="pt-4 space-y-3">
                <Link
                  href="/cases/silent-switchboard"
                  className="block rounded-xl bg-blue-600 hover:bg-blue-500 transition px-4 py-3 font-medium text-center"
                >
                  Enter SCIB Database
                </Link>

                <Link
                  href="/login"
                  className="block rounded-xl border border-slate-700 hover:bg-slate-900 transition px-4 py-3 font-medium text-center"
                >
                  Back to Login
                </Link>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                Prototype: this screen will later load your real badge details from the database.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs text-slate-400 pb-3">SCIB Identification</div>

              <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
                <Image
                  src="/brand/detective-kelly-badge.png"
                  alt="Detective Kelly SCIB ID"
                  width={1400}
                  height={900}
                  className="w-full h-auto"
                  priority
                />
              </div>

              <p className="text-xs text-slate-500 pt-3">
                This is currently a static image template. Next phase: generate this dynamically per user.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
