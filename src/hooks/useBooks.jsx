// src/hooks/useBooks.js
import { useState, useEffect, useCallback } from 'react';
import { bookService } from '../services/bookService';

export function useBooks(init = {}) {
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    last_page: 1,
    current_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    per_page: 12,
    ...init,
  });

  const fetch = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await bookService.list(params);

      if (Array.isArray(data)) {
        setBooks(data);
        setMeta({ total: data.length, last_page: 1, current_page: 1 });
      } else {
        setBooks(data.data ?? []);
        setMeta({
          total: data.total ?? 0,
          last_page: data.last_page ?? 1,
          current_page: data.current_page ?? 1,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    books,
    meta,
    loading,
    params,
    refresh: fetch,
    setPage: page => setParams(current => ({ ...current, page })),
    setSearch: search =>
      setParams(current => ({ ...current, search, page: 1 })),
    setCategory: category =>
      setParams(current => ({ ...current, category, page: 1 })),
  };
}

export function useBook(id) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));

  useEffect(() => {
    if (!id) return;

    let alive = true;

    const fetchBook = async () => {
      setLoading(true);

      try {
        const numericId = Number(id);
        const { data } = await bookService.get(numericId);

        if (alive) {
          setBook(data?.data ?? data ?? null);
        }
      } catch (e) {
        if (alive) {
          setBook(null);
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    };

    fetchBook();

    return () => {
      alive = false;
    };
  }, [id]);

  return { book, loading };
}