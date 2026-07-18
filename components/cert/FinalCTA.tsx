import Link from "next/link";

type CtaButton = {
  label: string;
  url: string;
};

type FinalCTAData = {
  title: string;
  description?: string;
  primaryButton?: CtaButton;
  secondaryButton?: CtaButton;
};

type FinalCTAProps = {
  data: FinalCTAData;
};

function CtaLink({
  button,
  primary = false,
}: {
  button: CtaButton;
  primary?: boolean;
}) {
  const className = primary
    ? "inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
    : "inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50";

  const external = button.url.startsWith("http");

  if (external) {
    return (
      <a href={button.url} target="_blank" rel="noreferrer" className={className}>
        {button.label}
      </a>
    );
  }

  return (
    <Link href={button.url} className={className}>
      {button.label}
    </Link>
  );
}

export default function FinalCTA({ data }: FinalCTAProps) {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-10 text-white shadow-lg md:mt-12 md:px-10 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-blue-200">NEXT STEP</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
          {data.title}
        </h2>

        {data.description ? (
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-200">
            {data.description}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          {data.primaryButton ? (
            <CtaLink button={data.primaryButton} primary />
          ) : null}

          {data.secondaryButton ? (
            <CtaLink button={data.secondaryButton} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
