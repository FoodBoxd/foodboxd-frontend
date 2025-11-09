import React, { useState } from "react";
import StarRating from './StarRating'; // Importa o componente de estrelas
import './SearchResultCard.css';


export default function SearchResultCard({ item, onClick }) {
  const { imageUrl, name, averageScore, ratingCount } = item || {};
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      className="search-result-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="search-card-poster">
        {imgOk && imageUrl ? (
          <img
            src={imageUrl}
            alt={name ? `Foto de ${name}` : "Foto do prato"}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="search-card-poster-fallback" />
        )}
      </div>

      <div className="search-card-meta">
        <h3 className="search-card-name">{name || "—"}</h3>
        <div className="search-card-rating-info">
          {ratingCount > 0 ? (
            <>
              {/* Reutiliza o componente StarRating */}
              <StarRating score={averageScore} />
              <span className="search-card-rating-count">
                ({ratingCount})
              </span>
            </>
          ) : (
            <span className="search-card-no-rating">
              Sem avaliações
            </span>
          )}
        </div>
      </div>
    </div>
  );
}