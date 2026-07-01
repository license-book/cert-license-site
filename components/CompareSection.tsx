export default function CompareSection() {
  return (
    <section className="max-w-md mx-auto px-5 py-10">

      <h2 className="text-2xl font-bold mb-5">
        ⚖️ 인기 비교 콘텐츠
      </h2>

      <div className="space-y-4">

        <div className="rounded-2xl bg-white border p-5 shadow-sm hover:shadow-md transition">
          <div className="text-sm text-blue-600 font-semibold">
            비교 콘텐츠
          </div>

          <h3 className="mt-2 text-lg font-bold">
            컴활 1급 vs 2급
          </h3>

          <p className="mt-2 text-gray-600 text-sm">
            난이도, 취업 활용도, 공부기간을 비교해보세요.
          </p>
        </div>

        <div className="rounded-2xl bg-white border p-5 shadow-sm hover:shadow-md transition">
          <div className="text-sm text-blue-600 font-semibold">
            비교 콘텐츠
          </div>

          <h3 className="mt-2 text-lg font-bold">
            전기기사 vs 전기산업기사
          </h3>

          <p className="mt-2 text-gray-600 text-sm">
            응시자격과 합격률 차이를 확인하세요.
          </p>
        </div>

      </div>

    </section>
  );
}