import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, ChevronDown, ArrowLeft, Home, Download, Phone, MapPin, ExternalLink, AlertTriangle, Check,
} from 'lucide-react';
import { content, Content, Language, Page } from './data/content';
import { DoctorIcon, TestTubeIcon, MailboxDnaIcon, ColonIcon } from './components/Icons';
import { PATIENT_PHONE, PATIENT_PHONE_URI } from './config';
import { track } from './analytics';
import { Stats } from './components/Stats';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const STAT_COLORS = ['bg-fit', 'bg-leaf', 'bg-scope'];

export default function App() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [page, setPage] = useState<Page>('language');
  const [direction, setDirection] = useState(1);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const isStats = hash === '#/crc-screen-stats';

  useEffect(() => {
    if (isStats || sessionStorage.getItem('visit-tracked')) return;
    sessionStorage.setItem('visit-tracked', '1');
    track('visit');
  }, [isStats]);

  const go = (next: Page, dir: number) => {
    setDirection(dir);
    setPage(next);
  };

  const handleHome = () => {
    setLanguage(null);
    setIsMember(null);
    go('language', -1);
  };

  if (isStats) return <Stats />;

  return (
    <div className="min-h-svh w-full bg-slate-200 flex justify-center overflow-hidden fixed inset-0">
      <div className="w-full max-w-md bg-warm-bg shadow-xl border-x border-slate-300 overflow-hidden flex flex-col relative h-svh">
        <AnimatePresence mode="wait" custom={direction}>
          {page === 'language' && (
            <LanguageSelection
              key="language"
              onSelect={(lang) => {
                track(lang === 'en' ? 'lang_en' : 'lang_es');
                setLanguage(lang);
                go('member', 1);
              }}
            />
          )}
          {page === 'member' && language && (
            <MemberQuestion
              key="member"
              t={content[language]}
              direction={direction}
              onBack={() => go('language', -1)}
              onHome={handleHome}
              onSelect={(member) => {
                track(member ? 'member_yes' : 'member_no');
                setIsMember(member);
                go('info', 1);
              }}
            />
          )}
          {page === 'info' && language && isMember !== null && (
            <InfoPage
              key="info"
              t={content[language]}
              direction={direction}
              onBack={() => go('member', -1)}
              onHome={handleHome}
              onNext={() => {
                track('view_screening');
                go('screening', 1);
              }}
            />
          )}
          {page === 'screening' && language && isMember !== null && (
            <ScreeningPage
              key="screening"
              t={content[language]}
              isMember={isMember}
              direction={direction}
              onBack={() => go('info', -1)}
              onHome={handleHome}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Screen({ direction, children }: { direction: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -20 }}
      className="flex-1 flex flex-col bg-warm-bg h-full min-h-0"
    >
      {children}
    </motion.div>
  );
}

function TopBar({ t, onBack, onHome }: { t: Content; onBack: () => void; onHome: () => void }) {
  return (
    <header className="px-3 py-2 flex items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md z-20 shrink-0">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-brand font-semibold px-3 py-2.5 rounded-xl hover:bg-brand/5 active:bg-brand/10 transition-colors"
        aria-label={t.back}
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg">{t.back}</span>
      </button>
      <button
        onClick={onHome}
        className="flex items-center gap-2 text-warm-muted px-3 py-2.5 rounded-xl hover:bg-brand/5 active:bg-brand/10 hover:text-brand transition-colors"
        aria-label={t.home}
      >
        <Home className="w-6 h-6" />
        <span className="text-base">{t.home}</span>
      </button>
    </header>
  );
}

function ScrollArea({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, []);
  return (
    <div ref={ref} className="flex-1 overflow-y-auto min-h-0">
      {children}
    </div>
  );
}

function CallButton({ label }: { label: string }) {
  return (
    <a
      href={PATIENT_PHONE_URI}
      onClick={() => track('click_phone')}
      className="w-full py-4 px-6 bg-brand text-white rounded-xl shadow-sm hover:bg-brand-light active:bg-brand-dark transition-colors flex items-center justify-center gap-4"
    >
      <Phone className="w-7 h-7 shrink-0" />
      <span className="text-left leading-tight">
        <span className="block text-2xl font-semibold tracking-tight">{PATIENT_PHONE}</span>
        <span className="block text-sm text-white/85">{label}</span>
      </span>
    </a>
  );
}

function LanguageSelection({ onSelect }: { onSelect: (lang: Language) => void }) {
  const btn =
    'w-full py-5 px-8 bg-white text-brand border border-brand/40 rounded-xl text-xl font-semibold shadow-sm hover:bg-brand/5 active:bg-brand active:text-white transition-colors flex items-center justify-between group';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-28 h-28 bg-brand/10 rounded-full flex items-center justify-center mb-10">
        <DoctorIcon className="w-14 h-14 text-brand" />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-warm-text mb-4">
        Welcome<br />
        <span className="text-3xl text-warm-muted font-medium mt-2 block">Bienvenido</span>
      </h1>
      <p className="text-xl text-warm-muted mb-12 leading-relaxed">
        Please select your preferred language to continue.<br />
        <span className="text-lg mt-2 block">Por favor, seleccione su idioma preferido para continuar.</span>
      </p>
      <div className="w-full space-y-5">
        <button onClick={() => onSelect('en')} className={btn} aria-label="Select English">
          <span>English</span>
          <ChevronRight className="w-8 h-8 group-active:text-white" />
        </button>
        <button onClick={() => onSelect('es')} className={btn} aria-label="Seleccionar Español">
          <span>Español</span>
          <ChevronRight className="w-8 h-8 group-active:text-white" />
        </button>
      </div>
    </motion.div>
  );
}

function MemberQuestion({
  t, direction, onBack, onHome, onSelect,
}: { t: Content; direction: number; onBack: () => void; onHome: () => void; onSelect: (member: boolean) => void }) {
  return (
    <Screen direction={direction}>
      <TopBar t={t} onBack={onBack} onHome={onHome} />
      <div className="flex-1 flex flex-col justify-center p-8 text-center">
        <div className="mx-auto w-24 h-24 bg-leaf/15 rounded-2xl flex items-center justify-center mb-8">
          <DoctorIcon className="w-12 h-12 text-leaf" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-warm-text mb-3">{t.member.title}</h1>
        <p className="text-xl text-warm-muted mb-10">{t.member.subtitle}</p>
        <div className="space-y-4">
          <button
            onClick={() => onSelect(true)}
            className="w-full py-5 px-6 bg-brand text-white rounded-xl text-xl font-semibold shadow-sm hover:bg-brand-light active:bg-brand-dark transition-colors flex items-center justify-between"
          >
            <span>{t.member.yes}</span>
            <ChevronRight className="w-7 h-7" />
          </button>
          <button
            onClick={() => onSelect(false)}
            className="w-full py-5 px-6 bg-white text-brand border border-brand/40 rounded-xl text-xl font-semibold shadow-sm hover:bg-brand/5 active:bg-brand/10 transition-colors flex items-center justify-between"
          >
            <span>{t.member.no}</span>
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      </div>
    </Screen>
  );
}

function InfoPage({
  t, direction, onBack, onHome, onNext,
}: { t: Content; direction: number; onBack: () => void; onHome: () => void; onNext: () => void }) {
  const i = t.info;
  return (
    <Screen direction={direction}>
      <TopBar t={t} onBack={onBack} onHome={onHome} />
      <ScrollArea>
        <div className="bg-brand text-white px-6 pt-8 pb-10 rounded-b-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-lg px-3 py-1.5 text-sm font-medium mb-5">
            <ColonIcon className="w-5 h-5 text-white" />
            {i.badge}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-3">{i.title}</h1>
          <p className="text-lg text-white/90 leading-relaxed">{i.subtitle}</p>
        </div>

        <div className="p-5 space-y-4 -mt-5">
          {i.stats.map((s, idx) => (
            <div key={s.big} className={`${STAT_COLORS[idx]} text-white rounded-2xl p-5 shadow-sm`}>
              <div className="text-4xl font-semibold tracking-tight mb-1">{s.big}</div>
              <p className="text-lg leading-snug text-white/95">{s.text}</p>
            </div>
          ))}

          <div className="bg-sun/20 border border-sun/60 rounded-2xl p-5 flex gap-4">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-sun flex items-center justify-center text-warm-text font-semibold text-lg">45</div>
            <div>
              <h2 className="text-xl font-semibold text-warm-text mb-1">{i.ageChange.title}</h2>
              <p className="text-lg text-warm-text leading-snug">{i.ageChange.text}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="text-2xl font-semibold text-fit mb-2">{i.whatIsTitle}</h2>
            <p className="text-lg text-warm-text leading-relaxed">{i.whatIs}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="text-2xl font-semibold text-cologuard mb-2">{i.symptomsTitle}</h2>
            <p className="text-lg text-warm-muted mb-3">{i.symptomsIntro}</p>
            <ul className="flex flex-wrap gap-2">
              {i.symptoms.map((s) => (
                <li key={s} className="bg-cologuard/10 text-cologuard font-medium rounded-lg px-3 py-2 text-base">{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="text-2xl font-semibold text-scope mb-2">{i.familyTitle}</h2>
            <p className="text-lg text-warm-text leading-relaxed">{i.familyText}</p>
          </div>
        </div>
        <div className="h-4" />
      </ScrollArea>

      <div className="p-4 bg-white/95 border-t border-slate-200 shrink-0">
        <button
          onClick={onNext}
          className="w-full py-4 px-6 bg-brand text-white rounded-xl text-xl font-semibold shadow-sm hover:bg-brand-light active:bg-brand-dark transition-colors flex items-center justify-between gap-3 text-left"
        >
          <span className="leading-snug">{i.cta}</span>
          <ChevronRight className="w-7 h-7 shrink-0" />
        </button>
      </div>
    </Screen>
  );
}

function SectionCard({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <section className={`bg-white border border-slate-200 border-t-4 ${accent} rounded-2xl p-5 shadow-sm`}>{children}</section>
  );
}

function FrequencyPill({ text, className }: { text: string; className: string }) {
  return <div className={`inline-block font-semibold px-4 py-2 rounded-lg text-base mb-4 ${className}`}>{text}</div>;
}

function Accordion({
  title, badge, icon, color, tint, open, onToggle, tapText, children,
}: {
  title: string; badge?: string; icon: React.ReactNode; color: string; tint: string;
  open: boolean; onToggle: () => void; tapText: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-4 p-5 text-left">
        <div className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${tint}`}>{icon}</div>
        <div className="flex-1">
          <h3 className={`text-2xl font-semibold ${color}`}>{title}</h3>
          {badge && <p className="text-sm font-medium text-warm-muted">{badge}</p>}
          {!open && <p className="text-base text-warm-muted">{tapText}</p>}
        </div>
        <ChevronDown className={`w-7 h-7 ${color} transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function LabeledList({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div className="mb-4">
      <h4 className={`text-lg font-semibold mb-2 ${color}`}>{label}</h4>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-lg text-warm-text leading-snug">
            <Check className={`w-5 h-5 mt-1 shrink-0 ${color}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScreeningPage({
  t, isMember, direction, onBack, onHome,
}: { t: Content; isMember: boolean; direction: number; onBack: () => void; onHome: () => void }) {
  const s = t.screening;
  const [open, setOpen] = useState<'cologuard' | 'colonoscopy' | null>(null);

  const toggle = (key: 'cologuard' | 'colonoscopy') => {
    if (open !== key) track(key === 'cologuard' ? 'view_cologuard' : 'view_colonoscopy');
    setOpen(open === key ? null : key);
  };

  return (
    <Screen direction={direction}>
      <TopBar t={t} onBack={onBack} onHome={onHome} />
      <ScrollArea>
        <div className="p-5 space-y-5 pb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-warm-text pt-2">{s.title}</h1>

          <SectionCard accent="border-t-fit">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-xl bg-fit/10 flex items-center justify-center shrink-0">
                <TestTubeIcon className="w-9 h-9 text-fit" />
              </div>
              <h2 className="text-3xl font-semibold text-fit">{s.fit.title}</h2>
            </div>
            <p className="text-lg text-warm-text leading-relaxed mb-4">{s.fit.what}</p>
            <FrequencyPill text={s.fit.frequency} className="bg-fit/10 text-fit" />
            <ol className="space-y-4 mb-4">
              {s.fit.steps.map((step, idx) => (
                <li key={step} className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 bg-fit text-white rounded-full flex items-center justify-center font-semibold mt-0.5">{idx + 1}</div>
                  <p className="text-lg text-warm-text leading-snug pt-1">{step}</p>
                </li>
              ))}
            </ol>
            <p className="text-base text-warm-muted">{s.fit.consider}</p>
          </SectionCard>

          {isMember ? (
            <SectionCard accent="border-t-leaf">
              <h2 className="text-2xl font-semibold text-leaf mb-2">{s.memberKit.title}</h2>
              <p className="text-lg text-warm-text leading-relaxed mb-4">{s.memberKit.text}</p>
              <CallButton label={s.memberKit.call} />
            </SectionCard>
          ) : (
            <>
              <SectionCard accent="border-t-leaf">
                <h2 className="text-2xl font-semibold text-leaf mb-3">{s.nonMember.joinTitle}</h2>
                <h3 className="text-xl font-semibold text-warm-text mb-2">{s.nonMember.aboutTitle}</h3>
                <p className="text-lg text-warm-text leading-relaxed mb-4">{s.nonMember.about}</p>
                <p className="text-lg text-warm-text mb-3">{s.nonMember.joinText}</p>
                <CallButton label={s.nonMember.call} />
              </SectionCard>

              <SectionCard accent="border-t-sun">
                <h2 className="text-2xl font-semibold text-warm-text mb-2">{s.nonMember.otherTitle}</h2>
                <p className="text-base text-warm-muted leading-snug mb-4">{s.nonMember.otherIntro}</p>
                <ul className="space-y-4">
                  {s.nonMember.clinics.map((c) => (
                    <li key={c.name} className="bg-warm-bg border border-slate-200 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-warm-text mb-1">{c.name}</h3>
                      <p className="flex gap-2 text-base text-warm-muted leading-snug mb-2">
                        <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{c.detail}</span>
                      </p>
                      {'phone' in c && c.phone && (
                        <a href={`tel:${c.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-lg font-semibold text-brand">
                          <Phone className="w-5 h-5" />
                          {c.phone}
                        </a>
                      )}
                      {'url' in c && c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-semibold text-brand">
                          <ExternalLink className="w-5 h-5" />
                          hurttclinic.org
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </>
          )}

          <h2 className="text-2xl font-semibold text-warm-text pt-2">{s.otherOptionsTitle}</h2>

          <Accordion
            title={s.cologuard.title}
            icon={<MailboxDnaIcon className="w-9 h-9 text-cologuard" />}
            color="text-cologuard"
            tint="bg-cologuard/10"
            open={open === 'cologuard'}
            onToggle={() => toggle('cologuard')}
            tapText={s.tapToOpen}
          >
            <p className="text-lg text-warm-text leading-relaxed mb-4">{s.cologuard.what}</p>
            <FrequencyPill text={s.cologuard.frequency} className="bg-cologuard/10 text-cologuard" />
            <LabeledList label={s.howLabel} items={s.cologuard.how} color="text-cologuard" />
            <p className="text-base text-warm-muted mb-4">{s.cologuard.consider}</p>
            <a
              href={asset(s.cologuard.guidePath)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-semibold text-cologuard"
            >
              <ExternalLink className="w-5 h-5" />
              {s.cologuard.guide}
            </a>
          </Accordion>

          <Accordion
            title={s.colonoscopy.title}
            badge={s.colonoscopy.badge}
            icon={<ColonIcon className="w-9 h-9 text-scope" />}
            color="text-scope"
            tint="bg-scope/10"
            open={open === 'colonoscopy'}
            onToggle={() => toggle('colonoscopy')}
            tapText={s.tapToOpen}
          >
            <p className="text-lg text-warm-text leading-relaxed mb-4">{s.colonoscopy.what}</p>
            <FrequencyPill text={s.colonoscopy.frequency} className="bg-scope/10 text-scope" />
            <LabeledList label={s.howLabel} items={s.colonoscopy.how} color="text-scope" />
            <LabeledList label={s.considerLabel} items={s.colonoscopy.consider} color="text-scope" />
          </Accordion>

          {!isMember && (
            <div className="bg-brand text-white rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <DoctorIcon className="w-9 h-9 text-white" />
                <h2 className="text-2xl font-semibold">{s.nonMember.signupTitle}</h2>
              </div>
              <p className="text-lg text-white/90 leading-relaxed mb-4">{s.nonMember.signupText}</p>
              <a
                href={PATIENT_PHONE_URI}
                onClick={() => track('click_phone')}
                className="w-full py-4 px-6 bg-white text-brand rounded-xl flex items-center justify-center gap-3 text-xl font-semibold"
              >
                <Phone className="w-6 h-6" />
                {s.nonMember.signupCall}: {PATIENT_PHONE}
              </a>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h2 className="text-xl font-semibold text-warm-text mb-1">{s.flyerTitle}</h2>
            <p className="text-base text-warm-muted mb-4">{s.flyerText}</p>
            <a
              href={asset(s.flyerPath)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('download_flyer')}
              className="w-full py-3.5 px-6 bg-brand/10 text-brand rounded-xl text-lg font-semibold hover:bg-brand/20 transition-colors flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              {s.flyerButton}
            </a>
          </div>

          <p className="flex gap-3 text-sm text-warm-muted leading-snug px-1">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{s.disclaimer}</span>
          </p>
        </div>
      </ScrollArea>
    </Screen>
  );
}
