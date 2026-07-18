type ExamInfoData = {
  written?: string;
  practical?: string;
  passingCriteria?: string;
  subjects?: string[];
};

type Props = {
  examInfo?: ExamInfoData;
};

export default function ExamInfo({ examInfo }: Props) {
  if (!examInfo) return null;

  return (
    <div className="mt-10 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-2xl font-black tracking-[-0.03em]">시험정보</h2>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-slate-100">
              <th className="w-36 bg-slate-50 p-4 font-black">시험유형</th>
              <td className="p-4">
                {examInfo.written} / {examInfo.practical}
              </td>
            </tr>

            <tr className="border-b border-slate-100">
              <th className="bg-slate-50 p-4 font-black">합격기준</th>
              <td className="p-4">{examInfo.passingCriteria}</td>
            </tr>

            <tr>
              <th className="bg-slate-50 p-4 font-black">시험과목</th>
              <td className="p-4">{examInfo.subjects?.join(" · ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}