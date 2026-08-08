import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-6 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-end gap-2">
              <span className="text-xl font-black tracking-tight text-white">라북</span>
              <span className="pb-0.5 text-xs font-black tracking-[0.18em] text-blue-400">
                LABOOK
              </span>
            </Link>

            <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-slate-400">
              자격증 정보를 쉽고 빠르게 찾고, 비교하고, 준비할 수 있도록 정리하는
              자격증 정보 플랫폼입니다.
            </p>

            <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
              라북은 특정 자격증, 교육기관 또는 시행기관을 보증하거나 대행하지 않습니다.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">자격증 서비스</h3>
            <nav className="mt-4 grid gap-3 text-sm font-bold text-slate-400">
              <Link href="/national-certificates" className="hover:text-white">
                국가자격증
              </Link>
              <Link href="/private-certificates" className="hover:text-white">
                민간자격증
              </Link>
              <Link href="/compare" className="hover:text-white">
                자격증 비교
              </Link>
              <Link href="/rank" className="hover:text-white">
                자격증 랭킹
              </Link>
              <Link href="/guide" className="hover:text-white">
                수험가이드
              </Link>
              <Link href="/resources" className="hover:text-white">
                자료실
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black text-white">사이트 안내</h3>
            <nav className="mt-4 grid gap-3 text-sm font-bold text-slate-400">
              <Link href="/about" className="hover:text-white">
                라북 소개
              </Link>
              <Link href="/privacy" className="hover:text-white">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-white">
                이용약관
              </Link>
              <Link href="/disclaimer" className="hover:text-white">
                정보 이용 안내
              </Link>
              <Link href="/site-map" className="hover:text-white">
                사이트맵
              </Link>
              <Link href="/contact" className="hover:text-white">
                문의
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-9 border-t border-slate-800 pt-6">
          <p className="text-xs font-semibold leading-5 text-slate-500">
            시험 일정, 응시자격, 시행 제도와 민간자격 등록·공인 상태 등은 변경될 수
            있습니다. 중요한 의사결정 전에는 반드시 해당 시행기관과 공식 공고의 최신
            내용을 확인해 주세요.
          </p>

          <div className="mt-4 flex flex-col gap-2 text-xs font-bold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 LABOOK. All rights reserved.</span>
            <span>자격증 정보 서비스 · 대한민국</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
