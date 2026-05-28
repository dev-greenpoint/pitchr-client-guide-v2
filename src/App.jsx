import React, { useMemo, useState } from 'react';

const assetPath = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
const dashboardBg = assetPath('dashboard-bg.png');
const coverageBg = assetPath('coverage-bg.png');
const campaignBg = assetPath('campaign-bg.png');

const tabs = ['Home', 'Dashboard', 'My Business', 'Brief It', 'Campaign', 'Coverage', 'FAQs'];

const briefSections = [
  {
    title: 'Business overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="12" height="11" rx="1" />
        <path d="M5 14V9h6v5" />
        <path d="M5.5 6h1M9.5 6h1M5.5 3V2M10.5 3V2" />
      </svg>
    ),
    description: 'What the business does, how it\'s structured, who owns it, what products or services it sells, how it goes to market, and what commercial moment it\'s currently in. Includes industry classification, website, parent company if relevant, and any regulatory status that affects how the brand can be marketed or discussed in media.',
  },
  {
    title: 'Market & competitors',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13h12" />
        <path d="M4 13V9M8 13V5M12 13V3" />
      </svg>
    ),
    description: 'Market size, growth trends and the competitive landscape - including who the direct competitors are, how they\'re positioned, and where the client has genuine room to differentiate. Also surfaces major industry events, regulatory shifts, or category disruptions that are currently shaping the environment the brand is operating in.',
  },
  {
    title: 'Team & capabilities',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="5" r="2" />
        <path d="M2 14c0-2.5 1.8-4 4-4s4 1.5 4 4" />
        <circle cx="11.5" cy="5" r="1.5" />
        <path d="M13.5 14c0-2-1-3-2.5-3" />
      </svg>
    ),
    description: 'Who the spokespeople are, tiered by media suitability (brand ambassadors, corporate voices, and recommended third-party experts). What the team is built to deliver, where the capability gaps are, and which partnerships or external voices could strengthen the brand\'s PR position.',
  },
  {
    title: 'Operations',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="2" />
        <path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.75 3.75l1.06 1.06M11.19 11.19l1.06 1.06M3.75 12.25l1.06-1.06M11.19 4.81l1.06-1.06" />
      </svg>
    ),
    description: 'How the business is structured and run day-to-day. Covers go-to-market processes, seasonal campaign cadences, retail or distribution partnerships, and the regulatory or compliance load that shapes what PR can and can\'t say - including any active legal matters the team needs to work around.',
  },
  {
    title: 'Finance',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 4.5v7M6.5 6.5h2.25a1.25 1.25 0 0 1 0 2.5h-1.5a1.25 1.25 0 0 0 0 2.5H9.5" />
      </svg>
    ),
    description: 'Revenue model, funding structure, pricing position in the market, and any financially material issues the PR team needs to understand before writing a pitch. Includes litigation exposure, past recalls, and suggested metrics for tracking PR performance against commercial outcomes.',
  },
  {
    title: 'Brand voice',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6.5L3 14v-3H3a1 1 0 0 1-1-1V3z" />
        <path d="M5 6h6M5 8.5h4" />
      </svg>
    ),
    description: 'Tone, style and the list of what the brand is and isn\'t. Key messages, target audience (demographics and psychographics), sensitive topics that require careful handling, and a suggested boilerplate ready for media use. Also flags which competitor territories to cede and which to own.',
  },
  {
    title: 'Brand history',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <path d="M8 5v3.5l2.5 1.5" />
      </svg>
    ),
    description: 'Founding story, ownership lineage, key Australian milestones, and - critically - any past crises or controversies the PR team must be aware of before engaging media. This section surfaces the landmines before you step on them, including past recalls, regulatory actions, and earned media history.',
  },
  {
    title: 'Goals & PR strategy',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" />
        <circle cx="8" cy="8" r="3" />
        <circle cx="8" cy="8" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
    description: 'The client\'s stated PR objectives, reality-checked against current market conditions. Includes recommended Tier 1 angles (lowest risk, highest impact), target publications tiered by reach and risk, campaign goals for the current cycle, topics and outlets to avoid, and success metrics to track across the campaign window.',
  },
];

const faqItems = [
  {
    q: 'How long does it take to get coverage?',
    a: 'Timelines vary by campaign and publication, but most clients start seeing coverage within 2-4 weeks of brief approval.',
  },
  {
    q: 'Can I request changes to the press release?',
    a: 'Yes — open your campaign and use the Messages thread to leave edit suggestions. Our team will pick them up and update the release accordingly.',
  },
  {
    q: "What if I don't like any of the draft angles?",
    a: "Let us know via the Messages thread inside your campaign and we'll go back to the drawing board with fresh angles.",
  },
  {
    q: 'How do I know when coverage goes live?',
    a: "You'll receive a notification in the platform and an email each time a new piece of coverage is added to your dashboard.",
  },
  {
    q: 'What does Total Reach mean?',
    a: "It's an estimate of how many people could have seen the article, based on the publication's media kit figures.",
  },
  {
    q: 'How do I reset my password?',
    a: 'Head to the login screen and hit Forgot Password. You\'ll receive a reset link to your registered email address within a few minutes.',
  },
  {
    q: 'How do I enable notifications?',
    a: 'Go to your account settings and toggle on email and in-platform notifications. We recommend keeping both on so you never miss a coverage update.',
  },
  {
    q: 'Can I run more than one campaign at a time?',
    a: 'Yes. Each campaign runs independently - you can submit a new brief at any time and track all active campaigns from your Dashboard.',
  },
  {
    q: 'How do I add a team member to my account?',
    a: 'Reach out to your Pitchr contact and we\'ll add them directly. Multi-user access is managed on our end for now.',
  },
  {
    q: 'What types of media do you pitch to?',
    a: 'We pitch to a curated list of journalists and publications matched to your story - from national news and trade press to digital and lifestyle outlets.',
  },
  {
    q: 'Can I pause or cancel a campaign?',
    a: "Yes. Reach out via the Messages thread inside your campaign and we'll put things on hold or close it out, depending on where things are at.",
  },
  {
    q: 'How many press release drafts will I receive?',
    a: 'You\'ll receive up to 3 press release drafts, each written with a different angle and matched to targeted publications for you to review.',
  },
  {
    q: 'How do I contact the Pitchr team?',
    a: 'Open your active campaign and use the Messages thread to get in touch directly. All communication is kept within the platform and tied to the relevant campaign so nothing gets lost.',
  },
  {
    q: 'Can I leave feedback on my press release drafts?',
    a: 'Yes — use the Messages thread inside your Campaign to leave notes, request changes, or flag anything you\'d like adjusted. Your team will pick it up and respond directly there.',
  },
];

function Eyebrow({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-1 rounded-full border border-[#A6FF00]/40 bg-[#A6FF00]/10 px-2.5 py-1 text-[10px] font-bold tracking-tight text-[#A6FF00]">
      {children}.
    </div>
  );
}

function Heading({ children }) {
  return (
    <h2 className="text-3xl font-black leading-[0.92] tracking-[-0.065em] text-white md:text-4xl">
      {children}
    </h2>
  );
}

function Intro({ children }) {
  return <p className="mt-2 max-w-md text-sm font-medium leading-7 text-white/70">{children}</p>;
}

function Bullet({ title, children }) {
  return (
    <li className="flex gap-3 text-sm font-medium leading-6 text-white/70">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
      <span>
        <strong className="block font-extrabold text-white">{title}</strong>
        <span className="mt-1 block text-xs font-medium leading-5 text-white/65">{children}</span>
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

function SectionIcon({ children }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#A6FF00]/20 bg-[#A6FF00]/10 text-[#A6FF00]">
      {children}
    </span>
  );
}

function Welcome() {
  const cards = [
    { title: 'Dashboard', body: 'Your home base. A snapshot of active campaigns, recent coverage, and the one button that starts everything.', icon: '≡' },
    { title: 'My Business', body: 'A full intelligence brief on your business, built automatically when you onboard. No forms, no manual input.', icon: '◎' },
    { title: 'Brief It', body: 'Where campaigns start. Submit a brief telling the team what you need and they take it from there.', icon: '+' },
    { title: 'Campaign', body: 'Track every active campaign - what\'s been pitched, who\'s been contacted, and where things stand.', icon: '→' },
    { title: 'Coverage', body: 'Every piece of earned media across your campaigns, updated in real time as coverage lands.', icon: '✓' },
    { title: 'FAQs', body: 'Everything you need to know about how Pitchr works, all in one place.', icon: '?' },
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <div className="relative z-10 p-5 pb-5 md:p-7 md:pb-7">
        <div className="mb-2 flex items-start justify-between">
          <Heading>What's inside</Heading>
          <Eyebrow>Overview</Eyebrow>
        </div>
        <Intro>A quick rundown of every section in the platform and what you can do with it.</Intro>
        <div className="mt-5 grid gap-3 grid-cols-2">
          {cards.map((card) => (
            <div key={card.title} className="rounded-[1.35rem] border border-[#A6FF00]/20 bg-white/[0.035] p-5 text-white transition hover:border-[#A6FF00]/70">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A6FF00] text-sm font-black text-black">{card.icon}</span>
                <strong className="text-base font-black tracking-[-0.03em]">{card.title}</strong>
              </div>
              <span className="block text-xs font-medium leading-5 text-white/65">{card.body}</span>
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
      <div className="relative z-10 flex h-full flex-col p-5 md:p-7">
        <div className="mb-2 flex items-start justify-between">
          <Heading>Your Dashboard</Heading>
          <Eyebrow>Inside Pitchr</Eyebrow>
        </div>
        <p className="mb-4 text-sm font-medium leading-6 text-white/70">Your Dashboard is the central hub for everything happening across your account — active campaigns, recent coverage, and quick access to every section of the platform. Here's what you'll find inside Pitchr.</p>
        <ul className="flex flex-1 flex-col justify-around pr-[5%]">
          {[
            ['Dashboard', 'Your home base. A snapshot of active campaigns, recent coverage, and the one button that starts everything - Submit a Brief.'],
            ['My Business', 'Your intelligence brief. A full profile of your business, brand, competitors and PR strategy, built automatically by Pitchr when you onboard.'],
            ['Brief It', "Where you kick off a new campaign. Submit a brief telling the team what you need and they'll take it from there."],
            ['Campaign', "Track the progress of active campaigns - what's been pitched, who's been contacted, and where things stand."],
            ['Coverage', 'Every piece of earned media secured across every campaign, updated in real time as coverage lands.'],
          ].map(([title, body]) => (
            <li key={title} className="grid grid-cols-[25%_1fr] gap-y-0.5">
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                <strong className="whitespace-nowrap text-sm font-black text-white">{title}</strong>
              </div>
              <span className="text-xs font-medium leading-5 text-white/65">{body}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-[#A6FF00]/20 bg-[#A6FF00]/5 px-5 py-4">
          <strong className="block text-xs font-black text-[#A6FF00]">Submit a Brief</strong>
          <p className="mt-1 text-xs font-medium leading-5 text-white/65">This is the action that starts a campaign. When you have something you want to take to market, hit Submit a Brief - it opens the brief submission process and puts your campaign in motion.</p>
        </div>
      </div>
    </div>
  );
}

function BriefIt() {
  const steps = [
    ['+ Submit a Brief', "Hit the Submit a Brief button from your Dashboard to get started. This opens the brief form and officially kicks off the campaign creation process."],
    ['Fill in the form', "Tell us what you want to announce, who your audience is, and any publications or angles you have in mind. The more context you give us, the sharper the story we can build."],
    ['Submit your brief', "Once submitted, our team gets to work immediately — researching, writing, and building your media kit. You'll hear from us as soon as your first drafts are ready to review."],
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src="https://res.cloudinary.com/dfers76ex/image/upload/v1779917155/ChatGPT_Image_May_28_2026_07_24_22_AM_r18qzd.png" alt="" className="absolute inset-y-0 right-0 my-auto h-full w-auto [mask-image:linear-gradient(to_right,transparent_0%,transparent_15%,black_80%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_15%,black_80%)]" />
      <div className="relative z-10 flex h-full flex-col p-5 md:p-7">
        <div className="mb-2 flex items-start justify-between">
          <h2 className="text-3xl font-black leading-[0.92] tracking-[-0.065em] text-white md:text-4xl">Brief us.<br />We'll handle the rest.</h2>
          <Eyebrow>The Brief</Eyebrow>
        </div>
        <p className="mt-2 max-w-md text-sm font-medium leading-7 text-white/70">Brief It is where every campaign starts. Fill in the form, give us the context we need, and our team takes it from there.</p>
        <ol className="mt-5 w-[50%] space-y-5">
          {steps.map(([title, body], index) => (
            <li key={title} className="flex gap-4">
              <span className="text-3xl font-black leading-none tracking-[-0.05em] text-[#A6FF00]">{index + 1}</span>
              <div>
                <strong className="block text-sm font-black text-white">{title}</strong>
                <span className="mt-1 block text-xs font-medium leading-5 text-white/65">{body}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Campaign() {
  const [active, setActive] = useState(0);

  const journey = [
    ['Briefed', "Our team reads through your brief in full, researches your brand and competitive landscape, and identifies the strongest story angles before a single word is written. We dig into your category, your competitors, and current media trends to make sure your story is positioned to land. This stage typically takes 1–2 business days before writing begins."],
    ['Writing', "You'll receive up to 3 press releases, each written with a distinct angle and matched to targeted publications. Expect a range of approaches — from product-led to founder-led to market commentary — so you can choose what best fits the moment. These are packaged into a media kit for you to review, share internally, and approve."],
    ['Review', "Read through the drafts, choose your preferred angle, and leave any edits or feedback in the Messages thread inside your campaign. We'll update the release based on your notes until you're satisfied. Once you're happy, hit approve — that's your green light and we move immediately."],
    ['Approved', "Our team begins pitching your story to a curated list of targeted publications and journalists straight away. Every outreach is personalised to match the journalist's beat and the publication's audience — no spray and pray. You'll be able to track pitch activity in real time from this screen as responses come in."],
    ['Pitching', "We pitch, follow up, and manage journalist relationships on your behalf for the full campaign window. Every piece of coverage secured is logged to your Coverage tab the moment it goes live, with reach, sentiment, and a direct link to the article. Campaign windows typically run 4–6 weeks from approval, with coverage often landing in the first two."],
  ];

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={campaignBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/35" />
      <div className="relative z-10 flex h-full flex-col p-5 md:p-7">
        <div className="mb-2 flex items-start justify-between">
          <Heading>Your campaign journey</Heading>
          <Eyebrow>The process</Eyebrow>
        </div>
        <Intro>Every campaign moves through five stages — from the moment your brief lands with us to the day coverage goes live. Click any stage to see what's happening behind the scenes and what to expect next.</Intro>
        <div className="flex flex-1 flex-col justify-center">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-[5%] right-[5%] top-[30px] h-px bg-[#A6FF00]/20" />
            {journey.map(([title], i) => (
              <button
                key={title}
                type="button"
                onClick={() => setActive(i)}
                className="group relative flex flex-1 flex-col items-center gap-2"
              >
                <span className={`text-[10px] font-bold transition ${active === i ? 'text-[#A6FF00]' : 'text-white/40 group-hover:text-white/70'}`}>{title}</span>
                <span className={`relative z-10 h-4 w-4 rounded-full border-2 transition ${active === i ? 'border-[#A6FF00] bg-[#A6FF00]' : 'border-[#A6FF00]/40 bg-transparent group-hover:border-[#A6FF00]/70'}`} />
              </button>
            ))}
          </div>
          <div className="mt-14 rounded-[1.35rem] border border-[#A6FF00]/20 bg-white/[0.035] p-5">
            <p key={active} className="animate-[fadeIn_0.24s_ease] text-sm font-medium leading-6 text-white/70">{journey[active][1]}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActive(i => Math.max(0, i - 1))}
            disabled={active === 0}
            className="rounded-full border border-[#A6FF00]/25 px-4 py-1.5 text-[10px] font-bold text-white/55 transition hover:bg-[#A6FF00]/10 hover:text-white disabled:opacity-20"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setActive(i => Math.min(journey.length - 1, i + 1))}
            disabled={active === journey.length - 1}
            className="rounded-full border border-[#A6FF00]/25 px-4 py-1.5 text-[10px] font-bold text-white/55 transition hover:bg-[#A6FF00]/10 hover:text-white disabled:opacity-20"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function Coverage() {
  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src={coverageBg} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-100 [mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,rgba(0,0,0,0.15)_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,rgba(0,0,0,0.15)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
      <div className="relative z-10 p-5 md:p-7">
        <div className="mb-2 flex items-start justify-between">
          <Heading>Your coverage</Heading>
          <Eyebrow>Results</Eyebrow>
        </div>
        <Intro>Every piece of earned media secured across your campaigns is logged here automatically — updated in real time the moment an article goes live.</Intro>
        <ul className="mt-5 space-y-3 pr-[5%]">
          {[
            ['Placements', 'Every article, interview, and mention secured in the current campaign window. Each placement is logged the moment it goes live so your count is always current.'],
            ['Total reach', "An aggregate of each outlet's audited monthly readership — a quick proxy for how many people your story reached across all placements combined."],
            ['View and share', 'Click through to every published article directly from the platform. Use the share icon to send individual placements to your team or stakeholders.'],
            ['Sentiment', 'Each placement is tagged positive, neutral, or mixed based on framing and tone — a quick read on whether the narrative is landing the way you intended.'],
            ['Coverage timeline', 'A chronological log of every placement, filterable by date range and campaign. Useful for tracking momentum and spotting publication patterns over time.'],
            ['Key message hit rates', "See which of your approved key messages journalists are picking up in their copy. Over time, this shows which angles are resonating and which aren't cutting through."],
          ].map(([title, body]) => (
            <li key={title} className="grid grid-cols-[25%_1fr] gap-y-0.5">
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                <strong className="whitespace-nowrap text-sm font-black text-white">{title}</strong>
              </div>
              <span className="text-xs font-medium leading-5 text-white/65">{body}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MyBusiness() {
  const [activeSub, setActiveSub] = useState(0);

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
      <img src="https://res.cloudinary.com/dfers76ex/image/upload/v1779859083/ChatGPT_Image_May_27_2026_03_17_46_PM_lstdvh.png" alt="" className="absolute inset-x-0 bottom-1/2 h-1/2 w-full object-cover object-bottom opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="h-1/2 p-5 pb-0 md:p-7 md:pb-0">
          <div className="flex items-start justify-between">
            <Heading>Your intelligence brief</Heading>
            <Eyebrow>My Business</Eyebrow>
          </div>
          <p className="mt-2 text-sm font-medium leading-6 text-white/70">When you're onboarded to Pitchr, our agent automatically researches and builds a comprehensive intelligence brief on your business - no forms to fill in.</p>
        </div>
        <nav className="flex flex-wrap border-b border-[#A6FF00]/15 px-5 md:px-7" aria-label="Brief sections">
          {briefSections.map((section, i) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveSub(i)}
              className={`border-b-2 px-4 py-2.5 text-xs font-bold tracking-tight transition ${activeSub === i ? 'border-[#A6FF00] text-[#A6FF00]' : 'border-transparent text-white/35 hover:text-white/80'}`}
            >
              {section.title}
            </button>
          ))}
        </nav>
        <div className="flex-1 overflow-y-auto p-5 md:p-7">
          <div key={activeSub} className="animate-[fadeIn_0.24s_ease]">
            <div className="mb-3 flex items-center gap-3">
              <SectionIcon>{briefSections[activeSub].icon}</SectionIcon>
              <strong className="text-sm font-black text-white">{briefSections[activeSub].title}</strong>
            </div>
            <p className="text-sm font-medium leading-6 text-white/70">{briefSections[activeSub].description}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 pb-5">
          <button
            type="button"
            onClick={() => setActiveSub(i => Math.max(0, i - 1))}
            disabled={activeSub === 0}
            className="rounded-full border border-[#A6FF00]/25 px-4 py-1.5 text-[10px] font-bold text-white/70 transition hover:bg-[#A6FF00]/10 hover:text-white disabled:opacity-20"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setActiveSub(i => Math.min(briefSections.length - 1, i + 1))}
            disabled={activeSub === briefSections.length - 1}
            className="rounded-full border border-[#A6FF00]/25 px-4 py-1.5 text-[10px] font-bold text-white/70 transition hover:bg-[#A6FF00]/10 hover:text-white disabled:opacity-20"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function FAQs() {
  const [open, setOpen] = useState(0);

  return (
    <div className="relative h-full overflow-hidden bg-[#050505]">
<div className="relative z-10 flex h-full flex-col p-5 md:p-7">
        <div className="mb-2 flex items-start justify-between">
          <Heading>Got questions?</Heading>
          <Eyebrow>FAQs</Eyebrow>
        </div>
        <Intro>Everything you need to know about how Pitchr works.</Intro>
        <div className="mt-5 flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-2 gap-0.5">
            {faqItems.map((item, i) => (
              <button
                key={item.q}
                type="button"
                onClick={() => setOpen(i)}
                className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold leading-4 transition ${open === i ? 'bg-[#A6FF00]/10 text-[#A6FF00]' : 'text-white/70 hover:text-white'}`}
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6FF00]" />
                {item.q}
              </button>
            ))}
          </div>
          <div className="rounded-[1.35rem] border border-[#A6FF00]/20 bg-white/[0.035] p-5">
            <p key={open} className="animate-[fadeIn_0.24s_ease] line-clamp-4 text-sm font-medium leading-6 text-white">{faqItems[open].a}</p>
          </div>
          <div className="flex justify-center">
            <button type="button" className="rounded-full border border-[#A6FF00]/25 bg-[#A6FF00]/5 px-5 py-2.5 text-xs font-bold text-white/70 transition hover:bg-[#A6FF00]/10 hover:text-white">
              Still have questions? Reach out to our team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content({ index }) {
  const pages = useMemo(() => [Welcome, Dashboard, MyBusiness, BriefIt, Campaign, Coverage, FAQs], []);
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
            <div className="flex items-start justify-between gap-8">
              <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.07em] text-white md:text-7xl">
                Welcome to<br /><span className="ml-[92px]">Pitchr</span><span className="text-[#A6FF00]">.</span>
              </h1>
              <p className="self-center pl-5 text-sm font-medium leading-6 text-white/60">
                Everything you need to get started, submit your first brief, and watch your coverage grow in real time.
              </p>
            </div>
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
            className="h-10 rounded-full border border-[#A6FF00]/25 bg-transparent px-5 text-xs font-bold text-white/70 transition hover:bg-[#A6FF00]/10 hover:text-white disabled:opacity-20"
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
