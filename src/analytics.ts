export type StatEvent =
  | 'lang_en'
  | 'lang_es'
  | 'member_yes'
  | 'member_no'
  | 'view_screening'
  | 'view_cologuard'
  | 'view_colonoscopy'
  | 'click_phone';

declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string; title?: string; event?: boolean }) => void };
  }
}

export function track(event: StatEvent) {
  try {
    window.goatcounter?.count({ path: event, title: event, event: true });
  } catch {
    // analytics must never break the app
  }
}
