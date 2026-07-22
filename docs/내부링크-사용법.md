# 라북 V7-3 내부 링크 자동 생성 엔진

## 적용 파일

```text
package.json
scripts/generate-internal-links.mjs
lib/related-certificates.ts
docs/내부링크-사용법.md
```

## 설치

1. ZIP 압축을 풉니다.
2. `cert-license-site` 최상위 폴더에 그대로 복사합니다.
3. `package.json`과 `lib/related-certificates.ts`를 덮어씁니다.
4. 기존 V7-1, V7-2 스크립트는 그대로 둡니다.

## 직접 실행

```powershell
npm run generate:links
```

성공하면 다음 파일이 만들어집니다.

```text
data/generated/internal-links.json
```

## 자동 생성 규칙

수동 지정 관계를 가장 먼저 사용합니다.

```text
data/related/related-certificates.json
```

카드 수가 4개보다 부족하면 다음 기준으로 자동 보충합니다.

```text
1. 같은 카테고리
2. 같은 국가·민간 유형
3. 같은 자격 종류
4. 같은 시행기관
5. 실제 상세 JSON이 존재하는 자격증 우선
```

## 비교 링크

`data/catalog/comparisons.json`에 비교 slug가 존재하면 자동 관계에 비교 정보를 연결합니다.

비교 버튼의 실제 활성화 여부는 기존과 동일하게:

```json
"enabled": true
```

인 경우에만 활성화됩니다.

## build 자동 순서

```text
JSON 검증
→ 검색 인덱스 생성
→ 내부 링크 생성
→ Next.js 빌드
```

## 중요한 관리 원칙

직접 수정하는 파일:

```text
data/certificates/*.json
data/catalog/certificates.json
data/catalog/comparisons.json
data/related/related-certificates.json
```

직접 수정하지 않는 자동 생성 파일:

```text
data/generated/internal-links.json
```

자동 생성 결과가 마음에 들지 않는 자격증은 `related-certificates.json`에 원하는 순서로 직접 지정하면 수동 관계가 우선됩니다.

## 현재 자격증 JSON이 1개뿐일 때

실제 상세 JSON은 컴활1급 1개지만 catalog에 후보가 등록되어 있으므로 관련 카드는 생성될 수 있습니다.

단, 대상 상세 JSON이 아직 없으면 기존 UI 규칙에 따라 `상세 준비 중`으로 표시됩니다.
