import SingleAthletePage from "@/app/athlete/[id]/page";
import { prisma } from "@/util/connect";

type SearchPageProps = {
  searchParams: { query: string };
};

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.athlete.findMany({
    where: {
      OR: [{ name: { contains: query, mode: "insensitive" } }],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0)
    return (
      <div className="text-3xl text-center">
        No product is matched with {query}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-4 my-4 mx-2">
      {products.map((product) =>
        SingleAthletePage({ params: { id: product.id } })
      )}
    </div>
  );
}
