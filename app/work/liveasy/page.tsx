"use client";

import React from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--accent:#7C3AED;--accent-light:#F5F3FF;--accent-mid:#A78BFA;--black:#0a0a0a;--gray:#f5f5f3;--text:#111;--muted:#666;--border:#ebebeb}
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
  @media(max-width:768px){
    .r-grid{grid-template-columns:1fr!important;gap:32px!important}
    .r-grid-2{grid-template-columns:1fr!important;gap:16px!important}
    .r-grid-3{grid-template-columns:1fr!important;gap:16px!important}
    .r-grid-4{grid-template-columns:1fr 1fr!important;gap:1px!important}
    .r-pad{padding:60px 6%!important}
    .r-nav-links{display:none!important}
    .r-hero-title{font-size:clamp(44px,12vw,72px)!important}
    .r-outcome-banner{gap:20px!important;padding:16px 6%!important}
    .r-pillars{grid-template-columns:1fr 1fr!important}
    .before-row{grid-template-columns:1fr!important;gap:24px!important}
    .after-grid{grid-template-columns:1fr!important;gap:24px!important}
  }
`;

const Tag = ({ label, variant }: { label: string; variant: "accent" | "gray" }) => (
  <span style={{
    display:"inline-block", fontSize:11, fontWeight:500, letterSpacing:".08em",
    textTransform:"uppercase", padding:"4px 12px", borderRadius:20,
    ...(variant === "accent"
      ? { background:"rgba(124,58,237,.2)", color:"#A78BFA", border:"1px solid rgba(124,58,237,.3)" }
      : { background:"rgba(255,255,255,.08)", color:"#888", border:"1px solid rgba(255,255,255,.1)" })
  }}>{label}</span>
);

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"var(--accent)", fontWeight:500, marginBottom:16 }}>{children}</div>
);
const STitle = ({ children, white }: { children: React.ReactNode; white?: boolean }) => (
  <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:600, letterSpacing:"-.03em", lineHeight:1.15, marginBottom:20, color: white ? "#fff" : "var(--text)" }}>{children}</h2>
);
const SBody = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize:16, color:"var(--muted)", lineHeight:1.85, maxWidth:640 }}>{children}</div>
);
const Divider = () => <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"0 6%" }} />;

const Nav = () => (
  <div style={{ position:"fixed", top:20, left:0, right:0, display:"flex", justifyContent:"center", zIndex:500, pointerEvents:"none" }}>
    <nav style={{ background:"#fff", borderRadius:50, padding:"6px 8px", display:"flex", alignItems:"center", gap:2, border:"1px solid #e0e0e0", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", pointerEvents:"auto" }}>
      <div className="r-nav-links" style={{ display:"flex", alignItems:"center", gap:2 }}>
        {[{label:"About",href:"/#about"},{label:"Work",href:"/#work"},{label:"Experience",href:"/#experience"},{label:"Reflections",href:"/#reflections"}].map(l => (
          <a key={l.label} href={l.href}
            style={{ fontSize:13, color:"rgba(0,0,0,0.5)", textDecoration:"none", padding:"7px 18px", borderRadius:40, transition:"all 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.color="#111"; e.currentTarget.style.background="rgba(0,0,0,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="rgba(0,0,0,0.5)"; e.currentTarget.style.background="transparent"; }}
          >{l.label}</a>
        ))}
      </div>
      <a href="/#contact" style={{ background:"#111", color:"#fff", fontWeight:500, padding:"7px 20px", borderRadius:40, fontSize:13, textDecoration:"none" }}
        onMouseEnter={e => e.currentTarget.style.background="#333"}
        onMouseLeave={e => e.currentTarget.style.background="#111"}
      >Let&apos;s Talk!</a>
    </nav>
  </div>
);

const Hero = () => (
  <div className="r-pad" style={{ padding:"140px 6% 80px", background:"var(--black)", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-200, right:-100, width:500, height:500, background:"radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%)", pointerEvents:"none" }} />
    <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
      <Tag label="UI Design Internship" variant="accent" />
      <Tag label="Logistics · TMS · 2024" variant="gray" />
      <Tag label="Nexus Info" variant="gray" />
    </div>
    <h1 className="r-hero-title" style={{ fontSize:"clamp(52px,8vw,100px)", fontWeight:600, lineHeight:.95, letterSpacing:"-.04em", color:"#fff", marginBottom:28 }}>
      Liveasy<span style={{ color:"var(--accent-mid)", display:"block" }}>Trust is the product.</span>
    </h1>
    <p style={{ fontSize:18, color:"#888", maxWidth:580, lineHeight:1.7, marginBottom:56 }}>
      Redesigning the homepage of a logistics TMS — where clarity, credibility, and guided action aren&apos;t just design goals, they&apos;re core usability requirements.
    </p>
    <div className="r-grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.08)", borderRadius:14, overflow:"hidden", maxWidth:700 }}>
      {[{ l:"Role", v:"UI Design Intern" },{ l:"Duration", v:"Jul – Aug 2024" },{ l:"Scope", v:"Homepage redesign" },{ l:"Company", v:"Nexus Info" }].map(({ l, v }) => (
        <div key={l} style={{ padding:"20px 16px", background:"var(--black)" }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".1em", color:"#555", marginBottom:6, fontWeight:500 }}>{l}</div>
          <div style={{ fontSize:13, color:"#ccc", fontWeight:500 }}>{v}</div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomeBanner = () => (
  <div className="r-outcome-banner" style={{ background:"var(--accent)", padding:"20px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
    {[{ num:"20%", label:"Lift in click-through rates" },{ num:"6", label:"Core pages redesigned" },{ num:"10+", label:"Trust signals integrated" },{ num:"4", label:"Design pillars defined" }].map(({ num, label }, i) => (
      <div key={num} style={{ display:"flex", alignItems:"center", gap:48 }}>
        {i > 0 && <div style={{ width:1, height:40, background:"rgba(255,255,255,.25)" }} />}
        <div style={{ textAlign:"center", color:"#fff" }}>
          <div style={{ fontSize:36, fontWeight:600, letterSpacing:"-.03em", lineHeight:1 }}>{num}</div>
          <div style={{ fontSize:12, opacity:.8, marginTop:4 }}>{label}</div>
        </div>
      </div>
    ))}
  </div>
);

const BackgroundSection = () => (
  <div className="r-pad" style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>Background</SLabel>
    <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
      <div>
        <STitle>My first internship. A real product. Real users.</STitle>
        <SBody>
          <p>It was my second year when I landed my first UI design internship working on Liveasy — a logistics Transport Management System used by shippers and transporters across India.</p>
          <p style={{ marginTop:16 }}>My responsibility was to redesign the homepage. What looked like a visual problem turned out to be a trust problem — and that realization changed everything.</p>
        </SBody>
      </div>
      <div>
        <div style={{ borderLeft:"3px solid var(--accent)", padding:"20px 24px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--text)", lineHeight:1.7, fontStyle:"italic", marginBottom:20 }}>
          &ldquo;In logistics, users don&apos;t just evaluate features — they evaluate risk. That makes trust a core usability requirement, not a visual afterthought.&rdquo;
          <cite style={{ display:"block", fontSize:12, color:"var(--muted)", fontStyle:"normal", marginTop:8, fontWeight:500 }}>— Core insight that shaped the redesign</cite>
        </div>
      </div>
    </div>
  </div>
);

// ── BEFORE + WHAT'S WRONG ─────────────────────────────────────────────────
const problemsHero = [
  { n:"01", text:"Wall of text as the hero — no headline, no value prop, just a paragraph" },
  { n:"02", text:"No CTA — users have no clear next action above the fold" },
  { n:"03", text:"Background photo with no contrast control makes text hard to read" },
  { n:"04", text:"No hierarchy — every word carries the same visual weight" },
];

const problemsFeatures = [
  { n:"01", text:"Cartoon illustrations feel unprofessional for an enterprise B2B product" },
  { n:"02", text:"Zigzag layout with a dashed line creates confusion, not clarity" },
  { n:"03", text:"No trust signals — no logos, no stats, nothing to build credibility" },
  { n:"04", text:"'Why choose us?' section doesn't answer the question — it lists features" },
];

const ProblemCallout = ({ items }: { items: { n: string; text: string }[] }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
    {items.map(({ n, text }) => (
      <div key={n} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"14px 18px", borderRadius:12, background:"rgba(239,68,68,.04)", border:"1px solid rgba(239,68,68,.12)" }}>
        <div style={{ width:26, height:26, borderRadius:6, background:"rgba(239,68,68,.15)", color:"#ef4444", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{n}</div>
        <p style={{ fontSize:13, color:"#555", lineHeight:1.6, marginTop:2 }}>{text}</p>
      </div>
    ))}
  </div>
);

const BeforeSection = () => (
  <div className="r-pad" style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>01 — The Problem</SLabel>
    <STitle>What was broken<br />before I touched it.</STitle>
    <SBody><p style={{ marginBottom:48 }}>The existing site had no hierarchy, no trust, and no clear path for a logistics buyer to take action. Here&apos;s what the original looked like — and exactly why it wasn&apos;t working.</p></SBody>

    {/* Before 1 — Hero */}
    <div style={{ marginBottom:64 }}>
      <div style={{ fontSize:12, fontWeight:600, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:20 }}>Screen 01 — Hero Section</div>
      <div className="before-row" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:40, alignItems:"start" }}>
        {/* Screenshot with red overlay annotations */}
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, padding:"8px 14px", background:"rgba(239,68,68,.9)", borderRadius:"12px 12px 0 0", zIndex:2 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".08em", textTransform:"uppercase" }}>⚠ Before</span>
          </div>
          <img src="/work/liveasy/before/1.jpg" alt="Liveasy before - hero" style={{ width:"100%", borderRadius:12, border:"2px solid rgba(239,68,68,.4)", display:"block" }} />
        </div>
        {/* Problem callouts */}
        <div>
          <div style={{ fontSize:14, fontWeight:600, color:"#ef4444", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>✗</span> What&apos;s wrong here
          </div>
          <ProblemCallout items={problemsHero} />
        </div>
      </div>
    </div>

    {/* Before 2 — Features */}
    <div>
      <div style={{ fontSize:12, fontWeight:600, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:20 }}>Screen 02 — Features &amp; Why Us Section</div>
      <div className="before-row" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:40, alignItems:"start" }}>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, padding:"8px 14px", background:"rgba(239,68,68,.9)", borderRadius:"12px 12px 0 0", zIndex:2 }}>
            <span style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".08em", textTransform:"uppercase" }}>⚠ Before</span>
          </div>
          <img src="/work/liveasy/before/2.jpg" alt="Liveasy before - features" style={{ width:"100%", borderRadius:12, border:"2px solid rgba(239,68,68,.4)", display:"block" }} />
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:600, color:"#ef4444", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>✗</span> What&apos;s wrong here
          </div>
          <ProblemCallout items={problemsFeatures} />
        </div>
      </div>
    </div>
  </div>
);

// ── DESIGN THINKING ───────────────────────────────────────────────────────
const CompAnalysis = () => (
  <div className="r-pad" style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>02 — Research &amp; Strategy</SLabel>
    <STitle>Understanding the problem<br />before solving it.</STitle>
    <SBody><p style={{ marginBottom:40 }}>Before touching Figma, I studied competitors and defined what the redesign needed to achieve. This is where the insight that trust is a usability requirement — not a visual choice — became the foundation for every decision.</p></SBody>
    <div className="r-grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
      <div style={{ borderRadius:16, padding:28, border:"1px solid var(--border)", borderTop:"3px solid #22c55e" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", fontWeight:500, marginBottom:16, color:"#22c55e" }}>What competitors did well</div>
        {["Clear value above the fold","Client logos and social proof visible early","Strong primary CTA with no competing actions","Feature sections organized around outcomes"].map(t => (
          <div key={t} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--muted)", lineHeight:1.5, marginBottom:10 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", flexShrink:0, marginTop:6 }} />{t}
          </div>
        ))}
      </div>
      <div style={{ borderRadius:16, padding:28, border:"1px solid var(--border)", borderTop:"3px solid #ef4444" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", fontWeight:500, marginBottom:16, color:"#ef4444" }}>Where they all fell short</div>
        {["Feature-heavy messaging over value communication","Overloaded hero sections creating cognitive overload","Generic visual language — products felt interchangeable","Trust treated as an afterthought, not a foundation"].map(t => (
          <div key={t} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--muted)", lineHeight:1.5, marginBottom:10 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", flexShrink:0, marginTop:6 }} />{t}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PillarsSection = () => (
  <div style={{ background:"var(--black)", padding:"80px 6%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <SLabel>03 — Design Pillars</SLabel>
      <STitle white>Every decision filtered<br />through four principles.</STitle>
      <div className="r-pillars" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:40 }}>
        {[
          { num:"01", h:"Clarity before aesthetics", p:"Communicate what Liveasy does within seconds. Hierarchy redesigned to prioritize understanding first." },
          { num:"02", h:"Trust is the product", p:"Logistics buyers trust a platform with real operations. Credibility signals embedded throughout the experience." },
          { num:"03", h:"Guide, don't let users wander", p:"One primary CTA. Clear directional hierarchy. Reduced hesitation by removing competing actions." },
          { num:"04", h:"Good design is good business", p:"Every decision evaluated through a business lens — does this help users understand, trust, or act?" },
        ].map(({ num, h, p }) => (
          <div key={num} style={{ background:"#111", border:"1px solid #1d1d1d", borderRadius:14, padding:24, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"var(--accent)" }} />
            <div style={{ fontSize:11, color:"var(--accent-mid)", fontWeight:600, letterSpacing:".1em", marginBottom:12 }}>{num}</div>
            <div style={{ fontSize:15, fontWeight:600, color:"#fff", marginBottom:8, lineHeight:1.3 }}>{h}</div>
            <p style={{ fontSize:12, color:"#777", lineHeight:1.6 }}>{p}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── REDESIGN ──────────────────────────────────────────────────────────────
const afterScreens = [
  {
    label:"Screen 01 — New Hero",
    src:"/work/liveasy/after/1.jpg",
    changes:[
      { n:"01", text:"Clear headline: 'Connecting transporters and shifters across India' — instantly communicates purpose" },
      { n:"02", text:"One primary CTA (Schedule a Demo) — no competing actions above the fold" },
      { n:"03", text:"Truck imagery used intentionally on the left — visual context, not decoration" },
      { n:"04", text:"Secondary CTAs (Get Shifter App, Get Transporter App) below — hierarchy preserved" },
    ],
  },
  {
    label:"Screen 02 — Trust & Features",
    src:"/work/liveasy/after/2.jpg",
    changes:[
      { n:"01", text:"Client logos from British Paints, Berger, Chryso, Qoot, Balaji — instant enterprise credibility" },
      { n:"02", text:"Stats strip: 500+ customers, 50,000+ downloads — proof before features" },
      { n:"03", text:"Feature cards with real icons replace cartoon illustrations — professional and consistent" },
      { n:"04", text:"Card grid replaces zigzag layout — scannable, structured, outcome-led copy" },
    ],
  },
  {
    label:"Screen 03 — Features Deep Dive",
    src:"/work/liveasy/after/3.jpg",
    changes:[
      { n:"01", text:"Six feature cards organized in a clean 3-col grid with consistent iconography" },
      { n:"02", text:"Each card leads with a capability name, then explains the business outcome" },
      { n:"03", text:"'How it Works' step flow gives buyers a clear mental model of onboarding" },
      { n:"04", text:"Teal background section creates visual breathing room before the footer CTA" },
    ],
  },
];

const AfterSection = () => (
  <div className="r-pad" style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>04 — The Redesign</SLabel>
    <STitle>Same product.<br />Completely different trust.</STitle>
    <SBody><p style={{ marginBottom:56 }}>Here&apos;s what the redesign looks like — and why each decision was made.</p></SBody>

    {afterScreens.map(({ label, src, changes }, idx) => (
      <div key={label} style={{ marginBottom:72, paddingBottom:72, borderBottom: idx < afterScreens.length - 1 ? "1px solid var(--border)" : "none" }}>
        <div style={{ fontSize:12, fontWeight:600, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:20 }}>{label}</div>
        <div className="after-grid" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:40, alignItems:"start" }}>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, padding:"8px 14px", background:"rgba(124,58,237,.9)", borderRadius:"12px 12px 0 0", zIndex:2 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#fff", letterSpacing:".08em", textTransform:"uppercase" }}>✓ After</span>
            </div>
            <img src={src} alt={label} style={{ width:"100%", borderRadius:12, border:"2px solid rgba(124,58,237,.3)", display:"block" }} />
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:"var(--accent)", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>✓</span> What changed &amp; why
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {changes.map(({ n, text }) => (
                <div key={n} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"14px 18px", borderRadius:12, background:"rgba(124,58,237,.04)", border:"1px solid rgba(124,58,237,.12)" }}>
                  <div style={{ width:26, height:26, borderRadius:6, background:"rgba(124,58,237,.15)", color:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{n}</div>
                  <p style={{ fontSize:13, color:"#555", lineHeight:1.6, marginTop:2 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ReflectionSection = () => (
  <div className="r-pad" style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>05 — Reflection</SLabel>
    <STitle>What designing for<br />enterprise trust taught me.</STitle>
    <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:40 }}>
      {[
        { n:"01", h:"Context changes everything", p:"Logistics buyers evaluate risk, not just features. Understanding the user's emotional context completely changed how I approached every decision." },
        { n:"02", h:"Competitive analysis before pixels", p:"Studying competitors before touching Figma meant I wasn't designing in a vacuum. I knew the baseline, which made it possible to deliberately go beyond it." },
        { n:"03", h:"Design pillars as a filter", p:`"Does this build trust?" became more useful than "does this look good?" Pillars gave every decision a reason to exist.` },
      ].map(({ n, h, p }) => (
        <div key={n} style={{ border:"1px solid var(--border)", borderRadius:16, padding:28 }}>
          <div style={{ fontSize:36, fontWeight:600, color:"#f0f0f0", lineHeight:1, marginBottom:12 }}>{n}</div>
          <div style={{ fontSize:15, fontWeight:600, marginBottom:8 }}>{h}</div>
          <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7 }}>{p}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function LiveasyCaseStudy() {
  return (
    <>
      <style>{css}</style>
      <a href="/#work" style={{ position:"fixed", top:24, left:24, zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", color:"#fff", fontSize:16, width:40, height:40, borderRadius:"50%", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", transition:"background .2s" }}
        onMouseEnter={e => e.currentTarget.style.background="rgba(0,0,0,0.8)"}
        onMouseLeave={e => e.currentTarget.style.background="rgba(0,0,0,0.55)"}
      >←</a>
      <Nav />
      <Hero />
      <OutcomeBanner />
      <BackgroundSection />
      <Divider />
      <BeforeSection />
      <Divider />
      <CompAnalysis />
      <Divider />
      <PillarsSection />
      <AfterSection />
      <Divider />
      <ReflectionSection />
      <div style={{ background:"var(--black)", padding:"100px 6%", textAlign:"center" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"#444", marginBottom:16 }}>Next Case Study</div>
        <div style={{ fontSize:"clamp(36px,6vw,72px)", fontWeight:600, color:"#fff", letterSpacing:"-.04em", marginBottom:10, lineHeight:1 }}>Lighthouse AI</div>
        <div style={{ fontSize:14, color:"#555", marginBottom:36 }}>AI coaching product · Playbook feature · End-to-end design</div>
        <a href="/work/lighthouse" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:10, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>View Case Study →</a>
      </div>
    </>
  );
}