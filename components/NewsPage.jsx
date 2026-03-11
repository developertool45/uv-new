"use client";
import RSSParser from "rss-parser";
import Link from "next/link"; // Ye zaroori hai navigation ke liye
import { useEffect, useState } from "react";

export default  function NewsPage() {
  async function fetchData() {
      const parser = new RSSParser({
          customFields: {
              item: [
                  ["media:content", "mediaContent"],
                  ["media:thumbnail", "mediaThumbnail"],
              ],
          },
      });
  
      // Aap yahan NDTV ya The Hindu koi bhi link rakh sakte hain
      
  
      let newsItems = [];
      try {
        const feed = await parser.parseURL(process.env.NEXT_PUBLIC_RSS_URL);

        newsItems = feed.items.map((item) => {
          let imageUrl =
            "https://via.placeholder.com/400x200?text=No+Image+Available";

          if (item.enclosure && item.enclosure.url) {
            imageUrl = item.enclosure.url;
          } else if (
            item.mediaContent &&
            item.mediaContent.$ &&
            item.mediaContent.$.url
          ) {
            imageUrl = item.mediaContent.$.url;
          } else if (
            item.mediaThumbnail &&
            item.mediaThumbnail.$ &&
            item.mediaThumbnail.$.url
          ) {
            imageUrl = item.mediaThumbnail.$.url;
          }

          return {
            title: item.title,
            link: item.link,
            image: imageUrl,
            pubDate: item.pubDate,
            description: item.contentSnippet || "No description available",
          };
        });
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
  
      return newsItems;
  }
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setNewsItems(data));
  }, []);

  if (newsItems.length===0) {
    if (newsItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <div className="relative">
            {/* Outer Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
            {/* Inner Pulse Circle */}
            <div className="relative bg-white border-4 border-red-600 rounded-full p-6 shadow-xl">
              <svg
                className="w-12 h-12 text-red-600 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-black italic tracking-tighter text-slate-900">
              UV<span className="text-red-600">NEWS</span>
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse mt-1">
              Fetching Latest Feeds...
            </p>
          </div>
        </div>
      );
    }
}

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen font-sans">    

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {newsItems.map((news, index) => (
          // Yahan humne Link tag add kiya hai jo page switch karega
          <Link
            key={index}
            href={{
              pathname: `/news/${encodeURIComponent(news.title.replace(/\s+/g, "-").toLowerCase())}`,
              query: {
                title: news.title,
                img: news.image,
                date: new Date(news.pubDate).toDateString(),
                desc: news.description,
                source: news.link,
              },
            }}
            className="flex flex-col bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 group rounded-lg overflow-hidden"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden aspect-video">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x225?text=News+Update";
                }}
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                NEW
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                {new Date(news.pubDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <h2 className="text-md font-bold text-slate-800 mb-3 leading-tight line-clamp-3 group-hover:text-red-600 transition-colors">
                {news.title}
              </h2>
              <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                {news.description}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-900 group-hover:translate-x-1 transition-transform">
                  Read Full Story →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
