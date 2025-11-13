import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api';
import FeedPost from './FeedPost';
import './InfiniteFeed.css';

export default function InfiniteFeed({ feedType, userId }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentinelRef = useRef(null);

  const observer = useRef(null);

  const fetchPosts = useCallback(async (pageToFetch) => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pageToFetch,
        pageSize: 10,
      };
      if (feedType === 'user' && userId) {
        params.userId = userId;
      }

      const response = await api.get('ratings/feed', { params });
      
      setPosts((prevPosts) => {
        const newPosts = response.data.items;
        const existingIds = new Set(prevPosts.map(p => p.ratingId));
        const filteredPosts = newPosts.filter(p => !existingIds.has(p.ratingId));
        return [...prevPosts, ...filteredPosts];
      });
      
      setPage(pageToFetch + 1); 
      setHasMore(response.data.hasMorePages);

    } catch (err) {
      console.error("Erro ao buscar feed:", err);
      setError("Não foi possível carregar mais posts.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, feedType, userId]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchPosts(page);
      }
    });

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchPosts, loading, hasMore, page]); 

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setLoading(false);

    if (observer.current) observer.current.disconnect();
    fetchPosts(1);
  }, [feedType, userId]); 

  return (
    <div className="feed-container">
      {posts.map(post => (
        <FeedPost key={post.ratingId} post={post} />
      ))}
      
      {/* Sentinela de Carregamento */}
      <div ref={sentinelRef} className="feed-sentinel">
        {loading && <div className="feed-loading-spinner" />}
        {!hasMore && posts.length > 0 && <p>Fim dos resultados.</p>}
      </div>

      {error && <div className="feed-error">{error}</div>}
      
      {!loading && posts.length === 0 && !error && (
         <p className="feed-empty">
           {feedType === 'user' ? 'Este usuário ainda não avaliou nada.' : 'Nenhuma avaliação encontrada.'}
         </p>
      )}
    </div>
  );
}