import { type Video, Util } from "youtube-sr";

import Radio from "../components/radio";

// the `sp` query parameter filters results to livestreams only
const YOUTUBE_URL =
  "https://www.youtube.com/results?search_query=lofi+radio&sp=EgQQAUAB";

// refresh station list every two hours
export const revalidate = 60 * 60 * 2;

export default async function Page() {
  const html = await Util.getHTML(YOUTUBE_URL);
  const videos = Util.parseSearchResult(html, { type: "video" }) as Video[];

  return (
    <Radio
      stations={videos.map((video) => ({
        title: video.title,
        id: video.id,
      }))}
    />
  );
}
