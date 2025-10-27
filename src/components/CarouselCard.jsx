import React, { useState } from "react";

export default function CarouselCard({ item, widthPx, onClick }) {
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

      <div className="meta">{name || "—"}</div>
    </div>
  );
}
