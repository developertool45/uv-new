import RSSParser from "rss-parser";

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
    const RSS_URL = "http://localhost:3000/news-api/ndtvnews-india-news";

    let newsItems = [];
    try {
        const feed = await parser.parseURL(RSS_URL);

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
}

export default fetchData