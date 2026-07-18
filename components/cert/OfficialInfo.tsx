type OfficialInfoData = {
  title: string;
  summary?: string;
  organization: string;
  website: string;
  items: {
    label: string;
    description: string;
  }[];
  importantNotice?: string[];
  buttons?: {
    title: string;
    url: string;
  }[];
};

type ExamData = {
  written?: string;
  practical?: string;
  passingCriteria?: string;
  subjects?: string[];
};

type ExamWeightItem = {
  label: string;
  value: number;
};

type OfficialInfoProps = {
  data?: OfficialInfoData;
  exam?: ExamData;
  examWeight?: ExamWeightItem[];
};

function makeExamType(
  exam?: ExamData,
  examWeight?: ExamWeightItem[]
): string {
  if (examWeight?.length) {
    return examWeight
      .map((item) => `${item.label} ${item.value}%`)
      .join(" · ");
  }

  const types = [
    exam?.written ? "필기" : null,
    exam?.practical ? "실기" : null,
  ].filter(Boolean);

  return types.length ? types.join(" + ") : "공식 공고 확인";
}

export default function OfficialInfo({
  data,
  exam,
  examWeight,
}: OfficialInfoProps) {
  if (!data && !exam) {
    return null;
  }

  const examType = makeExamType(exam, examWeight);
  const subjects = exam?.subjects?.length
    ? exam.subjects.join(", ")
    : "공식 시험 공고 확인";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-6 md:px-8">
        <p className="text-sm font-semibold text-blue-600">
          시험 일정 · 접수 안내
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          {data?.title ?? "시험 일정과 접수 안내"}
        </h2>

        {data?.summary ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            {data.summary}
          </p>
        ) : null}
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r md:p-8">
          <h3 className="text-base font-bold text-slate-900">
            공식 일정 및 접수
          </h3>

          <dl className="mt-5 divide-y divide-slate-100">
            {data?.organization ? (
              <div className="grid grid-cols-[100px_1fr] gap-4 py-4">
                <dt className="text-sm font-medium text-slate-500">
                  시행기관
                </dt>
                <dd className="text-sm font-semibold text-slate-900">
                  {data.organization}
                </dd>
              </div>
            ) : null}

            {data?.items?.map((item) => (
              <div
                key={`${item.label}-${item.description}`}
                className="grid grid-cols-[100px_1fr] gap-4 py-4"
              >
                <dt className="text-sm font-medium text-slate-500">
                  {item.label}
                </dt>
                <dd className="text-sm leading-6 text-slate-800">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>

          {data?.buttons?.length ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {data.buttons.map((button, index) => {
                const isApplication =
                  button.title.includes("접수") ||
                  button.title.includes("신청");

                const isSchedule =
                  button.title.includes("일정") ||
                  button.title.includes("시험일");

                const buttonClass = isApplication
                  ? "border-blue-700 bg-blue-700 text-white shadow-sm hover:border-blue-800 hover:bg-blue-800"
                  : isSchedule
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-sm hover:border-emerald-700 hover:bg-emerald-700"
                    : index === 0
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                      : "border-slate-300 bg-white text-slate-800 hover:border-slate-500 hover:bg-slate-50";

                return (
                  <a
                    key={`${button.title}-${button.url}`}
                    href={button.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex min-h-12 items-center justify-center rounded-xl border px-5 text-sm font-bold transition ${buttonClass}`}
                  >
                    {button.title}
                    <span aria-hidden="true" className="ml-2">
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-base font-bold text-slate-900">
            시험 정보
          </h3>

          <dl className="mt-5 divide-y divide-slate-100">
            <div className="grid grid-cols-[100px_1fr] gap-4 py-4">
              <dt className="text-sm font-medium text-slate-500">
                시험 유형
              </dt>
              <dd className="text-sm font-semibold text-slate-900">
                {examType}
              </dd>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4 py-4">
              <dt className="text-sm font-medium text-slate-500">
                합격 기준
              </dt>
              <dd className="text-sm leading-6 text-slate-800">
                {exam?.passingCriteria ?? "공식 시험 공고 확인"}
              </dd>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4 py-4">
              <dt className="text-sm font-medium text-slate-500">
                시험 과목
              </dt>
              <dd className="text-sm leading-6 text-slate-800">
                {subjects}
              </dd>
            </div>
          </dl>

        </div>
      </div>

      {data?.importantNotice?.length ? (
        <div className="border-t border-slate-200 bg-amber-50 px-6 py-5 md:px-8">
          <ul className="space-y-2">
            {data.importantNotice.map((notice) => (
              <li
                key={notice}
                className="text-sm leading-6 text-amber-900"
              >
                • {notice}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
