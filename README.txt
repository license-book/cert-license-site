LABOOK V7.5 FAQ 제거 확정본

수정 내용
- 상세페이지 목차에서 FAQ 제거
- 상세페이지 본문 FAQ 렌더링 제거
- 컴활1급 JSON의 FAQ 데이터 제거
- 정보 출처 → 관련 자격증 → 다음 단계 순서 유지
- Git 변경사항이 반드시 생기도록 버전 7.5.0으로 갱신

덮어쓰기 경로
C:\Users\malbo\cert-license-site

적용 방법
1. 이 ZIP의 압축을 풉니다.
2. 안의 app, data, lib, public 폴더를 cert-license-site에 복사합니다.
3. 같은 이름의 파일을 덮어씁니다.
4. VS Code 터미널에서 git status를 확인합니다.
5. app/cert/[slug]/page.tsx 와 data/certificates/computer-specialist-1.json이 수정됨으로 보여야 합니다.
6. npm run dev로 확인 후 deploy-safe.bat을 실행합니다.

주의
- ZIP 파일 자체를 프로젝트 폴더에 복사하는 것이 아니라 반드시 압축을 풀어 폴더를 덮어씁니다.
- 관리자 권한 실행은 필요 없습니다.
