export default function StatCard({ label, value, delta, deltaPositive = true, accent }) {
    return (
        <div
            className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs flex flex-col justify-between h-28 hover:shadow-xs transition-shadow"
            style={{ borderLeftWidth: '4px', borderLeftColor: accent ?? '#123498' }}
        >
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {label}
                </p>
                <span className="text-2xl font-black text-[#123498] block mt-2.5 leading-none">
                    {value}
                </span>
            </div>
            {delta && (
                <div className="flex justify-end mt-1">
                    <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${deltaPositive
                            ? "text-green-600 bg-green-50 border border-green-100"
                            : "text-red-600 bg-red-50 border border-red-100"
                            }`}
                    >
                        {deltaPositive ? "↑" : "↓"} {delta}
                    </span>
                </div>
            )}
        </div>
    );
}