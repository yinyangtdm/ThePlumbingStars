import Link from "next/link";
import ChooseArea from "./ChooseAreaClient";

export default function AreasPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-brand-navy mb-4">Choose your area</h1>
      <p className="mb-6 text-sm text-brand-navy/80">
        Select a county or enter your ZIP code to see if we service your area.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-4">
          <Link href="/losangeles" className="flex-1 text-center bg-brand-navy text-white py-3 rounded">
            Los Angeles
          </Link>
          <Link href="/ventura" className="flex-1 text-center bg-brand-navy text-white py-3 rounded">
            Ventura
          </Link>
        </div>

        <div className="bg-white border rounded p-4">
          <ChooseArea />
        </div>
      </div>
    </main>
  );
}

