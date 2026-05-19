interface Props {
  title: string;
  description?: string;
}

export default function ComingSoon({ title, description }: Props) {
  return (
    <div
      className="simulator-container flex flex-col items-center justify-center text-center"
      style={{ minHeight: '320px', borderStyle: 'dashed' }}
    >
      <p className="text-boundary-cyan text-lg mb-2">{title}</p>
      <p className="text-boundary-mist text-sm">
        PixiJS 版実装中 — Coming soon
      </p>
      {description && (
        <p className="text-boundary-mist/70 text-xs mt-4 max-w-md">
          {description}
        </p>
      )}
    </div>
  );
}
