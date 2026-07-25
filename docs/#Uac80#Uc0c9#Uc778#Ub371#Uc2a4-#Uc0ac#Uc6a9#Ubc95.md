# 라북 V7-2 검색 인덱스 자동 생성 엔진

## 적용 파일

```text
package.json
scripts/generate-search-index.mjs
docs/검색인덱스-사용법.md
```

## 설치

압축을 푼 뒤 `cert-license-site` 최상위 폴더에 그대로 복사합니다.

`package.json`은 덮어씁니다.  
V7-1의 `scripts/validate-data.mjs`는 삭제하거나 덮어쓰지 않습니다.

## 직접 실행

```powershell
npm run generate:search
```

성공하면 아래 파일이 자동 생성됩니다.

```text
public/data/search-index.json
public/data/search-suggestions.json
```

## 자동 실행 순서

```powershell
npm run build
```

실행 시 내부 순서:

```text
1. npm run validate:data
2. npm run generate:search
3. next build
```

Vercel 배포에서도 같은 순서로 자동 실행됩니다.

## 검색 인덱스에 포함되는 정보

- 자격증명
- 약칭
- slug
- 국가·민간 구분
- 자격 종류
- 카테고리
- 시행기관
- 설명
- 대표 이미지
- SEO 키워드
- aliases
- 핵심정보
- 현실 가이드
- 시험정보
- 취업·활용
- 우대정보

## 별칭을 직접 추가하는 방법

각 자격증 JSON의 `basic` 안에 선택적으로 추가할 수 있습니다.

```json
{
  "basic": {
    "slug": "computer-specialist-1",
    "name": "컴퓨터활용능력 1급",
    "shortName": "컴활1급",
    "aliases": [
      "컴활 1급",
      "컴퓨터활용 1급",
      "컴퓨터 활용능력 1급"
    ]
  }
}
```

별칭이 없어도 name, shortName, SEO keywords를 자동으로 사용합니다.

## 생성 파일 사용 주소

브라우저 또는 검색 컴포넌트에서:

```text
/data/search-index.json
/data/search-suggestions.json
```

로 읽으면 됩니다.

## 주의

생성된 `public/data/*.json`은 사람이 직접 수정하지 않습니다.  
원본 자격증 JSON을 수정한 뒤 다시 생성합니다.
