// src/hooks/useUsers.js
import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/api';

export function useUsers(init = {}) {
  const [users,   setUsers]   = useState([]);
  const [meta,    setMeta]    = useState({ total:0, last_page:1, current_page:1 });
  const [loading, setLoading] = useState(false);
  const [params,  setParams]  = useState({ page:1, per_page:15, ...init });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userService.list(params);
      setUsers(data.data);
      setMeta({ total: data.total, last_page: data.last_page, current_page: data.current_page });
    } finally { setLoading(false); }
  }, [params]);

  useEffect(() => { fetch(); }, [fetch]);

  return {
    users, meta, loading, refresh: fetch,
    deleteUser: async id => { await userService.delete(id); fetch(); },
    setPage:    p => setParams(x => ({ ...x, page: p })),
    setSearch:  s => setParams(x => ({ ...x, search: s, page:1 })),
  };
}