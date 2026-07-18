type AffiliateData = {
  lecture?: string;
  book?: string;
  application?: string;
};

type Props = {
  affiliate?: AffiliateData;
};

export default function Affiliate({ affiliate }: Props) {
  if (!affiliate) return null;

  const hasData =
    affiliate.lecture ||
    affiliate.book ||
    affiliate.application;

  if (!hasData) return null;

  return (
    <div className="mt-10 rounded-[28px] bg-blue-600 p-7 text-white shadow-sm">
      <h2 className="text-2xl font-black">추천 준비자료</h2>

      <div className="mt-5 flex flex-wrap gap-3">
        {affiliate.lecture && (
          <a
            href={affiliate.lecture}
            target="_blank"
            className="rounded-full bg-white px-5 py-3 text-sm font-black text-blue-600"
          >
            인강 보기
          </a>
        )}

        {affiliate.book && (
          <a
            href={affiliate.book}
            target="_blank"
            className="rounded-full bg-white px-5 py-3 text-sm font-black text-blue-600"
          >
            교재 보기
          </a>
        )}

        {affiliate.application && (
          <a
            href={affiliate.application}
            target="_blank"
            className="rounded-full bg-white px-5 py-3 text-sm font-black text-blue-600"
          >
            접수 바로가기
          </a>
        )}
      </div>
    </div>
  );
}