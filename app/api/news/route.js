// app/api/news/route.js
import { NextResponse } from "next/server";
import RSSParser from "rss-parser";

export async function GET() {
  const parser = new RSSParser({
    customFields: {
      item: [
        ["media:content", "mediaContent"],
        ["media:thumbnail", "mediaThumbnail"],
      ],
    },
  });

  try {
    // Server-side pe RSS fetch karne pe CORS error nahi aata
    const feed = await parser.parseURL(process.env.NEXT_PUBLIC_RSS_URL);

    const newsItems = feed.items.map((item) => {
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

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
