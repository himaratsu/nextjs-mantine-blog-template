import Link from "next/link";

export function LayoutHeader() {
  return (
    <header className="bg-gray-200">
      <div className="py-2 container mx-auto">
        <Link href="/">
          <h5 className="font-bold text-lg font-mono ml-0 hover:underline">
            microSite
          </h5>
        </Link>
      </div>
    </header>
  );
}
