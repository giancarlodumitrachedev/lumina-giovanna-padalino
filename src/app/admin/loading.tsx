export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#F5EBE1] pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="flex items-center justify-between pb-6 border-b border-[#DFCEBA]">
          <div className="space-y-2">
            <div className="h-5 w-40 rounded-full bg-[#EADBCB]" />
            <div className="h-8 w-64 rounded-xl bg-[#EADBCB]" />
          </div>
          <div className="h-10 w-36 rounded-full bg-[#EADBCB]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-white/80 border border-[#DFCEBA]"
            />
          ))}
        </div>

        <div className="h-14 rounded-2xl bg-[#EADBCB]/65 border border-[#DFCEBA]" />
        <div className="space-y-3">
          <div className="h-28 rounded-2xl bg-white/80 border border-[#DFCEBA]" />
          <div className="h-28 rounded-2xl bg-white/80 border border-[#DFCEBA]" />
        </div>
      </div>
    </div>
  );
}
