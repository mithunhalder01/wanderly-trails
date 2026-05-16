import Link from "next/link";
import Image from "next/image";
import { fetchSiteContent } from "@/lib/siteContent";

type PackageLike = {
  id: number;
  imageUrl: string;
  title: string;
  destinationName: string;
  price: number;
};

type ContentShape = {
  packages?: PackageLike[];
};

export default async function PackagesPage() {
  const res = await fetchSiteContent();

  // content.json shape: { destinations, packages, blogPosts, testimonials, settings }
  const packages: PackageLike[] =
    res.ok && res.data && typeof res.data === "object"
      ? ((res.data as ContentShape).packages ?? [])
      : [];


  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold">Tour Packages from India</h1>
      <p className="mt-3 text-muted-foreground">
        Explore curated itineraries with clear inclusions, pricing, and highlights.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((p) => (
          <article key={p.id} className="border rounded-2xl overflow-hidden">
            <Link href={`/packages/${p.id}`} className="block">
              <div className="relative h-52">
                <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{p.destinationName}</p>
                <p className="mt-3 font-bold">
                  ₹{Number(p.price).toLocaleString()} <span className="text-sm font-normal">/ person</span>
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}


