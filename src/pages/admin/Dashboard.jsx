import React from 'react';
import { TrendingUp, TrendingDown, BookOpen, Users, ArrowLeftRight, BarChart2 } from 'lucide-react';

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, trend, trendUp, icon: Icon, accent }) {
  return (
    <div style={{ ...s.statCard, '--accent': accent }}>
      <div style={s.statAccentBar} />
      <div style={s.statLabel}>{label}</div>
      <div style={s.statValue}>{value}</div>
      <div style={{ ...s.statTrend, color: trendUp ? 'var(--teal)' : 'var(--rose)' }}>
        {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        <span style={{ marginLeft: 4 }}>{trend}</span>
      </div>
      <div style={s.statIconBg}>
        <Icon size={22} />
      </div>
    </div>
  );
}

// ── Bar Chart ──────────────────────────────────────────────────────────────
const BAR_DATA = [
  { day: 'Lun', val: 55 },
  { day: 'Mar', val: 70 },
  { day: 'Mer', val: 45 },
  { day: 'Jeu', val: 90 },
  { day: 'Ven', val: 75 },
  { day: 'Sam', val: 60 },
  { day: 'Dim', val: 40 },
];

function BarChart() {
  return (
    <div style={s.barWrap}>
      {BAR_DATA.map(({ day, val }) => (
        <div key={day} style={s.barGroup}>
          <div
            style={{
              ...s.bar,
              height: `${val}%`,
              background: val === 90 ? 'var(--gold)' : 'var(--ink)',
              opacity: val === 90 ? 1 : 0.09,
            }}
          />
          <span style={s.barLabel}>{day}</span>
        </div>
      ))}
    </div>
  );
}

// ── Donut Chart ────────────────────────────────────────────────────────────
const DONUT_DATA = [
  { label: 'Informatique', pct: 40, color: '#C9A84C', dash: 95.5, offset: 0 },
  { label: 'Roman',        pct: 30, color: '#1A7A6B', dash: 71.6, offset: -95.5 },
  { label: 'Droit',        pct: 15, color: '#7C6EE8', dash: 35.8, offset: -167 },
  { label: 'Science',      pct: 15, color: '#E87A7A', dash: 35.8, offset: -202.8 },
];
const R = 38, C = 2 * Math.PI * R;

function DonutChart() {
  return (
    <>
      <div style={s.donutWrap}>
        <svg width={110} height={110} viewBox="0 0 100 100" aria-label="Répartition du stock par catégorie">
          <circle cx="50" cy="50" r={R} fill="none" stroke="var(--surface2)" strokeWidth="12" />
          {DONUT_DATA.map(({ color, dash, offset, label }) => (
            <circle
              key={label}
              cx="50" cy="50" r={R}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          ))}
        </svg>
      </div>
      <div style={s.legendList}>
        {DONUT_DATA.map(({ label, pct, color }) => (
          <div key={label} style={s.legendItem}>
            <div style={{ ...s.legendDot, background: color }} />
            <span style={s.legendName}>{label}</span>
            <span style={s.legendPct}>{pct}%</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Recent Loans ───────────────────────────────────────────────────────────
const RECENT_LOANS = [
  { emoji: '📘', bg: '#FFF8E1', title: 'Clean Code',          author: 'R. C. Martin',        member: 'Sara Alami',    status: 'active' },
  { emoji: '📗', bg: '#E8F5E9', title: 'Le Petit Prince',     author: 'A. de Saint-Exupéry', member: 'Karim Benali',  status: 'ok' },
  { emoji: '📕', bg: '#FCE4EC', title: 'Code Civil Marocain', author: 'Éd. Officielle',      member: 'Nadia El Fassi',status: 'late' },
  { emoji: '📙', bg: '#E3F2FD', title: 'Deep Learning',       author: 'Ian Goodfellow',      member: 'Youssef M.',    status: 'active' },
];
const STATUS_STYLE = {
  active: { background: 'var(--teal3)', color: 'var(--teal)',  label: 'En cours' },
  ok:     { background: '#E8F5E9',      color: '#2E7D32',      label: 'Rendu'    },
  late:   { background: 'var(--rose3)', color: 'var(--rose)',  label: 'En retard'},
};

// ── Activity ───────────────────────────────────────────────────────────────
const ACTIVITY = [
  { color: 'var(--teal2)',  text: <><strong>Sara Alami</strong> a emprunté "Clean Code"</>,          time: 'Il y a 12 min' },
  { color: 'var(--gold)',   text: <>Nouveau livre ajouté : <strong>"Architecture Hexagonale"</strong></>, time: 'Il y a 1h' },
  { color: 'var(--rose2)',  text: <><strong>Nadia E.</strong> — retard de 3 jours signalé</>,        time: 'Il y a 2h' },
  { color: 'var(--purple)', text: <><strong>Karim B.</strong> a rendu "Le Petit Prince"</>,          time: 'Hier, 16h30' },
  { color: 'var(--teal2)',  text: <>Nouveau membre inscrit : <strong>Imane Tazi</strong></>,         time: 'Hier, 14h00' },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <div>
      <div style={s.pageHeader}>
        <h1 style={s.pageTitle}>Aperçu Général</h1>
        <p style={s.pageSubtitle}>Résumé de l'activité de votre bibliothèque pour aujourd'hui.</p>
      </div>

      {/* STATS */}
      <div style={s.statsGrid}>
        <StatCard label="Livres au total"   value="1 248" trend="+2.5% ce mois"     trendUp icon={BookOpen}       accent="var(--gold)" />
        <StatCard label="Membres actifs"    value="342"   trend="+8 cette semaine"  trendUp icon={Users}          accent="var(--teal2)" />
        <StatCard label="Prêts en cours"    value="87"    trend="4 en retard"              icon={ArrowLeftRight}  accent="var(--rose2)" />
        <StatCard label="Taux de croissance"value="+14%"  trend="vs mois dernier"   trendUp icon={BarChart2}      accent="var(--purple)" />
      </div>

      {/* CHARTS */}
      <div style={s.chartsRow}>
        <div style={s.chartCard}>
          <div style={s.chartHeader}>
            <span style={s.chartTitle}>Flux des Emprunts</span>
            <span style={s.chartBadge}>Hebdomadaire</span>
          </div>
          <BarChart />
        </div>
        <div style={s.chartCard}>
          <div style={s.chartHeader}>
            <span style={s.chartTitle}>Répartition du Stock</span>
          </div>
          <DonutChart />
        </div>
      </div>

      {/* RECENT */}
      <div style={s.recentRow}>
        <div style={s.sectionCard}>
          <div style={s.sectionHeader}>
            <span style={s.sectionTitle}>Prêts Récents</span>
            <a href="/admin/loans" style={s.seeAll}>Voir tout →</a>
          </div>
          {RECENT_LOANS.map((loan, i) => {
            const st = STATUS_STYLE[loan.status];
            return (
              <div key={i} style={{ ...s.loanItem, borderBottom: i < RECENT_LOANS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ ...s.loanCover, background: loan.bg }}>{loan.emoji}</div>
                <div style={s.loanInfo}>
                  <div style={s.loanTitle}>{loan.title}</div>
                  <div style={s.loanMeta}>{loan.author} · {loan.member}</div>
                </div>
                <span style={{ ...s.loanBadge, background: st.background, color: st.color }}>{st.label}</span>
              </div>
            );
          })}
        </div>

        <div style={s.sectionCard}>
          <div style={s.sectionHeader}>
            <span style={s.sectionTitle}>Activité récente</span>
          </div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ ...s.activityItem, borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ ...s.activityDot, background: a.color }} />
              <div style={{ flex: 1 }}>
                <div style={s.activityText}>{a.text}</div>
                <div style={s.activityTime}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  pageHeader: { marginBottom: 24 },
  pageTitle:  { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  pageSubtitle: { color: 'var(--text3)', fontSize: 13 },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 },
  statCard: {
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '18px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  statAccentBar: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
    background: 'var(--accent)',
  },
  statLabel: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: 10 },
  statValue: { fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 6 },
  statTrend: { fontSize: 11, display: 'flex', alignItems: 'center' },
  statIconBg: { position: 'absolute', right: 16, top: 16, opacity: 0.1, color: 'var(--text)' },

  chartsRow: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 24 },
  chartCard: { background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 20 },
  chartHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  chartTitle: { fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600 },
  chartBadge: { background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'var(--text2)' },

  barWrap: { display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 },
  barGroup: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: '4px 4px 0 0', minHeight: 4, transition: 'height 0.3s ease' },
  barLabel: { fontSize: 10, color: 'var(--text3)' },

  donutWrap: { display: 'flex', justifyContent: 'center', marginBottom: 14 },
  legendList: { display: 'flex', flexDirection: 'column', gap: 8 },
  legendItem: { display: 'flex', alignItems: 'center', fontSize: 12 },
  legendDot: { width: 8, height: 8, borderRadius: '50%', marginRight: 8, flexShrink: 0 },
  legendName: { flex: 1, color: 'var(--text2)' },
  legendPct: { fontWeight: 500 },

  recentRow: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 },
  sectionCard: { background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 20 },
  sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  sectionTitle: { fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600 },
  seeAll: { fontSize: 11, color: 'var(--teal2)', textDecoration: 'none' },

  loanItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0' },
  loanCover: { width: 28, height: 38, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 },
  loanInfo: { flex: 1 },
  loanTitle: { fontSize: 12, fontWeight: 500, marginBottom: 2 },
  loanMeta: { fontSize: 11, color: 'var(--text3)' },
  loanBadge: { fontSize: 10, padding: '3px 8px', borderRadius: 20, fontWeight: 500 },

  activityItem: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0' },
  activityDot: { width: 8, height: 8, borderRadius: '50%', marginTop: 4, flexShrink: 0 },
  activityText: { fontSize: 12, lineHeight: 1.5 },
  activityTime: { fontSize: 11, color: 'var(--text3)', marginTop: 2 },
};