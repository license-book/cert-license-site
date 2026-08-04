import { NextResponse } from "next/server";
import { getCompareCertificates } from "@/lib/comparison";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const items = getCompareCertificates()
    .map((item) => ({
      slug: item.slug,
      name: item.name,
      shortName: item.shortName,
      type: item.type,
      category: item.category,
      agency: item.agency,
      applicants: item.statistics?.applicants ?? 0,
    }))
    .sort((a, b) => {
      if (b.applicants !== a.applicants) {
        return b.applicants - a.applicants;
      }

      return a.name.localeCompare(b.name, "ko-KR");
    })
    .map(({ applicants: _applicants, ...item }) => item);

  return NextResponse.json(
    { items },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
