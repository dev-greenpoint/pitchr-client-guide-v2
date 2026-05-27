import React, { useMemo, useState } from 'react';

const assetPath = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
const dashboardBg = assetPath('dashboard-bg.png');
const faqBg = assetPath('faq-bg.png');
const coverageBg = assetPath('coverage-bg.png');
const campaignBg = assetPath('campaign-bg.png');
const briefitBg = assetPath('briefit-bg.jpg');
const homeBg = assetPath('home-bg.png');

const tabs = ['Home', 'Dashboard', 'Brief It', 'Campaign', 'Coverage', 'FAQs'];

const faqItems = [
  {
    q: 'How long does it take to get coverage?',
    a: 'Timelines vary by campaign and publication, but most clients start seeing coverage within 2-4 weeks of brief approval.',
  },
  {
    q: 'Can I request changes to the press release?',
    a: 'Yes - use the message tab in the Review stage to leave edit suggestions and our team will update accordingly.',
  },
  {
    q: "What if I don't like any of the draft angles?",
    a: "Let us know in the message tab and we'll go back to the drawing board.",
  },
  {
    q: 'How do I know when coverage goes live?',
    a: "You'll receive a notification in the platform and an email each time a new piece of coverage is added to your dashboard.",
  },
  {
    q: 'What does Total Reach mean?',
    a: "It's an estimate of how many people could have seen the article, based on the publication's media kit figures.",
  },
];

function Eyebrow({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-1 rounded-full border border-[#A6FF00]/40 bg-[#A6FF00]/10 px-2.5 py-1 text-[10px] font-bold tracking-tight text-[#A6FF00]">
      <span className="h-1 w-1 rounded-full bg-[#A6FF00]" />
      {children}
    </div>
  );
}

function Heading({ children }) {
  return (
    <h2 className="text-4xl font-black leading-[0.92] tracking-[-0.065em] text-white md:text-5xl">
      {children}
    </h2>
  );
}

function Intro({ children }) {
  return <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/55">{children}</p>;
}

function Bullet({ title, children }) {
  return (
    <li className="flex gap-3 text-sm font-medium leading-6 text-white/70">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
      <span>
        <strong className="block font-extrabold text-white">{title}</strong>
        <span className="mt-1 block text-xs font-medium leading-5 text-white/50">{children}</span>
      </span>
    </li>
  );
}

function Icon({ children }) {
  return (
    <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#A6FF00] text-sm font-black text-black">
      {children}
    </span>
  );
}

function Welcome() {
  const cards = [
    { title: 'Brief It', body: 'Submit your story and let our team get to work', icon: '1' },
    { title: 'Campaign', body: 'Track your press release from brief to approval', icon: '2' },
    { title: 'Coverage', body: 'Watch your media coverage land in real time', icon: '3' },
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={homeBg} alt="" className="absolute inset-x-0 bottom-0 h-auto w-full translate-y-[72px] scale-x-[1] scale-y-[0.75] origin-bottom object-contain object-bottom opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/24 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/34 via-[#050505]/8 to-transparent" />
      <div className="relative z-10 p-8 pb-6 md:p-10 md:pb-7">
        <Eyebrow>Getting started</Eyebrow>
        <Heading>Welcome to Pitchr</Heading>
        <Intro>You're all signed up. Log in using the credentials provided by our team and you're in.</Intro>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="rounded-[1.35rem] border border-[#A6FF00]/20 bg-white/[0.035] p-5 text-white transition hover:border-[#A6FF00]/70">
              <Icon>{card.icon}</Icon>
              <strong className="block text-base font-black tracking-[-0.03em]">{card.title}</strong>
              <span className="mt-2 block text-xs font-medium leading-5 text-white/50">{card.body}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={dashboardBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(166,255,0,0.16),transparent_35%)]" />
      <div className="relative z-10 max-w-xl p-8 md:p-10">
        <Eyebrow>Inside Pitchr</Eyebrow>
        <Heading>Your Dashboard</Heading>
        <Intro>Everything you need is right in front of you. Here's what you'll find inside Pitchr.</Intro>
        <ul className="mt-8 space-y-4">
          <Bullet title="Dashboard">A quick snapshot of all active campaigns and your most recent coverage at a glance.</Bullet>
          <Bullet title="My Business">Your organisation's profile, auto-populated from the web. Used to write press releases that sound like you.</Bullet>
          <Bullet title="Coverage">Every article secured across every campaign, updated in real time as coverage lands.</Bullet>
        </ul>
      </div>
    </div>
  );
}

function BriefIt() {
  const steps = [
    ['+ Submit a Brief', 'All the info needed to kick off your first campaign.'],
    ['Fill in the form', 'Be as detailed as you can - the more context, the better the result.'],
    ['Submit your brief', 'Hit submit and leave the rest to us.'],
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={briefitBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(166,255,0,0.16),transparent_35%)]" />
      <div className="relative z-10 p-8 md:p-10">
        <Eyebrow>Brief it</Eyebrow>
        <Heading>
          PR in minutes
          <br />
          not weeks
        </Heading>
        <Intro>This is where the magic happens. Give us everything we need to craft your perfect pitch.</Intro>
        <ol className="mt-8 space-y-5">
          {steps.map(([title, body], index) => (
            <li key={title} className="flex gap-4">
              <span className="text-3xl font-black leading-none tracking-[-0.05em] text-[#A6FF00]">{index + 1}</span>
              <div>
                <strong className="block text-sm font-black text-white">{title}</strong>
                <span className="mt-1 block text-xs font-medium leading-5 text-white/50">{body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Campaign() {
  const journey = [
    ['Briefed', 'Our team reads through your brief in full to understand your goals and story.'],
    ['Writing', "Up to 3 press releases, each with a different angle, matched to targeted publications - you'll receive a media kit to review."],
    ['Review', 'Share internally, choose your angle, leave edits in the message tab, and give final sign-off.'],
    ['Approved', 'Green light given - our team starts pitching to targeted publications and journalists immediately.'],
    ['Pitching', "Sit back - we'll notify you every time a piece of coverage is logged."],
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={campaignBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(166,255,0,0.16),transparent_35%)]" />
      <div className="relative z-10 p-8 md:p-10">
        <Eyebrow>The process</Eyebrow>
        <Heading>Your campaign journey</Heading>
        <Intro>From brief to coverage - here's exactly what happens at each stage.</Intro>
        <div className="mt-8">
          {journey.map(([title, body], index) => (
            <div key={title} className="flex gap-4">
              <div className="flex w-5 shrink-0 flex-col items-center">
                <span className={`mt-1.5 h-2.5 w-2.5 rounded-full border border-[#A6FF00] ${index === journey.length - 1 ? 'bg-transparent opacity-40' : 'bg-[#A6FF00]'}`} />
                {index !== journey.length - 1 ? <span className="my-1 min-h-5 w-px flex-1 bg-[#A6FF00]/20" /> : null}
              </div>
              <div className="pb-5">
                <strong className="block text-sm font-black text-white">{title}</strong>
                <span className="mt-1 block text-xs font-medium leading-5 text-white/50">{body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Coverage() {
  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={coverageBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-100 [mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,black_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(166,255,0,0.16),transparent_35%)]" />
      <div className="relative z-10 p-8 md:p-10">
        <Eyebrow>Results</Eyebrow>
        <Heading>Your coverage</Heading>
        <Intro>Your live dashboard updates the moment an article goes live.</Intro>
        <ul className="mt-8 space-y-4">
          <Bullet title="Placements">Total publications that have covered your story.</Bullet>
          <Bullet title="Total reach">Estimated audience based on media kit data.</Bullet>
          <Bullet title="View and share">Direct link to each published article.</Bullet>
          <Bullet title="Sentiment">How the story was framed: positive, neutral, or mixed.</Bullet>
          <Bullet title="Coverage timeline">Chronological view, filterable by date or campaign.</Bullet>
          <Bullet title="Key message hit rates">Track which messages journalists are picking up.</Bullet>
        </ul>
      </div>
    </div>
  );
}

function FAQs() {
  const [open, setOpen] = useState(0);

  return (
    <div className="h-full overflow-hidden bg-[#050505]">
      <div className="relative overflow-hidden border-b border-[#A6FF00]/15 bg-[#050505]">
        <img
          src={faqBg}
          alt="Pitchr FAQ visual"
          className="block h-auto w-full"
        />
      </div>

      <div className="p-8 md:p-10">
        <div className="overflow-hidden rounded-[1.35rem] border border-[#A6FF00]/20 bg-[#050505]/75 backdrop-blur-sm">
          {faqItems.map((item, index) => {
            const isOpen = open === index;

            return (
              <div key={item.q} className="border-b border-[#A6FF00]/15 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-bold text-white/80 transition hover:bg-[#A6FF00]/5 hover:text-white"
                >
                  <span>{item.q}</span>
                  <span className={`shrink-0 text-xs transition ${isOpen ? 'rotate-180 text-[#A6FF00]' : 'text-white/35'}`}>
                    v
                  </span>
                </button>

                {isOpen && (
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm font-medium leading-6 text-white/55">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Content({ index }) {
  const pages = useMemo(() => [Welcome, Dashboard, BriefIt, Campaign, Coverage, FAQs], []);
  const Page = pages[index];
  return <Page />;
}

export default function PitchrClientGuide() {
  const [cur, setCur] = useState(0);
  const isFirst = cur === 0;
  const isLast = cur === tabs.length - 1;

  const goTo = (index) => {
    setCur(Math.max(0, Math.min(tabs.length - 1, index)));
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-10 text-white antialiased md:py-12">
      <div className="mx-auto w-full max-w-[860px] overflow-hidden rounded-[34px] border border-[#A6FF00]/20 bg-[#080808] shadow-2xl shadow-black/60">
        <section className="relative overflow-hidden border-b border-[#A6FF00]/15 px-8 py-10 md:px-12 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(166,255,0,0.18),transparent_32%),radial-gradient(circle_at_10%_80%,rgba(166,255,0,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
          <div className="relative">
            <div className="absolute right-0 top-0 text-3xl font-black tracking-[-0.06em] text-white">
              Pitchr<span className="text-[#A6FF00]">.</span>
            </div>
            <div className="mb-6 inline-flex items-center gap-1 rounded-full border border-[#A6FF00]/40 bg-[#A6FF00]/10 px-2.5 py-1 text-[10px] font-semibold text-[#A6FF00]">
              <span className="h-1 w-1 rounded-full bg-[#A6FF00]" />
              AI &amp; Human-Powered PR platform
            </div>
            <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white md:text-7xl">
              Brief It. Approve It.
              <br />
              <span className="text-[#A6FF00]">Covered.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-7 text-white/60">
              Everything you need to get started, submit your first brief, and watch your coverage grow in real time.
            </p>
          </div>
        </section>

        <nav className="flex overflow-x-auto border-b border-[#A6FF00]/15 bg-[#050505] px-5 md:px-8" aria-label="Guide navigation">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => goTo(index)}
              className={`whitespace-nowrap border-b-2 px-4 py-4 text-xs font-bold tracking-tight transition ${cur === index ? 'border-[#A6FF00] text-[#A6FF00]' : 'border-transparent text-white/35 hover:text-white/80'}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <section className="h-[620px] overflow-hidden">
          <div key={cur} className="h-full animate-[fadeIn_0.24s_ease]">
            <Content index={cur} />
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-[#A6FF00]/15 bg-[#050505] px-6 py-4 md:px-10">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => goTo(cur - 1)}
            className="h-10 rounded-full border border-[#A6FF00]/25 bg-transparent px-5 text-xs font-bold text-white/55 transition hover:bg-[#A6FF00]/10 hover:text-white disabled:opacity-20"
          >
            Back
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A6FF00]" />
            {cur + 1} of {tabs.length}
          </div>
          <button
            type="button"
            onClick={() => goTo(cur + 1)}
            className="h-10 rounded-full bg-[#A6FF00] px-5 text-xs font-black text-black transition hover:bg-[#A6FF00]/85"
          >
            {isLast ? 'Done' : 'Next'}
          </button>
        </footer>
      </div>
    </main>
  );
}
