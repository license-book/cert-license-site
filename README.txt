LABOOK V7.2 FAQ COMPLETE REFACTOR PATCH
======================================

[수정 내용]
1. 컴활1급 상세페이지에서 FAQ 섹션 완전 제거
2. 상세 목차에서 FAQ 항목 제거
3. 컴활1급 JSON에서 faq 데이터 제거
4. SEO 데이터 생성기에서 FAQ 데이터 생성 로직 제거
5. JSON 검증기에서 FAQ 검증 규칙 제거
6. 하단 섹션 순서를 아래와 같이 변경
   정보 출처 및 업데이트 → 관련 자격증 → 다음 단계
7. 검색 인덱스·검색 제안·내부 링크·SEO 생성 데이터 재생성
8. lib/seo.ts 확인: FAQPage 구조화 데이터 의존성 없음

[덮어쓰기 경로]
압축을 프로젝트 루트에 풀고 폴더 구조 그대로 덮어쓰세요.
프로젝트 루트 예시:
C:\Users\malbo\cert-license-site

[삭제할 파일]
components\cert\FAQ.tsx
압축 해제 후 프로젝트 루트에서 APPLY_PATCH.bat을 실행하면 자동 삭제됩니다.

[수정 파일]
app\cert\[slug]\page.tsx
data\certificates\computer-specialist-1.json
data\generated\internal-links.json
data\generated\seo-pages.json
public\data\search-index.json
public\data\search-suggestions.json
scripts\generate-seo-data.mjs
scripts\validate-data.mjs
lib\seo.ts

[로컬 테스트]
1. 프로젝트 루트에서 npm run dev
2. http://localhost:3000/cert/computer-specialist-1 접속
3. 확인 항목
   - 목차에 FAQ가 없어야 함
   - 본문에 FAQ 섹션이 없어야 함
   - 하단 순서가 정보 출처 → 관련 자격증 → 다음 단계여야 함
   - Runtime TypeError가 없어야 함

[검증 결과]
JSON 검증: 오류 0개 / 경고 0개
SEO 데이터 생성: 정상
내부 링크 생성: 정상
검색 인덱스 생성: 정상

[GitHub / Vercel]
로컬 확인 후 deploy-safe.bat 실행
변경 파일 목록을 확인한 뒤 Y + Enter
GitHub Push 이후 Vercel 자동 배포 확인
