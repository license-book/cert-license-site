# 라북 2차 자격증 최종 완성 묶음

## 포함 내용
- 자격증 상세 JSON 4개
- 관련 자격증 수동 맵
- 엔진이 우선 사용하는 generated/internal-links.json
- 자격증 catalog 병합본
- 비교 catalog 병합본
- 비교페이지 JSON 2개
- 검증 결과

## 적용 방법
ZIP 안의 `data` 폴더를 프로젝트 루트의 `data` 폴더에 덮어쓰세요.

## 중요
현재 관련 자격증 엔진은 `data/generated/internal-links.json`이 존재하면
`data/related/related-certificates.json`보다 이를 우선 사용합니다.
따라서 두 파일을 모두 포함했습니다.

## 섹션 연결
- 전기기사 ↔ 전기산업기사 비교
- 산업안전기사 ↔ 위험물산업기사 비교
- 네 자격증끼리 관련 자격증 카드가 실제 상세페이지 기준으로 활성화

## 검증
`validation-result.json`이 PASS인지 확인했습니다.
