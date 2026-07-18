type CertificateIntroData = {
  title: string;
  description: string;
  highlights?: string[];
};

type Props = {
  data?: CertificateIntroData;
};

export default function CertificateIntro({ data }: Props) {
  if (!data) return null;

  return (
    <section className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <p className="text-sm font-black text-blue-600">자격증 소개</p>

      <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
        {data.title}
      </h2>

      <p className="mt-4 max-w-[900px] text-sm leading-7 text-slate-600">
        {data.description}
      </p>

      {data.highlights && data.highlights.length > 0 && (
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {data.highlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700 ring-1 ring-slate-100"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}