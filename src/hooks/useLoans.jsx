// src/hooks/useLoans.js
import { useState, useEffect, useCallback } from 'react';
import { loanService } from '../services/api';

export function useLoans(init = {}) {
  const [loans,   setLoans]   = useState([]);
  const [meta,    setMeta]    = useState({ total:0, last_page:1, current_page:1 });
  const [loading, setLoading] = useState(false);
  const [params,  setParams]  = useState({ page:1, per_page:15, ...init });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await loanService.list(params);
      setLoans(data.data);
      setMeta({ total: data.total, last_page: data.last_page, current_page: data.current_page });
    } finally { setLoading(false); }
  }, [params]);

  useEffect(() => { fetch(); }, [fetch]);

  const returnBook = async id => { await loanService.return(id); fetch(); };

  return {
    loans, meta, loading, params, refresh: fetch, returnBook,
    setPage:   p => setParams(x => ({ ...x, page: p })),
    setStatus: s => setParams(x => ({ ...x, status: s, page:1 })),
  };
}

export function useMyLoans() {
  const [loans,   setLoans]   = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try { const { data } = await loanService.myLoans(); setLoans(data); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return {
    loans, loading, refresh: fetch,
    returnBook: async id => { await loanService.return(id); fetch(); },
    borrow:     async id => { await loanService.borrow(id); fetch(); },
  };
}