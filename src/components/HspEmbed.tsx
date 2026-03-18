interface HspEmbedProps {
  experiment: string;
  title: string;
  aspectRatio?: string;
}

export default function HspEmbed({
  experiment,
  title,
  aspectRatio = '4/3',
}: HspEmbedProps) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden border border-boundary-blue/30 bg-black"
      style={{ aspectRatio }}
    >
      <iframe
        src={`/break-and-shift/hsp/${experiment}/index.html`}
        className="w-full h-full border-0"
        allow="autoplay"
        title={title}
      />
    </div>
  );
}
