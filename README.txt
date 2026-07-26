LABOOK V7.6 Vercel 빌드 오류 수정본

[수정 내용]
- lib/seo.ts에서 SITE_URL을 export하도록 수정
- lib/seo.ts에 getSeoPages() export 추가
- app/sitemap.ts에서 lastModified가 없을 때도 TypeScript 오류가 나지 않도록 처리
- Vercel Build Logs의 오류:
  "Export getSeoPages doesn't exist in target module"
  를 직접 해결

[수정 파일]
- lib/seo.ts
- app/sitemap.ts

[덮어쓰기 경로]
ZIP 안의 app, lib 폴더를 다음 프로젝트 루트에 그대로 복사 후 덮어쓰기:
C:\Users\malbo\cert-license-site

[로컬 테스트]
프로젝트 터미널에서:
npm run build

[배포]
deploy-safe.bat 실행 후 Y 입력
또는:
git add app/sitemap.ts lib/seo.ts
git commit -m "Fix Vercel SEO sitemap build"
git push origin main

[검증]
- 최신 업로드 파일 기준으로 수정
- TypeScript 검사: 오류 0개
- FAQ 제거 코드는 건드리지 않음
