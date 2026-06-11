// src/hooks/useUsers.js
import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';

export function useUsers(init = {}) {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ total: 0, last_page: 1, current_page: 1 });
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ page: 1, per_page: 15, ...init });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userService.list(params);
      if (Array.isArray(data)) {
        setUsers(data);
        setMeta({ total: data.length, last_page: 1, current_page: 1 });
      } else {
        setUsers(data.data ?? []);
        setMeta({ total: data.total ?? 0, last_page: data.last_page ?? 1, current_page: data.current_page ?? 1 });
      }
    } finally { setLoading(false); }
  }, [params]);

  useEffect(() => { fetch(); }, [fetch]);

  return {
    users, meta, loading, params, refresh: fetch,
    deleteUser: async id => { await userService.delete(id); fetch(); },
    setPage: p => setParams(x => ({ ...x, page: p })),
    setSearch: s => setParams(x => ({ ...x, search: s, page: 1 })),
    setRole: r => setParams(x => ({ ...x, role: r, page: 1 })),
  };
}