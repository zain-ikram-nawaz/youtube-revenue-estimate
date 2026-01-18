import React,{useMemo} from "react";
import Image from "next/image";
import Link from "next/link";
export default function Page({ data }) {

    const safeData = useMemo(() => {
      if (!data) return [];
      // Pehle data ko JSON string bana kar wapis parse karein taake Dates/ObjectIds plain strings ban jayen
      const parsed = JSON.parse(JSON.stringify(data));
      return [...parsed].reverse().slice(0, 12);
    }, [data]);


  if (!data || data?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-gray-600 text-lg font-medium">No guides found</p>
          <p className="text-gray-400 text-sm mt-2">Check back later for new content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            YouTube Guides
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Expert tips and strategies to grow your YouTube channel
          </p>
        </div>

        {/* Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {safeData.map((guide) => (
        <div key={guide._id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">


          {/* Image Section */}
          <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
            <Image
              src={guide?.thumbnail || "/icon.png"}
              alt={guide?.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-2 left-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-[8px] font-black text-white px-2 py-0.5 rounded uppercase tracking-widest">
                {guide?.category || "General"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <Link href={`/guide/${guide.slug}`}>
              <h3 className="text-sm font-bold text-slate-800 leading-tight mb-2 hover:text-blue-600 transition-colors line-clamp-2 uppercase tracking-tight">
                {guide?.title}
              </h3>
            </Link>

            <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 leading-relaxed">
              {guide?.metaDescription}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                {new Date(guide?.createdAt).toLocaleDateString("en-GB")}
              </span>
              <Link
                href={`/guide/${guide.slug}`}
                className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline"
              >
                View Guide →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}