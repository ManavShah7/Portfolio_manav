"use client";

import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--green:#3B6D11;--green-light:#EAF3DE;--black:#0a0a0a;--white:#fff;--gray:#f5f5f3;--text:#111;--muted:#666;--border:#ebebeb}
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
`;

const Tag = ({ label, variant }: { label: string; variant: "green" | "gray" }) => (
  <span style={{
    display:"inline-block", fontSize:11, fontWeight:500, letterSpacing:".08em",
    textTransform:"uppercase", padding:"4px 12px", borderRadius:20,
    ...(variant === "green"
      ? { background:"rgba(59,109,17,.25)", color:"#7dc142", border:"1px solid rgba(59,109,17,.3)" }
      : { background:"rgba(255,255,255,.08)", color:"#888", border:"1px solid rgba(255,255,255,.1)" })
  }}>{label}</span>
);

const SLabel = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"var(--green)", fontWeight:500, marginBottom:16 }}>{children}</div>
);

const STitle = ({ children, white }: { children: React.ReactNode; white?: boolean }) => (
  <h2 style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:600, letterSpacing:"-.03em", lineHeight:1.15, marginBottom:20, color: white ? "#fff" : "var(--text)" }}>{children}</h2>
);

const SBody = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => (
  <div style={{ fontSize:16, color: muted ? "#888" : "var(--muted)", lineHeight:1.85, maxWidth:640 }}>{children}</div>
);

const Nav = () => (
  <div style={{ position:"fixed", top:20, left:0, right:0, display:"flex", justifyContent:"center", zIndex:500, pointerEvents:"none" }}>
    <nav style={{ background:"#fff", borderRadius:50, padding:"6px 8px", display:"flex", alignItems:"center", gap:2, border:"1px solid #e0e0e0", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", pointerEvents:"auto" }}>
      {[{label:"About",href:"/#about"},{label:"Work",href:"/#work"},{label:"Experience",href:"/#experience"},{label:"Reflections",href:"/#reflections"}].map(l => (
        <a key={l.label} href={l.href}
          style={{ fontSize:13, color:"rgba(0,0,0,0.5)", textDecoration:"none", padding:"7px 18px", borderRadius:40, transition:"all 0.2s", whiteSpace:"nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.color="#111"; e.currentTarget.style.background="rgba(0,0,0,0.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.color="rgba(0,0,0,0.5)"; e.currentTarget.style.background="transparent"; }}
        >{l.label}</a>
      ))}
      <a href="/#contact"
        style={{ background:"#111", color:"#fff", fontWeight:500, padding:"7px 20px", borderRadius:40, fontSize:13, textDecoration:"none" }}
        onMouseEnter={e => e.currentTarget.style.background="#333"}
        onMouseLeave={e => e.currentTarget.style.background="#111"}
      >Let&apos;s Talk!</a>
    </nav>
  </div>
);

const Hero = () => (
  <div style={{ padding:"120px 6% 80px", background:"var(--black)", color:"#fff", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, background:"radial-gradient(circle,rgba(59,109,17,.15) 0%,transparent 70%)", pointerEvents:"none" }} />
    <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
      <Tag label="Product Design Internship" variant="green" />
      <Tag label="AI · Career Tech · 2025" variant="gray" />
      <Tag label="California, USA · Remote" variant="gray" />
    </div>
    <h1 style={{ fontSize:"clamp(56px,9vw,108px)", fontWeight:600, lineHeight:.95, letterSpacing:"-.04em", color:"#fff", marginBottom:28 }}>
      Lighthouse AI<span style={{ color:"var(--green)", display:"block" }}>Clarity over noise.</span>
    </h1>
    <p style={{ fontSize:18, color:"#888", maxWidth:580, lineHeight:1.7, marginBottom:56 }}>
      Designing an AI-powered coaching product that turns overwhelming information into a personalized path forward.
    </p>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.08)", borderRadius:14, overflow:"hidden", maxWidth:700 }}>
      {[{ l:"Role", v:"Product Design Intern" },{ l:"Duration", v:"Feb – Jul 2025" },{ l:"Scope", v:"End-to-end design" },{ l:"Team", v:"Design, PM, Eng" }].map(({ l, v }) => (
        <div key={l} style={{ padding:"20px 24px", background:"var(--black)" }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".1em", color:"#555", marginBottom:6, fontWeight:500 }}>{l}</div>
          <div style={{ fontSize:14, color:"#ccc", fontWeight:500 }}>{v}</div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomeBanner = () => (
  <div style={{ background:"var(--green)", padding:"20px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
    {[{ num:"40%", label:"Increase in AI extension downloads" },{ num:"5", label:"High-fidelity prototypes shipped" },{ num:"20", label:"Component design system" },{ num:"70+", label:"Research participants" }].map(({ num, label }, i) => (
      <>
        {i > 0 && <div key={`d${i}`} style={{ width:1, height:40, background:"rgba(255,255,255,.2)" }} />}
        <div key={num} style={{ textAlign:"center", color:"#fff" }}>
          <div style={{ fontSize:36, fontWeight:600, letterSpacing:"-.03em", lineHeight:1 }}>{num}</div>
          <div style={{ fontSize:12, opacity:.8, marginTop:4 }}>{label}</div>
        </div>
      </>
    ))}
  </div>
);

const ContextSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>Background</SLabel>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
      <div>
        <STitle>I joined to help shape an idea that didn't fully exist yet.</STitle>
        <SBody>
          <p>It was my final semester when I joined Lighthouse AI as a Product Design Intern. I was drawn to it because it challenged the usual way things are done.</p>
          <p style={{ marginTop:16 }}>The mission: help people navigate their growth without drowning in information. I designed from the inside out — as a student myself, I spoke with peers and mapped the problems I faced every day.</p>
        </SBody>
      </div>
      <div>
        <div style={{ borderLeft:"3px solid var(--green)", padding:"20px 24px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--text)", lineHeight:1.7, fontStyle:"italic", marginBottom:20 }}>
          "The problem isn't a lack of knowledge — it's a lack of direction."
          <cite style={{ display:"block", fontSize:12, color:"var(--muted)", fontStyle:"normal", marginTop:8, fontWeight:500 }}>— Core insight that shaped everything</cite>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { num:"01", title:"Information without direction", desc:"Courses, blogs, videos everywhere — yet progress still felt unclear" },
            { num:"02", title:"Effort without visible progress", desc:"Users worked hard but couldn't measure momentum" },
            { num:"03", title:"No personalized guidance", desc:"Generic advice failed to account for individual context" },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"16px 20px", borderRadius:12, background:"var(--gray)", border:"1px solid var(--border)" }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"#111", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, flexShrink:0 }}>{num}</div>
              <div>
                <h4 style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>{title}</h4>
                <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ResearchSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>01 — Research</SLabel>
    <STitle>Understanding users<br />beyond assumptions.</STitle>
    <SBody>Before designing anything, we needed to understand who we were actually designing for — not just their goals, but their emotional state and frustrations.</SBody>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, margin:"40px 0" }}>
      {[{ num:"50", label:"Survey responses" },{ num:"20", label:"User interviews" },{ num:"100s", label:"Reddit threads analyzed" }].map(({ num, label }) => (
        <div key={num} style={{ background:"var(--black)", borderRadius:14, padding:28, textAlign:"center" }}>
          <div style={{ fontSize:40, fontWeight:600, color:"var(--green)", letterSpacing:"-.03em" }}>{num}</div>
          <div style={{ fontSize:13, color:"#888", marginTop:4 }}>{label}</div>
        </div>
      ))}
    </div>
    <SBody>Interviews uncovered individual motivations, expectations, and frustrations. Surveys validated whether these challenges were shared broadly. Together they revealed recurring themes: decision fatigue, lack of structure, and need for personalized guidance.</SBody>
  </div>
);

const imgStyle: React.CSSProperties = { width:"100%", borderRadius:16, border:"1px solid var(--border)", display:"block" };

const FeaturesSection = () => (
  <div style={{ padding:"80px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>04 — Feature Breakdown</SLabel>
    <STitle>Translating system thinking<br />into human experiences.</STitle>

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", padding:"64px 0", borderBottom:"1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)", fontWeight:500, marginBottom:12 }}>Feature 01 — Onboarding</div>
        <h3 style={{ fontSize:26, fontWeight:600, letterSpacing:"-.02em", marginBottom:14, lineHeight:1.3 }}>Turning background into direction with AI</h3>
        <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.8, marginBottom:16 }}>Instead of asking users to start from scratch, Lighthouse AI asks users to upload their resume to understand their background and suggest relevant goals.</p>
        <div style={{ borderLeft:"2px solid var(--green)", padding:"12px 16px", background:"var(--gray)", borderRadius:"0 8px 8px 0", fontSize:13, color:"var(--text)", lineHeight:1.6, fontStyle:"italic" }}>"The redesigned onboarding flow drove a 40% increase in downloads — the biggest single impact of the internship."</div>
      </div>
      <img src="/work/lighthouse/1.png" alt="Onboarding screen" style={imgStyle} />
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", padding:"64px 0", borderBottom:"1px solid var(--border)" }}>
      <img src="/work/lighthouse/2.png" alt="Skill assessment screen" style={imgStyle} />
      <div>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)", fontWeight:500, marginBottom:12 }}>Feature 02 — Skill Assessment</div>
        <h3 style={{ fontSize:26, fontWeight:600, letterSpacing:"-.02em", marginBottom:14, lineHeight:1.3 }}>Validating where users actually stand</h3>
        <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.8, marginBottom:16 }}>Before giving direction, Lighthouse AI first understands the user's true starting point. Instead of assuming skill levels, the system validates proficiency across key areas.</p>
        <div style={{ borderLeft:"2px solid var(--green)", padding:"12px 16px", background:"var(--gray)", borderRadius:"0 8px 8px 0", fontSize:13, color:"var(--text)", lineHeight:1.6, fontStyle:"italic" }}>Framing the question as "how confident are you?" produced more honest, actionable answers than asking skill level directly.</div>
      </div>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", padding:"64px 0" }}>
      <div>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)", fontWeight:500, marginBottom:12 }}>Feature 03 — Navi, the AI Coach</div>
        <h3 style={{ fontSize:26, fontWeight:600, letterSpacing:"-.02em", marginBottom:14, lineHeight:1.3 }}>Context-aware guidance, not generic advice</h3>
        <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.8, marginBottom:16 }}>Navi adapts its tone and depth based on the user's emotional and cognitive state. Timing and tone matter as much as content.</p>
        <div style={{ borderLeft:"2px solid var(--green)", padding:"12px 16px", background:"var(--gray)", borderRadius:"0 8px 8px 0", fontSize:13, color:"var(--text)", lineHeight:1.6, fontStyle:"italic" }}>"When a user says 'I feel stuck', the wrong response is a task list. The right response is acknowledgment first — then a plan."</div>
      </div>
      <img src="/work/lighthouse/3.png" alt="Navi chat screen" style={imgStyle} />
    </div>
  </div>
);

const ImpactSection = () => (
  <div style={{ background:"var(--black)", padding:"80px 6%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <SLabel>06 — Impact</SLabel>
      <STitle white>What shipped.<br />What changed.</STitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:48 }}>
        {[
          { num:"40%", label:"Increase in AI extension downloads after redesigning onboarding" },
          { num:"5", label:"High-fidelity prototypes shipped across Playbook, onboarding, and coaching flows" },
          { num:"70+", label:"Research participants across surveys, interviews, and usability tests" },
        ].map(({ num, label }) => (
          <div key={num} style={{ border:"1px solid #1d1d1d", borderRadius:16, padding:32, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"var(--green)" }} />
            <div style={{ fontSize:48, fontWeight:600, color:"var(--green)", letterSpacing:"-.04em", lineHeight:1 }}>{num}</div>
            <div style={{ fontSize:13, color:"#888", marginTop:8, lineHeight:1.5 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LearningsSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>07 — Reflection</SLabel>
    <STitle>What this internship<br />taught me about design.</STitle>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:40 }}>
      {[
        { n:"01", h:"Research changes what you design", p:"Reddit taught me that unfiltered conversations reveal more than structured interviews alone. The insight that timing and tone matter as much as content completely changed how we designed Navi." },
        { n:"02", h:"Systems before screens", p:"Designing the Input → Interpretation → Direction → Feedback loop before touching Figma meant every screen had a clear reason to exist." },
        { n:"03", h:"Advocacy is part of the job", p:"Presenting research findings to PMs and engineering leadership — not just handing off screens — was where design actually shaped the roadmap." },
      ].map(({ n, h, p }) => (
        <div key={n} style={{ border:"1px solid var(--border)", borderRadius:16, padding:28 }}>
          <div style={{ fontSize:40, fontWeight:600, color:"#f0f0f0", lineHeight:1, marginBottom:14 }}>{n}</div>
          <div style={{ fontSize:16, fontWeight:600, marginBottom:8 }}>{h}</div>
          <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.7 }}>{p}</p>
        </div>
      ))}
    </div>
  </div>
);

const NextSection = () => (
  <div style={{ background:"var(--black)", padding:"100px 6%", textAlign:"center" }}>
    <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"#444", marginBottom:16 }}>Next Case Study</div>
    <div style={{ fontSize:"clamp(36px,6vw,72px)", fontWeight:600, color:"#fff", letterSpacing:"-.04em", marginBottom:10, lineHeight:1 }}>GoWork</div>
    <div style={{ fontSize:14, color:"#555", marginBottom:36 }}>0→1 product · AI-powered job hunting · Built and designed solo</div>
    <a href="/work/gowork" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:10, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>View Case Study →</a>
  </div>
);

export default function LighthouseCaseStudy() {
  return (
    <>
      <style>{css}</style>
      <a href="/#work"
        style={{ position:"fixed", top:24, left:24, zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", color:"#fff", fontSize:16, width:40, height:40, borderRadius:"50%", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", transition:"background .2s" }}
        onMouseEnter={e => e.currentTarget.style.background="rgba(0,0,0,0.8)"}
        onMouseLeave={e => e.currentTarget.style.background="rgba(0,0,0,0.55)"}
      >←</a>
      <Nav />
      <Hero />
      <OutcomeBanner />
      <ContextSection />
      <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"0 6%" }} />
      <ResearchSection />
      <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"0 6%" }} />
      <FeaturesSection />
      <ImpactSection />
      <LearningsSection />
      <NextSection />
    </>
  );
}