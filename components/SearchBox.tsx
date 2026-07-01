export default function SearchBox() {
  return (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="relative">
        <span className="absolute left-7 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
          ⌕
        </span>

        <input
          type="text"
          placeholder="찾고 있는 자격증을 검색해보세요. 예: 컴활1급, 전기기사, 공인중개사"
          className="h-[70px] w-full rounded-full bg-white pl-16 pr-24 text-base text-gray-800 shadow-2xl outline-none placeholder:text-gray-400"
        />

        <button className="absolute right-3 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg">
          ⌕
        </button>
      </div>
    </div>
  );
}