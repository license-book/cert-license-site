type Props = {
  rank: number;
  title: string;
  category: string;
  period: string;
  level: string;
  issuer: string;
  qualificationType: "국가기술자격" | "국가전문자격" | "민간자격";
};

export default function CertificateCard({
  rank,
  title,
  category,
  period,
  level,
  issuer,
  qualificationType,
}: Props) {
  return (
    <article className="h-full rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[13px] font-black text-white shadow-sm">
          {rank}
        </div>

        <div className="flex flex-wrap justify-end gap-1.5">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-black text-blue-600">
            {category}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-black text-slate-600">
            {qualificationType}
          </span>
        </div>
      </div>

      <div className="mt-4.5">
        <h3 className="min-h-[48px] text-[17px] font-black leading-6 tracking-[-0.03em] text-gray-900">
          {title}
        </h3>

        <p className="mt-1.5 min-h-[20px] text-[12px] font-bold text-gray-500">
          {issuer}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-bold text-gray-400">준비기간</p>
            <p className="mt-0.5 text-[13px] font-black text-gray-900">{period}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400">난이도</p>
            <p className="mt-0.5 text-[13px] font-black text-gray-900">{level}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
