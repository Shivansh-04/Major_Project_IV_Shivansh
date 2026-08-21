import { Link } from 'react-router-dom';

const matches = [
  { title: 'Product Designer', company: 'Northstar Labs', score: '94%', color: 'bg-lime-300' },
  { title: 'UX Researcher', company: 'Goodwork Studio', score: '88%', color: 'bg-sky-200' },
  { title: 'Design Systems Lead', company: 'Frame / Co.', score: '81%', color: 'bg-orange-200' },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f3ee] text-[#171816] selection:bg-lime-300">
      <nav className="relative z-10 flex w-full items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="text-xl font-black tracking-[-0.08em]">career<span className="text-[#a7d129]">/</span>ai</Link>
        <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b6d65] md:flex">
          <a href="#signal" className="transition hover:text-[#171816]">The signal</a>
          <a href="#method" className="transition hover:text-[#171816]">Method</a>
          <a href="#for-you" className="transition hover:text-[#171816]">For you</a>
        </div>
        <div className="flex items-center gap-5 text-sm font-semibold">
          <Link to="/login" className="hidden transition hover:text-[#7b951e] sm:block">Log in</Link>
          <Link to="/register" className="border border-[#171816] bg-[#171816] px-4 py-2 text-white transition hover:bg-[#a7d129] hover:text-[#171816]">Start here <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <section className="relative grid w-full items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pb-36 lg:pt-24">
        <div className="relative z-10">
          <p className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]"><span className="h-2 w-2 rounded-full bg-[#a7d129]" /> Your next move, clearer</p>
          <h1 className="max-w-xl text-[clamp(3.5rem,7vw,6.8rem)] font-black leading-[0.88] tracking-[-0.09em]">Find work that <span className="text-[#7b951e]">fits.</span></h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#6b6d65]">CareerAI reads between the lines of your resume and the roles you want, then shows you the move with the most potential.</p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link to="/register?role=candidate" className="bg-[#a7d129] px-6 py-3 text-sm font-bold transition hover:bg-[#171816] hover:text-white">See my matches <span aria-hidden="true">→</span></Link>
            <Link to="/register?role=company" className="text-sm font-bold underline decoration-[#a7d129] decoration-2 underline-offset-4 transition hover:text-[#7b951e]">I&apos;m hiring</Link>
          </div>
        </div>

        <div id="signal" className="relative min-h-[420px] lg:min-h-[520px]">
          <div className="absolute -right-20 top-4 h-72 w-72 rounded-full bg-[#dfe9ad] blur-3xl lg:h-96 lg:w-96" />
          <div className="relative mx-auto max-w-[560px] rotate-2 border border-[#171816] bg-[#20221d] p-3 shadow-[16px_18px_0_#a7d129] sm:p-5">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50"><span>Live match signal</span><span className="text-[#a7d129]">● online</span></div>
            <div className="py-7 sm:py-9">
              <div className="mb-7 flex items-end justify-between"><div><p className="mb-2 text-xs text-white/45">Profile read</p><h2 className="text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">Aarav&apos;s next best fit</h2></div><span className="text-5xl font-black tracking-[-0.08em] text-[#a7d129]">94</span></div>
              <div className="mb-8 h-1 bg-white/10"><div className="h-full w-[94%] bg-[#a7d129]" /></div>
              <div className="space-y-3">
                {matches.map((match) => <div key={match.title} className="flex items-center gap-3 border border-white/10 bg-white/[0.04] p-3"><span className={`h-2 w-2 shrink-0 ${match.color}`} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-white">{match.title}</p><p className="text-xs text-white/45">{match.company}</p></div><span className="text-sm font-bold text-[#a7d129]">{match.score}</span></div>)}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[0.14em] text-white/40"><span>Based on 42 signals</span><span>Updated now</span></div>
          </div>
          <span className="absolute -bottom-3 left-0 hidden border border-[#171816] bg-[#f5f3ee] px-4 py-3 text-xs font-bold shadow-[5px_5px_0_#171816] sm:block">Less scrolling. More direction. <span className="text-[#7b951e]">✦</span></span>
        </div>
      </section>

      <section id="method" className="border-y border-[#171816]/15 bg-[#e8e6df] px-6 py-20 lg:px-10">
        <div className="grid w-full gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div><p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">The method</p><h2 className="max-w-sm text-4xl font-black leading-[0.94] tracking-[-0.07em] sm:text-5xl">Not more jobs.<br />Better signals.</h2></div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[['01', 'Read deeply', 'Your resume becomes a living map of skills, experience, and momentum.'], ['02', 'Match honestly', 'Semantic matching shows the roles that make sense, not just the ones with familiar words.'], ['03', 'Move forward', 'See the gaps, learn what matters, and apply with a clearer point of view.']].map(([number, title, description]) => <article key={number} className="border-t border-[#171816]/30 pt-4"><p className="mb-10 text-xs font-bold text-[#7b951e]">{number}</p><h3 className="mb-3 text-lg font-bold tracking-[-0.03em]">{title}</h3><p className="text-sm leading-6 text-[#6b6d65]">{description}</p></article>)}
          </div>
        </div>
      </section>

      <section id="for-you" className="w-full px-6 py-24 lg:px-12 lg:py-32">
        <div className="flex flex-col justify-between gap-8 border-b border-[#171816] pb-8 sm:flex-row sm:items-end"><div><p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">One clear platform</p><h2 className="max-w-2xl text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">Your ambition, with a little more <span className="text-[#7b951e]">clarity.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#6b6d65]">For people finding their next chapter and teams building what comes next.</p></div>
        <div className="grid gap-0 md:grid-cols-2">
          <div className="border-b border-[#171816]/20 py-10 md:border-b-0 md:border-r md:pr-12"><p className="mb-12 text-3xl">↗</p><h3 className="mb-4 text-2xl font-bold tracking-[-0.05em]">For job seekers</h3><p className="mb-7 max-w-md text-sm leading-6 text-[#6b6d65]">Upload once. Get ranked opportunities, an honest match explanation, and a practical path toward the role you want.</p><Link to="/register?role=candidate" className="text-sm font-bold underline decoration-[#a7d129] decoration-2 underline-offset-4">Build my profile →</Link></div>
          <div className="py-10 md:pl-12"><p className="mb-12 text-3xl">✦</p><h3 className="mb-4 text-2xl font-bold tracking-[-0.05em]">For companies</h3><p className="mb-7 max-w-md text-sm leading-6 text-[#6b6d65]">Post the role. Let the signal surface the people who can do the work, then spend your time on the conversations that matter.</p><Link to="/register?role=company" className="text-sm font-bold underline decoration-[#a7d129] decoration-2 underline-offset-4">Find your next hire →</Link></div>
        </div>
      </section>

      <footer className="bg-[#171816] px-6 py-8 text-white lg:px-12"><div className="flex w-full flex-col justify-between gap-5 text-xs text-white/50 sm:flex-row sm:items-center"><Link to="/" className="text-lg font-black tracking-[-0.08em] text-white">career<span className="text-[#a7d129]">/</span>ai</Link><span>AI-powered career direction · 2026</span><Link to="/register" className="font-bold text-[#a7d129]">Start your signal ↗</Link></div></footer>
    </main>
  );
}