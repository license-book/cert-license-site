# LABOOK 20차 실제 배포용 데이터 제작 보고서

## 제작 대상
- 071 일식조리기능사 (`japanese-cuisine-craftsman`)
- 072 제과기능사 (`confectionery-craftsman`)
- 073 제빵기능사 (`bread-making-craftsman`)
- 074 조주기능사 (`bartender-craftsman`)

## 제작 기준
- 기존 V4 공통 엔진과 디자인 구조 유지
- 4개 종목별 독립 완성 JSON 작성
- Q-Net 공식 종목정보와 현재 적용 출제기준 기준
- 시험과목, 검정방법, 합격기준, 응시료 반영
- 현실가이드, 준비기간, 탈락 포인트, 공부전략 개별 작성
- 취업·활용, FAQ, Related, TrustInfo, FinalCTA, SEO 반영
- `lastUpdated`, `lastVerified`: 2026-07-29

## 검증 결과
- 전체 자격증 JSON: 80개
- 오류: 0개
- 경고: 0개
- 검색 인덱스: 80개
- 검색 제안어: 763개
- 내부 링크: 320개
- SEO 페이지: 80개

## 빌드 확인
데이터 검증과 검색·내부링크·SEO 생성 스크립트는 모두 정상 통과했습니다. 빌드 의존성 설치 과정에서 실행환경의 내부 npm 저장소에 `zod-validation-error@4.0.2` 패키지가 없어 `npm ci`가 중단되었습니다. 프로젝트 데이터 검증 오류는 아니며, 일반 인터넷이 연결된 로컬 환경에서 `npm install` 후 `npm run build`로 최종 빌드를 확인할 수 있습니다.

## 신규·변경 파일
- `data/certificates/japanese-cuisine-craftsman.json`
- `data/certificates/confectionery-craftsman.json`
- `data/certificates/bread-making-craftsman.json`
- `data/certificates/bartender-craftsman.json`
- `data/catalog/certificates.json`
- `data/related/related-certificates.json`
- `public/data/search-index.json`
- `public/data/search-suggestions.json`
- `data/generated/internal-links.json`
- `data/generated/seo-pages.json`
- `scripts/add-bundle-20.py`
- `BUNDLE_20_REPORT.md`
