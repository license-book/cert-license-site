type Props = {
  rank: number;
  title: string;
  category: string;
  period: string;
  level: string;
};

export default function CertificateCard({
  rank,
  title,
  category,
  period,
  level,
}: Props) {
  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_35px_rgba(15,23,42,0.10)]">
      <div className="relative h-[170px] bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100">
        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white shadow-lg">
          {rank}
        </div>

        <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-blue-600 shadow">
          {category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-[20px] font-black tracking-[-0.03em] text-gray-900">
          {title}
        </h3>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-xs font-bold text-gray-400">준비기간</p>
            <p className="mt-1 text-sm font-black text-gray-900">{period}</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-xs font-bold text-gray-400">난이도</p>
            <p className="mt-1 text-sm font-black text-gray-900">{level}</p>
          </div>
        </div>
      </div>
    </article>
  );
}