# 라북 2차 자격증 묶음 완성본

## 포함 자격증
- 전기기사
- 전기산업기사
- 산업안전기사
- 위험물산업기사

## 포함 파일
- `data/certificates/*.json` 4개
- `data/compare/*.json` 2개
- `bundle-manifest.json`
- `docs/BUNDLE_2_REPORT.md`

## 적용 방법
1. 현재 프로젝트를 ZIP 또는 별도 폴더로 백업합니다.
2. 이 압축파일의 `data` 폴더를 프로젝트 최상위에 덮어씁니다.
3. Hero 이미지 4개를 `public/images/hero/`에 추가합니다.
4. `npm run validate:data`
5. `npm run build`
6. `npm run dev`

## 중요
- 공통 엔진·컴포넌트·레이아웃은 포함하지 않았습니다.
- 기존 최신 완성본을 보존하면서 데이터만 추가하는 최소 변경 패키지입니다.
- Hero 이미지 파일 자체는 포함하지 않았으며 JSON 경로만 준비했습니다.
