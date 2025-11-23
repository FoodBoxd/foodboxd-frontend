import React from 'react';
import './UserAvatar.css';

export default function UserAvatar({ src, name, size = '40px', fontSize = '1.2rem', className = '' }) {
  const hasPhoto = src && src.trim() !== '';

  return (
    <div
      className={`user-avatar-component ${className}`}
      style={{ width: size, height: size, fontSize: fontSize }}
    >
      {hasPhoto ? (
        <img src={src} alt={name} />
      ) : (
        <span className="avatar-initial">{name ? name[0].toUpperCase() : '?'}</span>
      )}
    </div>
  );
}