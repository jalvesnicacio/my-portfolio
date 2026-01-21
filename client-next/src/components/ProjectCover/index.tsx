type Media = {
  url: string;
  type: "image" | "video";
  alt?: string;
};

interface Props {
  media?: Media[];
  title: string;
}

export function ProjectCover({ media, title }: Props) {
  const coverMedia = media?.[0];

  if (!coverMedia) {
    return (
      <div className="w-full h-56 flex items-center justify-center bg-gray-200 text-sm text-gray-500">
        No media available
      </div>
    );
  }

  if (coverMedia.type === "image") {
    return (
      <img
        src={coverMedia.url}
        alt={coverMedia.alt || title}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <video
      src={coverMedia.url}
      className="w-full h-full object-cover"
      muted
      playsInline
    />
  );
}
