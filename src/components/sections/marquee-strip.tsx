const ITEMS = ["Websites", "Digitale Erlebnisse", "Web-Anwendungen", "KI & Automatisierung"];

export function MarqueeStrip() {
  const content = (
    <span className="flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((item, i) => (
        <span key={item} className="flex items-center gap-10">
          <span className="font-display text-stroke text-4xl font-semibold whitespace-nowrap sm:text-6xl md:text-7xl">
            {item}
          </span>
          <span
            aria-hidden
            className={i === ITEMS.length - 1 ? "hidden" : "bg-accent block h-2 w-2 rounded-full"}
          />
        </span>
      ))}
    </span>
  );

  return (
    <div className="border-line relative overflow-hidden border-y py-6 sm:py-8" aria-hidden>
      <div className="animate-marquee flex w-max">
        {content}
        {content}
      </div>
    </div>
  );
}
