import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type CertificateType = "national" | "private";

type CertificateJson = {
  basic?: {
    slug?: string;
    type?: CertificateType;
  };
};

const CERTIFICATE_ROOT = path.join(process.cwd(), "data", "certificates");

function collectJsonFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectJsonFiles(target);
    }

    return entry.isFile() && entry.name.endsWith(".json") ? [target] : [];
  });
}

function findCertificateType(slug: string): CertificateType | null {
  const files = collectJsonFiles(CERTIFICATE_ROOT);

  for (const file of files) {
    try {
      const certificate = JSON.parse(
        fs.readFileSync(file, "utf-8"),
      ) as CertificateJson;

      if (certificate.basic?.slug === slug) {
        return certificate.basic.type ?? null;
      }
    } catch (error) {
      console.error(`자격증 유형 확인 실패: ${file}`, error);
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json(
      { message: "slug가 필요합니다." },
      { status: 400 },
    );
  }

  const type = findCertificateType(slug);

  if (!type) {
    return NextResponse.json(
      { message: "자격증 유형을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { type },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
