import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Carousel.css";
import Card from "./CarouselCard";

export default function Carousel({
  items = [],
  title,
  onItemClick,
  showArrows = true,
  gap = 12,
  itemWidth = 220,
  autoPlay = true,
  autoPlayInterval = 2500,
  autoPauseOnHover = true,
}) {
  const listRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [paused, setPaused] = useState(false);

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
  const interactionPauseUntilRef = useRef(0);

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
    interactionPauseUntilRef.current = Date.now() + autoPlayInterval;
    const next = useInfinite
      ? el.scrollLeft + dir * stepRef.current
      : Math.max(0, Math.min(el.scrollLeft + dir * stepRef.current, el.scrollWidth - el.clientWidth));
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  // autoplay suave (respeita hover e interações)
  useEffect(() => {
    if (!autoPlay) return;
    const el = listRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tick = () => {
      if (!el) return;
      if (paused) return;
      if (Date.now() < interactionPauseUntilRef.current) return;
      if (!isScrollable && !useInfinite) return;
      el.scrollBy({ left: stepRef.current, behavior: "smooth" });
    };

    const id = window.setInterval(tick, Math.max(1200, autoPlayInterval));
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, paused, isScrollable, useInfinite, gap, itemWidth, cards.length]);

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
          }}
          onScroll={handleScroll}
          onMouseEnter={autoPauseOnHover ? () => setPaused(true) : undefined}
          onMouseLeave={autoPauseOnHover ? () => setPaused(false) : undefined}
        >
          {cards.length === 0 ? null : (
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

/* Card foi extraído para src/components/CarouselCard.jsx */

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
