import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/video-player";

export type Props = {
  mediaType: "video/mp4" | "audio/mp3";
  mediaUrl: string;
  className?: string;
};

export default function CoursePlaybackSection({
  mediaType,
  mediaUrl,
  className,
}: Props) {
  return (
    <div className={cn("course-playback-section", className)}>
      <VideoPlayer
        options={{
          controls: true,
          responsive: true,
          fluid: false,
          fill: true,
          preload: "auto",
          sources: [{ src: mediaUrl, type: mediaType }],
        }}
      />
    </div>
  );
}
