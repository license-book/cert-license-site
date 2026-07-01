export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[84px] max-w-[1280px] items-center justify-between px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="자격증 백과"
            className="h-12 w-12"
          />

          <div>
            <h1 className="text-[32px] font-black tracking-[-0.04em] text-white">
              자격증 백과
            </h1>

            <p className="mt-1 text-[13px] font-medium text-white/85">
              대한민국 자격증 정보 플랫폼
            </p>
          </div>
        </a>

        {/* Menu */}
        <nav className="hidden lg:flex items-center gap-14">

          <a className="text-[17px] font-semibold text-white transition hover:text-blue-300">
            국가자격증
          </a>

          <a className="text-[17px] font-semibold text-white transition hover:text-blue-300">
            민간자격증
          </a>

          <a className="text-[17px] font-semibold text-white transition hover:text-blue-300">
            비교
          </a>

          <a className="text-[17px] font-semibold text-white transition hover:text-blue-300">
            랭킹
          </a>

          <a className="text-[17px] font-semibold text-white transition hover:text-blue-300">
            정보센터
          </a>

        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">

          <button className="text-white transition hover:scale-110">
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7"/>
              <path d="M20 20l-3.5-3.5"/>
            </svg>
          </button>

          <button className="text-white transition hover:scale-110">
            <svg
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 6h18"/>
              <path d="M3 12h18"/>
              <path d="M3 18h18"/>
            </svg>
          </button>

        </div>

      </div>
    </header>
  );
}