import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Carousel.css";

export default function Carousel({
  items = [],
  title,
  onItemClick,
  showArrows = true,
  visibleCount = 3,
  gap = 12,
  itemWidth = 220, 
}) {
  const listRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const widthPx = useMemo(
    () => (typeof itemWidth === "number" ? `${itemWidth}px` : itemWidth),
    [itemWidth]
  );

  const cards = Array.isArray(items) ? items : [];
  const useInfinite = cards.length > 0;
  const copiesCount = useInfinite ? 3 : 1;

  // controles para wrap infinito
  const baseWidthRef = useRef(0);
  const adjustingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);

  const stepRef = useRef(0);
  useEffect(() => {
    stepRef.current = (typeof itemWidth === "number" ? itemWidth : parseInt(itemWidth, 10) || 220) + gap;
  }, [itemWidth, gap]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const updateFlags = () => {
      const total = el.scrollWidth;
      const base = copiesCount > 1 ? total / copiesCount : total;
      baseWidthRef.current = base;
      setIsScrollable(base > el.clientWidth + 2);
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
    };

    const half = stepRef.current / 2;
    if (cards.length > 0) {
      const base = copiesCount > 1 ? el.scrollWidth / copiesCount : 0;
      const startAt = (copiesCount > 1 ? base : 0) + half;
      el.scrollTo({ left: startAt, behavior: "auto" });
    }

    updateFlags();

    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      const ro = new ResizeObserver(() => updateFlags());
      ro.observe(el);
      return () => ro.disconnect();
    } else {
      const onResize = () => updateFlags();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [cards.length]);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);

    if (!useInfinite || adjustingRef.current) return;

    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      const base = baseWidthRef.current;
      if (!el || base <= 0) return;
      const sl = el.scrollLeft;
      const tol = 2;
      if (sl <= tol) {
        adjustingRef.current = true;
        el.scrollTo({ left: sl + base, behavior: "auto" });
        requestAnimationFrame(() => (adjustingRef.current = false));
      } else if (sl >= base * 2 - tol) {
        adjustingRef.current = true;
        el.scrollTo({ left: sl - base, behavior: "auto" });
        requestAnimationFrame(() => (adjustingRef.current = false));
      }
    }, 200);
  };

  const handleScrollBy = (dir) => {
    const el = listRef.current;
    if (!el || !cards.length) return;
    const next = useInfinite
      ? el.scrollLeft + dir * stepRef.current
      : Math.max(0, Math.min(el.scrollLeft + dir * stepRef.current, el.scrollWidth - el.clientWidth));
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  return (
    <section className="carousel-section">
      {title && <h2 className="carousel-title">{title}</h2>}

      <div className="carousel-wrapper">
        {showArrows && (
          <button
            type="button"
            className="carousel-nav side left"
            aria-label="Scroll left"
            onClick={() => handleScrollBy(-1)}
            disabled={!isScrollable && !useInfinite}
          >
            <ChevronLeft />
          </button>
        )}

        <div
          className="carousel-list"
          ref={listRef}
          style={{
            "--gap": `${gap}px`,
            "--card-width": widthPx,
            "--viewport-cards": 4, 
          }}
          onScroll={handleScroll}
        >
          {cards.length === 0 ? (
            <EmptyState widthPx={widthPx} />
          ) : (
            Array.from({ length: copiesCount }).map((_, copyIdx) =>
              cards.map((item, idx) => (
                <Card
                  key={`${item.id ?? idx}-copy${copyIdx}`}
                  widthPx={widthPx}
                  item={item}
                  onClick={() => onItemClick?.(item)}
                />
              ))
            )
          )}
        </div>

        {showArrows && (
          <button
            type="button"
            className="carousel-nav side right"
            aria-label="Scroll right"
            onClick={() => handleScrollBy(1)}
            disabled={!isScrollable && !useInfinite}
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */

function Card({ item, widthPx, onClick }) {
  const { imageUrl, name } = item || {};
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      className="carousel-card"
      style={widthPx && widthPx !== "auto" ? { width: widthPx } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="poster" aria-hidden={!imageUrl}>
        {imgOk && imageUrl ? (
          <img
            src={imageUrl}
            alt={name ? `Poster de ${name}` : "Poster"}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="poster-fallback" />
        )}
      </div>

      <div className="meta">
        <span className="name" title={name}>
          {name || "—"}
        </span>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden
      focusable="false"
      style={{ display: "block" }}
    >
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden
      focusable="false"
      style={{ display: "block" }}
    >
      <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
    </svg>
  );
}
