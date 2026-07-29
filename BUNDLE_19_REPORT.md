# LABOOK 19차 실제 배포용 데이터 제작 보고서

## 제작 대상
- 067 화학분석기사 (`chemical-analysis-engineer`)
- 068 한식조리기능사 (`korean-cuisine-craftsman`)
- 069 양식조리기능사 (`western-cuisine-craftsman`)
- 070 중식조리기능사 (`chinese-cuisine-craftsman`)

## 제작 기준
- 4개 종목별 독립 JSON 작성
- Q-Net 공식 종목정보와 현재 적용 출제기준 기준
- 시험과목, 검정방법, 합격기준, 응시료 개별 반영
- 응시자격, 현실가이드, 준비기간, 탈락 포인트, 공부전략 개별 작성
- 취업·활용, FAQ, Related, TrustInfo, FinalCTA, SEO 개별 작성
- `lastUpdated`, `lastVerified`: 2026-07-29

## 검증 결과
- 전체 자격증 JSON: 76개
- 오류: 0개
- 경고: 0개
- 검색 인덱스: 76개
- 검색 제안어: 723개
- 내부 링크: 304개
- SEO 페이지: 76개

## 빌드 확인
데이터 검증과 검색·내부링크·SEO 생성 스크립트는 모두 정상 통과했습니다. 현재 압축본에는 `node_modules`가 포함되어 있지 않아 `next build` 단계에서 `next: not found`로 중단되었습니다. 프로젝트 코드나 데이터 검증 오류는 아니며, 로컬에서 `npm install` 후 `npm run build`로 최종 빌드를 확인할 수 있습니다.

## 신규·변경 파일
- `data/certificates/chemical-analysis-engineer.json`
- `data/certificates/korean-cuisine-craftsman.json`
- `data/certificates/western-cuisine-craftsman.json`
- `data/certificates/chinese-cuisine-craftsman.json`
- `data/catalog/certificates.json`
- `data/related/related-certificates.json`
- `public/data/search-index.json`
- `public/data/search-suggestions.json`
- `data/generated/internal-links.json`
- `data/generated/seo-pages.json`
- `scripts/add-bundle-19.py`
- `BUNDLE_19_REPORT.md`
