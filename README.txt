LABOOK V7.3 FAQ FINAL FIX

[수정 내용]
- 상세페이지 FAQ import, 타입, 목차, 렌더링 완전 제거
- 컴활1급 JSON faq 데이터 제거
- 하단 순서 변경: 정보 출처 및 업데이트 → 관련 자격증 → 다음 단계
- SEO 생성 스크립트에서 faq 생성 제거
- JSON 검증 스크립트에서 faq 검증 제거
- SEO/검색/내부 링크 생성 데이터 재생성

[덮어쓰기 경로]
이 ZIP을 열어 보이는 app, data, public, scripts, lib 폴더를 아래 프로젝트 루트에 그대로 덮어쓰기:
C:\Users\malbo\cert-license-site

[중요]
- APPLY_PATCH.bat 없음
- 관리자 권한 실행 없음
- 기존 components\cert\FAQ.tsx 파일은 남아 있어도 import되지 않아 화면과 빌드에 영향을 주지 않음

[확인 순서]
1. ZIP 안의 폴더를 프로젝트 루트에 덮어쓰기
2. VS Code에서 npm run dev
3. http://localhost:3000/cert/computer-specialist-1 확인
4. FAQ가 사라지고 하단이 정보 출처 → 관련 자격증 → 다음 단계인지 확인
5. deploy-safe.bat 실행
6. 변경 파일 목록이 보이면 Y 입력 후 Enter

[검증]
- node scripts/generate-seo-data.mjs 성공
- node scripts/generate-search-index.mjs 성공
- node scripts/generate-internal-links.mjs 성공
- node scripts/validate-data.mjs 결과: 오류 0개 / 경고 0개
