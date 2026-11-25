export const STATS_URL: string = (import.meta.env.VITE_STATS_URL ?? '').replace(/\/$/, '');

export type StatEvent =
  | 'visit'
  | 'lang_en'
  | 'lang_es'
  | 'member_yes'
  | 'member_no'
  | 'view_screening'
  | 'view_cologuard'
  | 'view_colonoscopy'
  | 'click_phone'
  | 'download_flyer';

export function track(event: StatEvent) {
  if (!STATS_URL) return;
  try {
    fetch(`${STATS_URL}/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: event,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // analytics must never break the app
  }
}
