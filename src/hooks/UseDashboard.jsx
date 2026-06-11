// src/hooks/useDashboard.js
import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';

export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dashboardService.stats().then(r => setStats(r.data)).finally(() => setLoading(false));
  }, []);
  return { stats, loading };
}