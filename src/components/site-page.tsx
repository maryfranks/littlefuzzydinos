import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { getDefaultView, getProductionDestination, type SiteView } from "@/lib/site-mode";
import { applySiteMeta } from "@/lib/site-meta";

const LINKS = {
  github: "https://github.com/maryfranks",
  linkedin: "https://www.linkedin.com/in/maryfranks",
  bluesky: "https://bsky.app/profile/littlefuzzydinos.bsky.social",
  instagram: "https://instagram.com/meandcoqui",
};

type Project = { title: string; description: string; stack: string[]; icon: string; repo: string; demo?: string };
const PROJECTS: Project[] = [
  {
    title: "The Library",
    description:
      "A browser-based retro terminal text adventure game featuring multi-stage map exploration, local debug tooling, and OpenTelemetry instrumentation.",
    stack: ["TypeScript", "React", "Vite", "Bun", "OpenTelemetry"],
    icon: "/assets/open-book.png",
    repo: "https://github.com/maryfranks/the-library",
    demo: "https://library.littlefuzzydinos.com",
  },
];

const BOAT_PHOTOS = [
  { src: "/assets/boat-1.jpg", caption: "SV Coqui" },
  { src: "/assets/boat-2.jpg", caption: "SV Coqui" },
];

// Vessel specifications shown in the Sailing hero readout.
const SPECS = [
  { label: "LOA", value: "42.50 ft" },
  { label: "LWL", value: "38.00 ft" },
  { label: "Beam", value: "14.00 ft" },
  { label: "Draft", value: "4'11\"" },
  { label: "Disp", value: "23,800 lbs" },
  { label: "Ballast", value: "7,600 lbs" },
  { label: "Air Draft", value: "64.50 ft" },
];

const STATUSES = [
  "Close Hauled · hardening up",
  "Broad Reach · rolling gently",
  "Tacking · coming about",
  "In Irons · waiting for the wind",
  "Bow to the waves · spray on the dodger",
  "Heedful · watching the barometer drop",
  "Adrift on purpose · making coffee",
];

type Book = { title: string; author: string; marginalia: string };

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
      {children}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

const iconCls = "h-[18px] w-[18px] fill-current";
const Icons = {
  github: (
    <svg viewBox="0 0 24 24" className={iconCls}><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className={iconCls}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
  ),
  bluesky: (
    <svg viewBox="0 0 24 24" className={iconCls}><path d="M5.2 2.9C7.95 4.97 10.9 9.16 12 11.42c1.1-2.26 4.05-6.45 6.8-8.52 1.98-1.49 5.2-2.64 5.2 1.03 0 .73-.42 6.15-.67 7.03-.85 3.06-3.97 3.84-6.74 3.37 4.85.83 6.08 3.56 3.42 6.3-5.06 5.19-7.27-1.3-7.84-2.97-.1-.3-.15-.45-.17-.33-.02-.12-.07.03-.17.33-.57 1.67-2.78 8.16-7.84 2.97-2.66-2.74-1.43-5.47 3.42-6.3-2.77.47-5.89-.31-6.74-3.37C.42 10.08 0 4.66 0 3.93 0 .26 3.22 1.41 5.2 2.9Z"/></svg>
  ),
};

function SiteHeader({ view, onSelect }: { view: SiteView; onSelect: (view: SiteView) => void }) {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between gap-5 px-6 py-6">
      <nav aria-label="Choose a site" className="inline-flex rounded-[4px] border border-border bg-muted p-[3px] font-mono text-xs tracking-[0.14em] shadow-[inset_0_1px_2px_oklch(0.12_0.005_255)]">
        {(["portfolio", "sailing"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={view === item}
            onClick={() => onSelect(item)}
            className={`rounded-[3px] px-4 py-1.5 uppercase transition-colors ${
              view === item
                ? "bg-primary font-medium text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-heading"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-muted-foreground">
        {(["github", "linkedin", "bluesky"] as const).map((key) => (
          <a key={key} href={LINKS[key]} aria-label={key} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">{Icons[key]}</a>
        ))}
      </div>
    </header>
  );
}

function PortfolioContent() {
  const link = "text-accent-hover/90 underline decoration-accent underline-offset-4 transition-colors hover:text-accent-hover";

  return (
    <>
      <section className="grid items-center gap-10 py-16 md:grid-cols-[1fr_auto]">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">Site Reliability &amp; Infrastructure Engineer</p>
          <h1 className="mt-3 text-5xl font-medium text-heading md:text-6xl">Mary Franks</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-light">
            I design and maintain resilient cloud infrastructure that stays up when the weather gets rough—and bounces right back when it doesn't. Modern tooling, clean automation, and resilient systems. Based in Florida, operating globally.
          </p>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-[4px] bg-primary px-6 py-2.5 font-mono text-sm font-medium tracking-wider text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-pressed">
            Contact
          </a>
        </div>
        <div className="rounded-[6px] border border-border bg-card p-2">
          <img src="/assets/dino.jpg" alt="Mary Franks avatar" className="h-56 w-56 rounded-[4px] object-cover brightness-[0.72] contrast-[1.05] saturate-[0.7] sepia-[0.3]" />
        </div>
      </section>

      <section className="py-12">
        <Label>Projects</Label>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article key={project.title} className="flex gap-5 rounded-[6px] border border-border bg-card p-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[4px] border border-border bg-muted">
                <img src={project.icon} alt="" className="h-11 w-11 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-medium text-heading">{project.title}</h3>
                <p className="mt-2 leading-relaxed">{project.description}</p>
                <p className="mt-4 font-mono text-xs text-muted-foreground">{project.stack.join(" · ")}</p>
                <div className="mt-4 flex gap-5 font-mono text-sm">
                  <a href={project.repo} target="_blank" rel="noreferrer" className={link}>GitHub</a>
                  {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className={link}>Live Demo</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BoatPhoto({ src, caption }: { src: string; caption: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "loaded" | "missing">("loading");

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) setState(image.naturalWidth > 0 ? "loaded" : "missing");
  }, [src]);

  return (
    <article className="overflow-hidden rounded-[4px] border border-border bg-card">
      <div className={`relative bg-muted ${state === "loaded" ? "" : "aspect-[4/3]"}`}>
        {state !== "loaded" && (
          <div className="absolute inset-0 flex items-center justify-center" aria-label={state === "missing" ? "Photo placeholder" : "Loading photo"}>
            <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">{state === "missing" ? "Photo coming soon" : "Loading photo…"}</span>
          </div>
        )}
        <img
          ref={imageRef}
          src={src}
          alt={caption}
          onLoad={() => setState("loaded")}
          onError={() => setState("missing")}
          className={state === "loaded" ? "block h-auto w-full" : "absolute h-px w-px opacity-0"}
        />
      </div>
      <p className="p-4 text-sm text-heading">{caption}</p>
    </article>
  );
}

export function SailingContent() {
  return (
    <>
      <section className="py-16">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">1991 Hunter Legend 43</p>
            <h1 className="mt-3 text-5xl font-medium text-heading md:text-6xl">SV Coqui</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed font-light">
              A 42.5-foot performance cruiser designed by the Hunter Design Team under Cortland Steck and built in Alachua, Florida. Powered by a 50hp Yanmar 4JH2-E diesel, she carries a double-spreader fractional sloop rig, a bulb-wing keel, and a spade rudder—responsive in heavy air, predictably pointing high and holding her own against similar boats of her era. Configured with a 14-foot beam and 6'8" of headroom, the interior has two proper staterooms (including a centerline queen aft) and two enclosed heads, with the midship bunk cabin converted into dedicated workshop and spares storage.
            </p>
            <p className="mt-6 max-w-xl font-mono text-xs leading-relaxed text-muted-foreground">
              <span aria-hidden>†</span> Coquí (/koʊˈki/) is the common name for the small tree frogs endemic to Puerto Rico, named for their high-pitched nocturnal call. Read more on{" "}
              <a href="https://en.wikipedia.org/wiki/Coqu%C3%AD" target="_blank" rel="noreferrer" className="text-accent-hover underline decoration-accent underline-offset-4 transition-colors hover:text-primary">Wikipedia</a>.
            </p>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-[4px] bg-primary px-6 py-2.5 font-mono text-sm font-medium tracking-wider text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-pressed">
              Follow Along
            </a>
          </div>
          <div className="rounded-[6px] border border-border bg-card p-2">
            <img
              src="public/assets/wood-coqui-glyph.png"
              alt="Coqui frog glyph"
              className="h-56 w-56 rounded-[4px] object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <Label>Vessel Specifications</Label>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-[6px] border border-border bg-card px-6 py-5 sm:grid-cols-4">
            {SPECS.map((spec) => (
              <div key={spec.label} className="border-l border-border pl-3">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{spec.label}</dt>
                <dd className="mt-1 font-mono text-sm text-heading">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-12">
        <Label>Aboard SV Coqui</Label>
        <div className="grid gap-5 md:grid-cols-2">
          {BOAT_PHOTOS.map((photo) => <BoatPhoto key={photo.src} {...photo} />)}
        </div>
      </section>
    </>
  );
}

export function SitePage({ initialView }: { initialView: SiteView }) {
  const navigate = useNavigate();
  const [view, setView] = useState<SiteView>(initialView);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setView(getDefaultView(window.location.hostname, window.location.pathname));
    setStatus(STATUSES[Math.floor(Math.random() * STATUSES.length)] ?? "");
    fetch("/data/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.currently_reading ?? []))
      .catch(() => setBooks([]));
  }, []);

  useEffect(() => {
    applySiteMeta(view);
  }, [view]);

  function selectView(nextView: SiteView) {
    const destination = getProductionDestination(nextView, window.location.hostname);
    if (destination) {
      window.location.assign(destination);
      return;
    }
    setView(nextView);
    void navigate({ to: nextView === "sailing" ? "/sailing" : "/" });
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${view === "sailing" ? "theme-sailing" : ""}`}>
      <SiteHeader view={view} onSelect={selectView} />
      <main className="mx-auto max-w-5xl px-6">
        {view === "sailing" ? <SailingContent /> : <PortfolioContent />}

        <section className="py-12">
          <Label>
            <img src="/assets/compass-rose.png" alt="" className="h-5 w-5 object-contain" />
            Currently Reading
          </Label>
          <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto pb-4">
            {books === null && <p className="font-mono text-sm text-muted-foreground">Loading shelf…</p>}
            {books?.length === 0 && <p className="font-mono text-sm text-muted-foreground">Shelf is empty.</p>}
            {books?.map((book) => (
              <article key={book.title} className="w-72 shrink-0 snap-start rounded-[6px] border border-border border-l-2 border-l-primary bg-card p-5">
                <h3 className="text-xl font-medium text-heading italic">{book.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{book.author}</p>
                <p className="mt-4 rounded-[3px] bg-muted p-3 text-sm leading-relaxed">{book.marginalia}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-8">
          <p className="font-mono text-xs text-muted-foreground">{status}</p>
          <div className="flex items-center gap-3" aria-hidden>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <img key={index} src="/assets/dino-footprint.png" alt="" className="h-5 w-5 object-contain opacity-60"
                style={{ transform: `translateY(${index % 2 ? -6 : 6}px) rotate(${index % 2 ? 12 : -8}deg)` }} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
