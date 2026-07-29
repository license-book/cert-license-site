# LABOOK 8차 오류 수정 보고서

## 수정 내용
- `components/cert/EligibilityInfo.tsx`
  - `closed` 상태 타입과 표시 스타일 추가
  - 알 수 없는 상태값이 들어와도 중단되지 않도록 기본 스타일 방어 처리

## 오류 원인
- `mechanical-design-engineer.json`의 `eligibility.status` 값이 `closed`였으나 컴포넌트 스타일 정의에 해당 상태가 없어 `style.badge` 접근 시 런타임 오류가 발생함.

## 검증 결과
- 자격증 JSON: 33개
- 오류: 0개
- 경고: 0개
- 검색 인덱스: 33개
- 검색 제안어: 307개
- 내부 링크: 132개
- SEO 페이지: 33개
