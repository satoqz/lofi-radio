import ytsr, { type Video } from "ytsr";

import Radio from "../components/radio";

const query =
  "https://www.youtube.com/results?search_query=lofi+radio&sp=EgQQAUAB";

// refresh station list every two hours
export const revalidate = 60 * 60 * 2;

export default async function Page() {
  const { items } = await ytsr(query);
  const videos = items.filter((item) => item.type == "video") as Array<Video>;

  return (
    <Radio
      stations={videos.map((video) => ({
        name: video.title,
        key: video.id,
      }))}
    />
  );
}
