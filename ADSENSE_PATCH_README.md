# 라북 애드센스 광고 모듈 최소 패치

## 적용 방법
이 ZIP을 `cert-license-site` 프로젝트 최상위 폴더에서 압축 해제하고 폴더 구조를 유지한 채 덮어쓰세요.

## 변경 파일
- `components/common/AdSlot.tsx` 신규
- `components/cert/CertificateRenderer.tsx` 수정
- `app/layout.tsx` 수정
- `.env.adsense.example` 신규

## 상세페이지 광고 위치
1. 상세 목차 아래 / 본문 시작 전
2. `한눈에 보기` 섹션 아래
3. `공부 전략` 섹션 아래
4. `추천 자료` 섹션 아래, 정보 출처 전

## 승인 전 확인
로컬 `.env.local`에 아래 한 줄을 추가하면 광고 예정 영역이 표시됩니다.

`NEXT_PUBLIC_ADSENSE_PREVIEW=true`

## 승인 후 연결
`.env.adsense.example`의 변수 이름을 참고해 Google AdSense 게시자 ID와 슬롯 ID 4개를 `.env.local` 및 Vercel 환경변수에 입력하세요.

## 확인 명령
- `npm run build`
- `npm run dev`
