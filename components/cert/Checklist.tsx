type ChecklistItem = {
  text: string;
  weight?: number;
};

type ChecklistResult = {
  minChecked: number;
  maxChecked: number;
  title: string;
  description: string;
};

type ChecklistData = {
  title: string;
  description?: string;
  items: ChecklistItem[];
  results?: ChecklistResult[];
  cautions?: string[];
  advice?: string;
};

type Props = {
  data?: ChecklistData;
};

export default function Checklist({ data }: Props) {
  if (!data) return null;

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

      {/* 제목 */}
      <div className="mb-8">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
          START CHECK
        </span>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
          {data.title}
        </h2>

        {data.description && (
          <p className="mt-3 leading-7 text-slate-600">
            {data.description}
          </p>
        )}
      </div>

      {/* 체크리스트 */}
      <div className="space-y-4">

        {data.items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-md border-2 border-slate-400 bg-white">
            </div>

            <p className="leading-7 text-slate-800">
              {item.text}
            </p>
          </div>
        ))}

      </div>

      {/* 결과 */}
      {data.results && (
        <div className="mt-10 rounded-2xl bg-blue-50 p-6">

          <h3 className="mb-4 text-xl font-bold text-blue-900">
            ✔ 체크 결과
          </h3>

          <div className="space-y-5">

            {data.results.map((result, index) => (
            <div
                key={index}
                className="rounded-xl border border-blue-100 bg-white p-4"
            >
                <p className="text-sm font-black text-blue-700">
                {result.minChecked}~{result.maxChecked}개 해당
                </p>

                <p className="mt-2 font-black text-slate-900">
                {result.title}
                </p>

                <p className="mt-2 leading-7 text-slate-700">
                {result.description}
                </p>
            </div>
            ))}

          </div>

        </div>
      )}

      {/* 주의 */}
      {data.cautions && (
        <div className="mt-10">

          <h3 className="mb-4 text-xl font-bold text-red-700">
            ⚠ 이런 경우라면 다시 한번 생각해 보세요
          </h3>

          <div className="space-y-3">

            {data.cautions.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-red-50 p-4 text-red-800"
              >
                • {item}
              </div>
            ))}

          </div>

        </div>
      )}

      {/* 라북 한줄 조언 */}
      {data.advice && (
        <div className="mt-10 rounded-2xl bg-amber-50 p-6">

          <div className="mb-2 text-lg font-bold text-amber-700">
            💡 라북 한 줄 조언
          </div>

          <p className="leading-7 text-slate-700">
            {data.advice}
          </p>

        </div>
      )}

    </section>
  );
}