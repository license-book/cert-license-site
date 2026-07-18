type TrustInfoData = {
  title: string;
  description?: string;
  sourceLabel: string;
  sourceUrl?: string;
  lastVerified?: string;
  lastUpdated?: string;
  notice?: string;
};

type TrustInfoProps = {
  data: TrustInfoData;
};

function formatDate(value?: string) {
  if (!value) return "확인 기록 없음";

  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;

  return `${year}.${month}.${day}`;
}

export default function TrustInfo({ data }: TrustInfoProps) {
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:mt-12 md:p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-semibold text-blue-600">TRUST & UPDATE</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {data.title}
          </h2>
          {data.description ? (
            <p className="mt-3 leading-7 text-slate-600">{data.description}</p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">공식 정보 출처</p>
            {data.sourceUrl ? (
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:text-blue-600"
              >
                {data.sourceLabel}
              </a>
            ) : (
              <p className="mt-2 font-semibold text-slate-900">{data.sourceLabel}</p>
            )}
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">마지막 공식 확인일</p>
            <p className="mt-2 font-semibold text-slate-900">
              {formatDate(data.lastVerified)}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">페이지 업데이트일</p>
            <p className="mt-2 font-semibold text-slate-900">
              {formatDate(data.lastUpdated)}
            </p>
          </div>
        </div>

        {data.notice ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
            {data.notice}
          </div>
        ) : null}
      </div>
    </section>
  );
}
