# 라북 V7-4A SEO 자동 생성 엔진

## 적용 파일

```text
package.json
scripts/generate-seo-data.mjs
lib/seo.ts
components/common/JsonLd.tsx
app/cert/[slug]/layout.tsx
app/sitemap.ts
app/robots.ts
```

## 설치

1. ZIP 압축을 풉니다.
2. `cert-license-site` 최상위 폴더에 그대로 복사합니다.
3. `package.json`은 덮어씁니다.
4. 나머지는 같은 경로에 복사합니다.
5. 기존 `app/cert/[slug]/page.tsx`는 수정하지 않습니다.

## 실행

```powershell
npm run generate:seo
```

성공하면 다음 파일이 생성됩니다.

```text
data/generated/seo-pages.json
```

## 자동으로 적용되는 SEO

- title
- description
- keywords
- canonical
- Open Graph
- Twitter Card
- robots
- Breadcrumb JSON-LD
- WebPage JSON-LD
- EducationalOccupationalCredential
- FAQPage JSON-LD
- sitemap.xml
- robots.txt
- lastModified

## 사이트 주소 설정

`.env.local` 파일에 실제 배포 주소를 넣습니다.

```env
NEXT_PUBLIC_SITE_URL=https://대표님도메인.com
```

아직 자체 도메인이 없다면 현재 Vercel 주소를 사용합니다.

```env
NEXT_PUBLIC_SITE_URL=https://cert-license-site.vercel.app
```

주소 끝에는 `/`를 넣지 않습니다.

## build 자동 순서

```text
JSON 검증
→ 검색 인덱스 생성
→ 내부 링크 생성
→ SEO 데이터 생성
→ Next.js 빌드
```

## sitemap과 robots 확인 주소

로컬 실행 후:

```text
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
```

## 자격증 JSON의 SEO 우선순위

JSON에 다음 값이 있으면 그대로 사용합니다.

```json
"seo": {
  "title": "컴퓨터활용능력 1급 시험정보·난이도·합격전략 | 라북",
  "description": "컴활1급의 응시자격, 시험과목, 난이도와 합격전략을 확인하세요.",
  "keywords": [
    "컴활1급",
    "컴퓨터활용능력 1급"
  ]
}
```

없으면 basic, hero, category, agency를 이용해 자동 생성합니다.

## 중요

`data/generated/seo-pages.json`은 직접 수정하지 않습니다.
원본 자격증 JSON을 수정한 뒤 `npm run generate:seo`를 다시 실행합니다.
