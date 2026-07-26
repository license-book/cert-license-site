# 라북 최종 공통 엔진

## 목적
국가자격과 민간자격 상세페이지가 동일한 타입, 데이터 로더, 표시 규칙, 섹션 레지스트리, SEO 생성기, 렌더러를 사용한다.

## 핵심 구조
- `lib/certificate-engine/types.ts`: 단일 데이터 계약
- `lib/certificate-engine/loader.ts`: 기존 루트 JSON과 `national`/`private` 하위 폴더를 모두 지원
- `lib/certificate-engine/rules.ts`: 표시 여부와 핵심 지표 계산
- `lib/certificate-engine/section-registry.ts`: 섹션 순서, 목차명, 애니메이션 지연의 단일 기준
- `lib/certificate-engine/view-model.ts`: 페이지용 뷰 모델 생성
- `lib/certificate-engine/seo.ts`: 메타데이터와 JSON-LD 생성
- `components/cert/CertificateRenderer.tsx`: 상세페이지 공통 렌더러
- `app/cert/[slug]/page.tsx`: 데이터 로드와 렌더러 호출만 담당

## 데이터 위치
현재의 `data/certificates/*.json`을 그대로 지원한다. 향후 데이터가 늘어나면 아래처럼 분리해도 코드 변경이 필요 없다.

- `data/certificates/national/*.json`
- `data/certificates/private/*.json`

검색, 내부링크, SEO, 데이터 검증 스크립트도 하위 폴더를 재귀 탐색한다.

## 변경 금지 기준
섹션 순서는 `section-registry.ts`에서만 관리한다. 표시 조건은 `rules.ts`에서만 관리한다. 페이지 파일이나 개별 자격증별 조건문으로 예외를 추가하지 않는다.
