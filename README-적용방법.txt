가이드 공통 엔진 적용 파일

[덮어쓰기]
app/guide/page.tsx

[신규 추가]
app/guide/[slug]/page.tsx
components/guide/GuideRenderer.tsx
components/guide/GuideHero.tsx
components/guide/GuideToc.tsx
components/guide/GuideSummary.tsx
components/guide/GuideContent.tsx
components/guide/GuideFAQ.tsx
components/guide/RelatedGuides.tsx
components/guide/GuideCTA.tsx
lib/guide-engine/index.ts
lib/guide-engine/loader.ts
lib/guide-engine/seo.ts
lib/guide-engine/types.ts
data/guides/how-to-choose-certificate.json

현재 완성된 대표 상세페이지:
/guide/how-to-choose-certificate

앞으로 data/guides/[slug].json 파일을 추가하면 app/guide/[slug]/page.tsx가 자동으로 상세페이지를 생성합니다.
가이드 허브 메뉴는 해당 JSON이 완성된 항목부터 slug를 넣어 연결하면 됩니다.


[1차 처음 시작하기 추가 완료]
- data/guides/national-vs-private-certificate.json
- data/guides/written-vs-practical-exam.json
- data/guides/what-is-cbt.json
- app/guide/page.tsx: 처음 시작하기 4개 메뉴 전체 링크 연결
