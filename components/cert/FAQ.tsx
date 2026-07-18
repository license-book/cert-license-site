type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
};

export default function FAQ({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-black tracking-[-0.03em]">FAQ</h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
            <p className="font-black">{item.question}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}