import fs from "node:fs";
import path from "node:path";
import type { CertificateData, CertificateKind } from "./types";

const ROOT = path.join(process.cwd(), "data", "certificates");
const KIND_FOLDERS: CertificateKind[] = ["national", "private"];

function candidates(slug: string): string[] {
  return [
    path.join(ROOT, `${slug}.json`),
    ...KIND_FOLDERS.map((kind) => path.join(ROOT, kind, `${slug}.json`)),
  ];
}

export function getCertificatePath(slug: string): string | null {
  return candidates(slug).find((file) => fs.existsSync(file)) ?? null;
}

export function loadCertificate(slug: string): CertificateData | null {
  const file = getCertificatePath(slug);
  if (!file) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf-8")) as CertificateData;
    if (data.basic?.slug !== slug) {
      console.error(`자격증 slug 불일치: ${file}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error(`자격증 JSON 읽기 실패: ${slug}`, error);
    return null;
  }
}
