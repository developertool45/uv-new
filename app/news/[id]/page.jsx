"use client";



import React from "react";


export default function SingleNewsPage({ searchParams }) {
  // Data extraction with fallback
 const { id, date, title, desc, source, img } = React.use(searchParams) || {};

  // Error handling for URL
  let hostname = "Original Source";
  if (source) {
    try {
      hostname = new URL(source).hostname.replace("www.", "");
    } catch (e) {
      console.error("Invalid URL", e);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-4 md:py-12 bg-white min-h-screen">
      <a
        href="/"
        className="text-red-600 font-bold mb-6 inline-block hover:translate-x-[-5px] transition-transform"
      >
        ← Back to Home
      </a>

      <div className="flex items-center gap-4 mb-4">
        <span className="bg-red-600 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
          Breaking News
        </span>
        <span className="text-gray-400 text-xs font-medium">{date}</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
        {title}
      </h1>

      <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-xl border border-slate-100">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/800x450?text=News+Image";
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl font-serif leading-relaxed text-slate-700 mb-8 first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
          {desc}
        </p>

        <div className="p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center mt-12">
          <h3 className="text-lg font-bold mb-2">Read the full coverage</h3>
          <p className="mb-6 text-slate-500 text-sm italic">
            "Continuing to bring you the latest updates from verified sources."
          </p>

          {source && (
            <a
              href={source}
              target="_blank"
              className="inline-flex items-center justify-center bg-black text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg hover:shadow-red-200"
            >
              Go to {hostname} ↗
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
