# LABOOK 25차 작업 보고서

## 추가
- `/private-certificates` 민간자격증 가나다·영문순 목록 페이지
- `components/PrivateCertificateList.tsx`
- 민간자격증 검색, ㄱ~ㅎ/A-Z 초성 이동, 상세페이지 연결
- 민간자격 구분 안내 문구

## 수정
- 헤더 민간자격증 메뉴를 `/private-certificates`로 연결
- 사이트맵에 민간자격증 목록 페이지 추가
- 국가자격증 페이지는 `type: national` 항목만 표시하도록 정리
- ITQ, MOS, 전산회계 1급은 민간자격증 목록에서 표시

## 데이터 자동 반영
- 향후 카탈로그에 `type: private` 항목을 추가하면 민간자격증 목록에 자동 반영
