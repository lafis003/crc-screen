import React, { useEffect, useState } from 'react';
import { STATS_URL, StatEvent } from '../analytics';

type StatsData = { totals: Record<StatEvent, number>; days: { date: string; visits: number }[] };

const ROWS: { key: StatEvent; label: string }[] = [
  { key: 'visit', label: 'Visits' },
  { key: 'lang_en', label: 'Chose English' },
  { key: 'lang_es', label: 'Chose Español' },
  { key: 'member_yes', label: 'AltaMed members' },
  { key: 'member_no', label: 'Not members' },
  { key: 'view_screening', label: 'Opened "how to get screened"' },
  { key: 'view_cologuard', label: 'Opened Cologuard info' },
  { key: 'view_colonoscopy', label: 'Opened Colonoscopy info' },
  { key: 'click_phone', label: 'Tapped a phone number' },
  { key: 'download_flyer', label: 'Downloaded flyer' },
];

export function Stats() {
  const [data, setData] = useState<StatsData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!STATS_URL) {
      setError('Stats backend not connected yet (VITE_STATS_URL is not set).');
      return;
    }
    fetch(`${STATS_URL}/stats`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setData)
      .catch((e) => setError(`Could not load stats (${e.message}).`));
  }, []);

  const max = data ? Math.max(1, ...data.days.map((d) => d.visits)) : 1;

  return (
    <div className="min-h-svh w-full bg-warm-bg overflow-y-auto fixed inset-0">
      <div className="max-w-2xl mx-auto p-6 sm:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-warm-text mb-1">Screening Guide Stats</h1>
        <p className="text-warm-muted mb-8">Anonymous counts only. Nothing personal is recorded.</p>

        {error && <div className="bg-white border border-slate-200 rounded-2xl p-5 text-warm-muted">{error}</div>}
        {!data && !error && <p className="text-warm-muted">Loading…</p>}

        {data && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {ROWS.filter((r) => r.key === 'visit' || r.key === 'click_phone').map((r) => (
                <div key={r.key} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="text-4xl font-semibold text-brand">{data.totals[r.key]}</div>
                  <div className="text-sm text-warm-muted mt-1">{r.label}</div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-warm-text mb-3">Visits, last 14 days</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
              <div className="flex items-end gap-1.5 h-32">
                {data.days.map((d) => (
                  <div key={d.date} className="flex-1 flex flex-col justify-end h-full" title={`${d.date}: ${d.visits}`}>
                    <div className="bg-brand rounded-t" style={{ height: `${(d.visits / max) * 100}%`, minHeight: d.visits ? 2 : 0 }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-warm-muted mt-2">
                <span>{data.days[0].date}</span>
                <span>{data.days[data.days.length - 1].date}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-warm-text mb-3">All-time totals</h2>
            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-200">
              {ROWS.map((r) => (
                <div key={r.key} className="flex justify-between p-4">
                  <span className="text-warm-text">{r.label}</span>
                  <span className="font-semibold text-brand">{data.totals[r.key]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
