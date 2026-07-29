# LABOOK 24차 작업 보고서

## 작업 내용
- 국가자격증 가나다순 목록 페이지 신규 추가: `/national-certificates`
- `data/catalog/certificates.json`에서 `type: national` 항목을 자동 추출
- 현재 국가자격증 85개 자동 표시
- 한글 초성별 자동 분류 및 가나다순 정렬
- 자격증명·분야·시행기관 실시간 검색
- ㄱ~ㅎ 초성 바로가기
- 각 항목에서 기존 `/cert/[slug]` 상세페이지 연결
- PC 3열 / 태블릿 2열 / 모바일 1열 반응형 적용
- 헤더의 `국가자격증` 메뉴를 신규 목록 페이지로 연결
- sitemap에 `/national-certificates` 추가

## 변경 파일
- `app/national-certificates/page.tsx` 신규
- `components/NationalCertificateList.tsx` 신규
- `components/Header.tsx` 수정
- `app/sitemap.ts` 수정

## 검증 결과
- 자격증 JSON 88개 검사
- 오류 0개
- 경고 0개
- 검색 인덱스 88개 재생성
- 내부 링크 352개 재생성
- SEO 데이터 88개 재생성

## 참고
현재 실행 환경에 `node_modules`가 포함되어 있지 않아 Next.js 전체 빌드는 실행하지 못했습니다. 데이터 검증 및 생성 스크립트는 모두 정상 통과했습니다.
