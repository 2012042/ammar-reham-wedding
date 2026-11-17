/** Art-deco corner. */
export function Corner({ className }: { className?: string }) {
  return (
    <svg className={className} width="74" height="74" viewBox="0 0 74 74" fill="none" stroke="currentColor" aria-hidden>
      <path d="M1 73 V22 Q1 1 22 1 H73" strokeWidth="1" />
      <path d="M9 73 V28 Q9 9 28 9 H73" strokeWidth="0.6" opacity="0.7" />
      <path d="M20 44 Q20 20 44 20" strokeWidth="0.6" opacity="0.7" />
      <circle cx="17" cy="17" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Section divider. */
export function Divider() {
  return (
    <div className="divider">
      <svg width="190" height="22" viewBox="0 0 190 22" fill="none" stroke="currentColor" aria-hidden>
        <path d="M0 11 H70 M120 11 H190" strokeWidth="0.8" />
        <path d="M95 3 L103 11 L95 19 L87 11Z" strokeWidth="1" />
        <path d="M70 11 Q78 2 84 11 M120 11 Q112 20 106 11" strokeWidth="0.8" />
        <circle cx="95" cy="11" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

/** Small icons for the programme timeline. */
export function TlIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    welcome: <path d="M7 3h10l-1 6a4 4 0 0 1-8 0L7 3zM12 13v6M8.5 20h7M8 7h8" />,
    hearts: <path d="M12 20s-7-4.4-7-9.200A3.8 3.8 0 0 1 12 8.4 3.8 3.8 0 0 1 19 10.800C19 15.6 12 20 12 20z" />,
    music: (
      <>
        <path d="M9 17V5l10-2v12" />
        <circle cx="6.5" cy="17" r="2.5" />
        <circle cx="16.5" cy="15" r="2.5" />
      </>
    ),
    moon: <path d="M19 14.500A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.500zM17 4v3M15.5 5.500h3" />,
  };
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name] ?? paths.hearts}
    </svg>
  );
}
