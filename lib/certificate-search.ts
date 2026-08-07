export type SearchableCertificate = {
  slug: string;
  name: string;
  shortName?: string;
  aliases?: string[];
  category?: string;
  licenseType?: string;
  agency?: string;
};

export function normalizeCertificateSearch(value: string): string {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .replace(/[\s·ㆍ._\-()/[\]{}]+/g, "");
}

export function getCertificateSearchTerms(
  item: SearchableCertificate,
): string[] {
  return [
    item.name,
    item.shortName,
    ...(item.aliases ?? []),
    item.category,
    item.licenseType,
    item.agency,
  ].filter((value): value is string => Boolean(value?.trim()));
}

export function matchesCertificateQuery(
  item: SearchableCertificate,
  query: string,
): boolean {
  const normalizedQuery = normalizeCertificateSearch(query);
  if (!normalizedQuery) return true;

  return getCertificateSearchTerms(item).some((term) =>
    normalizeCertificateSearch(term).includes(normalizedQuery),
  );
}

export function findExactCertificate(
  items: SearchableCertificate[],
  query: string,
): SearchableCertificate | undefined {
  const normalizedQuery = normalizeCertificateSearch(query);
  if (!normalizedQuery) return undefined;

  return items.find((item) =>
    [item.name, item.shortName, ...(item.aliases ?? [])]
      .filter((value): value is string => Boolean(value?.trim()))
      .some((term) => normalizeCertificateSearch(term) === normalizedQuery),
  );
}

export function rankCertificateMatches(
  items: SearchableCertificate[],
  query: string,
  limit = 7,
): SearchableCertificate[] {
  const normalizedQuery = normalizeCertificateSearch(query);
  if (!normalizedQuery) return [];

  return items
    .filter((item) => matchesCertificateQuery(item, query))
    .map((item) => {
      const names = [item.name, item.shortName, ...(item.aliases ?? [])]
        .filter((value): value is string => Boolean(value?.trim()))
        .map(normalizeCertificateSearch);

      let score = 0;

      if (names.some((term) => term === normalizedQuery)) score += 100;
      if (names.some((term) => term.startsWith(normalizedQuery))) score += 50;
      if (normalizeCertificateSearch(item.name).includes(normalizedQuery))
        score += 20;
      if (
        item.shortName &&
        normalizeCertificateSearch(item.shortName).includes(normalizedQuery)
      )
        score += 15;

      return { item, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || a.item.name.localeCompare(b.item.name, "ko-KR"),
    )
    .slice(0, limit)
    .map(({ item }) => item);
}
