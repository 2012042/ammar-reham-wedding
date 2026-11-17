"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { content, settings, type Lang } from "@/lib/config";
import { Corner, Divider, TlIcon } from "./Ornaments";

/* Deterministic pseudo-random so server and client markup match. */
const rnd = (i: number, s: number) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function Particles() {
  return (
    <div className="particles" aria-hidden>
      {Array.from({ length: 56 }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(rnd(i, 1) * 100).toFixed(2)}%`,
            top: `${(rnd(i, 2) * 100).toFixed(2)}%`,
            animationDelay: `${(-rnd(i, 3) * 14).toFixed(2)}s`,
            animationDuration: `${(9 + rnd(i, 4) * 10).toFixed(2)}s`,
            ["--s" as string]: (0.5 + rnd(i, 5)).toFixed(2),
          }}
        />
      ))}
    </div>
  );
}

function Countdown({ units, todayText }: { units: readonly string[]; todayText: string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(settings.dateISO).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left !== null && left <= 0) return <p className="today">{todayText}</p>;
  const s = Math.max(0, Math.floor((left ?? 0) / 1000));
  const vals = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
  return (
    <div className="countdown" dir="ltr">
      {vals.map((v, i) => (
        <div className="cd-box" key={i}>
          <b>{left === null ? "--" : String(v).padStart(2, "0")}</b>
          <small>{units[i]}</small>
        </div>
      ))}
    </div>
  );
}

function Cover({ t, open, onOpen }: { t: (typeof content)[Lang]; open: boolean; onOpen: () => void }) {
  return (
    <button className={`cover cover-classic ${open ? "is-open" : ""}`} onClick={onOpen} aria-label={t.coverHint}>
      <span className="env-body" />
      <span className="env-bottom" />
      <span className="env-flap" />
      <span className="seal">
        <span className="mono">
          {t.monogram[0]}
          <i>&</i>
          {t.monogram[1]}
        </span>
      </span>
      <span className="hint">{t.coverHint}</span>
    </button>
  );
}

export default function Invitation() {
  const [lang, setLang] = useState<Lang>(settings.defaultLang);
  const [open, setOpen] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const t = content[lang];

  // Read ?lang= from the link.
  useEffect(() => {
    const l = new URLSearchParams(window.location.search).get("lang");
    if (l === "ar" || l === "en") setLang(l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = `${t.groom} & ${t.bride}`;
  }, [lang, t]);

  useEffect(() => {
    document.body.style.overflow = coverGone ? "" : "hidden";
  }, [coverGone]);

  // Reveal sections as they scroll into view.
  useEffect(() => {
    const els = root.current?.querySelectorAll(".rv, .timeline");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.18 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const play = useCallback(() => {
    const a = audio.current;
    if (!a) return;
    a.volume = 0.6;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) play();
    else {
      a.pause();
      setPlaying(false);
    }
  };

  const openCover = () => {
    if (open) return;
    setOpen(true);
    play();
    setTimeout(() => setCoverGone(true), 1900);
  };

  const wa = settings.whatsapp ? `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(t.rsvpMsg)}` : "";
  const num = (n: number) => (lang === "ar" ? ["٠١", "٠٢", "٠٣", "٠٤", "٠٥", "٠٦", "٠٧"][n - 1] : `0${n}`);

  return (
    <div ref={root} className={`inv theme-classic lang-${lang} ${open ? "opened" : ""}`}>
      <audio ref={audio} src={settings.music} loop preload="auto" />
      <Particles />

      {!coverGone && <Cover t={t} open={open} onOpen={openCover} />}

      {/* ───── Floating controls ───── */}
      <div className="fabs">
        <button className="fab" onClick={() => setLang(lang === "ar" ? "en" : "ar")} aria-label="Language">
          {lang === "ar" ? "EN" : "ع"}
        </button>
        <button className={`fab fab-music ${playing ? "playing" : ""}`} onClick={toggleMusic} aria-label="Music">
          {playing ? (
            <span className="eq">
              <i />
              <i />
              <i />
              <i />
            </span>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          )}
        </button>
      </div>

      <main className="page">
        {/* ───── Hero ───── */}
        <section className="hero">
          <div className="hero-frame">
            <Corner className="corner c1" />
            <Corner className="corner c2" />
            <Corner className="corner c3" />
            <Corner className="corner c4" />

            <p className="poem h-anim a1">
              {t.poem[0]}
              <br />
              {t.poem[1]}
            </p>
            <p className="invite-line h-anim a2">{t.inviteLine}</p>
            <h1 className="names">
              <span className="h-anim a3">{t.groom}</span>
              <i className="h-anim a4">{t.and}</i>
              <span className="h-anim a5">{t.bride}</span>
            </h1>
            <p className="date-short h-anim a6" dir="ltr">
              {settings.dateShort}
            </p>
          </div>
          <span className="scroll-cue" aria-hidden />
        </section>

        {/* ───── Verse ───── */}
        <section className="sec verse-sec rv">
          <p className="basmala">{t.basmala}</p>
          <Divider />
          <p className="verse">{t.verse}</p>
          <p className="ref">{t.verseRef}</p>
        </section>

        {/* ───── Welcome ───── */}
        <section className="sec rv">
          <span className="idx">{num(1)}</span>
          <h2>{t.welcomeTitle}</h2>
          <Divider />
          <p className="lead">{t.welcomeText}</p>
        </section>

        {/* ───── Countdown ───── */}
        <section className="sec rv">
          <span className="idx">{num(2)}</span>
          <h2>{t.countdownTitle}</h2>
          <Divider />
          <Countdown units={t.units} todayText={t.today} />
          <div className="dateblock">
            <span className="db-month">{t.dateBlock.month}</span>
            <div className="db-row">
              <span className="db-side">{t.dateBlock.day}</span>
              <b dir="ltr">{t.dateBlock.num}</b>
              <span className="db-side">{t.dateBlock.time}</span>
            </div>
            <span className="db-year" dir="ltr">{t.dateBlock.year}</span>
          </div>
          <p className="muted">{t.timeLong}</p>
        </section>

        {/* ───── Schedule ───── */}
        <section className="sec rv">
          <span className="idx">{num(3)}</span>
          <h2>{t.scheduleTitle}</h2>
          <Divider />
          <ol className="timeline">
            {t.schedule.map((s, i) => (
              <li key={s.time} style={{ ["--i" as string]: i }}>
                <div className="tl-body">
                  <b dir="ltr">{s.time}</b>
                  <span>{s.label}</span>
                </div>
                <span className="tl-icon">
                  <TlIcon name={s.icon} />
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ───── Story ───── */}
        <section className="sec rv">
          <span className="idx">{num(4)}</span>
          <h2>{t.storyTitle}</h2>
          <Divider />
          <div className="story">
            <figure className="story-art">
              <svg className="story-ornament" viewBox="0 0 240 240" fill="none" aria-hidden>
                <circle cx="120" cy="120" r="92" stroke="currentColor" />
                <circle cx="120" cy="120" r="82" stroke="currentColor" strokeDasharray="1 5" />
                <path d="M120 43 133 63 120 83 107 63 120 43ZM120 157 133 177 120 197 107 177 120 157ZM43 120 63 107 83 120 63 133 43 120ZM157 120 177 107 197 120 177 133 157 120Z" stroke="currentColor" />
                <path d="M88 91c9-12 21-12 32 0 11-12 23-12 32 0M88 149c9 12 21 12 32 0 11 12 23 12 32 0" stroke="currentColor" strokeLinecap="round" />
                <circle cx="120" cy="120" r="3" fill="currentColor" />
              </svg>
              <p className="story-monogram" dir="ltr">
                <span>{t.monogram[0]}</span>
                <i>&</i>
                <span>{t.monogram[1]}</span>
              </p>
              <figcaption>{t.storyCaption}</figcaption>
            </figure>
            <span className="story-dot" aria-hidden />
          </div>
        </section>

        {/* ───── Location ───── */}
        <section className="sec rv">
          <span className="idx">{num(5)}</span>
          <h2>{t.locationTitle}</h2>
          <Divider />
          <div className="card">
            <svg className="pin" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
              <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <h3>{t.venue}</h3>
            {t.address && <p className="muted">{t.address}</p>}
            <a className="btn" href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
              {t.mapBtn}
            </a>
          </div>
        </section>

        {/* ───── Notes ───── */}
        <section className="sec rv">
          <span className="idx">{num(6)}</span>
          <h2>{t.notesTitle}</h2>
          <Divider />
          <ul className="notes">
            {t.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        {/* ───── RSVP ───── */}
        {wa && (
          <section className="sec rv">
            <span className="idx">{num(7)}</span>
            <h2>{t.rsvpTitle}</h2>
            <Divider />
            <p className="lead">{t.rsvpText}</p>
           
          </section>
        )}

        {/* ───── Closing ───── */}
        <section className="sec closing rv">
          <p className="lead">{t.closing}</p>
          <p className="muted">{t.withLove}</p>
          <p className="sign">
            {t.groom} <i>{t.and}</i> {t.bride}
          </p>
          <p className="date-short" dir="ltr">
            {settings.dateShort}
          </p>
        </section>
      </main>
    </div>
  );
}
