export type CertificateIndexingInput = {
  slug: string;
  type?: string;
  explicitNoIndex?: boolean;
};

// AdSense/검색 품질 점검 기간에는 민간자격 상세페이지를 보수적으로 운영합니다.
// 국가자격은 기존대로 색인하고, 민간자격은 품질 검토 후 A등급으로 승인된 slug만 다시 색인합니다.
// 페이지 자체를 삭제하지 않으므로 라북 내부 탐색과 직접 URL 접근은 계속 가능합니다.
const APPROVED_PRIVATE_SLUGS = new Set<string>([
  "barista",
  "personal-color-consultant",
  "pet-behavior-specialist",
  "pet-funeral-director",
  "pet-grooming-specialist",
  "fitness-trainer",
  "pilates-instructor",
  "yoga-instructor",
  "video-editing-specialist",
  "coding-instructor",
  "chatgpt-specialist",
  "smart-store-specialist",
  "ai-utilization-specialist",
  "digital-literacy-instructor",
  "pet-sitter",
  "pet-trainer",
  "wine-sommelier",
  "tea-sommelier",
  "home-organizing-specialist",
  "shopping-mall-manager",
  "live-commerce-specialist",
  "software-education-instructor",
  "dog-walker",
  "personal-branding-specialist",
]);

export function isCertificateIndexable({
  slug,
  type,
  explicitNoIndex,
}: CertificateIndexingInput): boolean {
  if (explicitNoIndex) return false;
  if (type !== "private") return true;
  return APPROVED_PRIVATE_SLUGS.has(slug);
}

export function isSeoPageIndexable(page: { slug: string; type?: string }): boolean {
  return isCertificateIndexable({ slug: page.slug, type: page.type });
}
