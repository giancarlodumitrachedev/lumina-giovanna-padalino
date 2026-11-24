export default function BlogLoading() {
  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 bg-[#F5EBE1] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 animate-pulse">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="h-6 w-56 mx-auto rounded-full bg-[#EADBCB]" />
          <div className="h-12 w-80 mx-auto rounded-xl bg-[#EADBCB]" />
          <div className="h-5 w-48 mx-auto rounded-lg bg-[#EADBCB]/70" />
        </div>
        <div className="h-12 w-72 mx-auto rounded-full bg-[#EADBCB]/70" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-80 rounded-3xl bg-white/85 border border-[#DFCEBA]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
