"use client";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --accent:#7C3AED;--accent-light:#F5F3FF;--accent-mid:#A78BFA;
    --black:#0a0a0a;--gray:#f5f5f3;--text:#111;--muted:#666;--border:#ebebeb
  }
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
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
  <h2 style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:600, letterSpacing:"-.03em", lineHeight:1.15, marginBottom:20, color: white ? "#fff" : "var(--text)" }}>{children}</h2>
);

const SBody = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => (
  <div style={{ fontSize:16, color: muted ? "#888" : "var(--muted)", lineHeight:1.85, maxWidth:640 }}>{children}</div>
);

const Divider = () => <hr style={{ border:"none", borderTop:"1px solid var(--border)", margin:"0 6%" }} />;

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
  <div style={{ padding:"140px 6% 80px", background:"var(--black)", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-200, right:-100, width:500, height:500, background:"radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%)", pointerEvents:"none" }} />
    <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
      <Tag label="UI Design Internship" variant="accent" />
      <Tag label="Logistics · TMS · 2024" variant="gray" />
      <Tag label="Nexus Info" variant="gray" />
    </div>
    <h1 style={{ fontSize:"clamp(52px,8vw,100px)", fontWeight:600, lineHeight:.95, letterSpacing:"-.04em", color:"#fff", marginBottom:28 }}>
      Liveasy<span style={{ color:"var(--accent-mid)", display:"block" }}>Trust is the product.</span>
    </h1>
    <p style={{ fontSize:18, color:"#888", maxWidth:580, lineHeight:1.7, marginBottom:56 }}>
      Redesigning the homepage of a logistics TMS — where clarity, credibility, and guided action aren't just design goals, they're core usability requirements.
    </p>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.08)", borderRadius:14, overflow:"hidden", maxWidth:700 }}>
      {[{ l:"Role", v:"UI Design Intern" },{ l:"Duration", v:"Jul – Aug 2024" },{ l:"Scope", v:"Homepage redesign" },{ l:"Company", v:"Nexus Info" }].map(({ l, v }) => (
        <div key={l} style={{ padding:"20px 24px", background:"var(--black)" }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".1em", color:"#555", marginBottom:6, fontWeight:500 }}>{l}</div>
          <div style={{ fontSize:14, color:"#ccc", fontWeight:500 }}>{v}</div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomeBanner = () => (
  <div style={{ background:"var(--accent)", padding:"20px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
    {[{ num:"20%", label:"Lift in click-through rates" },{ num:"6", label:"Core pages redesigned" },{ num:"10+", label:"Trust signals integrated" },{ num:"4", label:"Design pillars defined" }].map(({ num, label }, i) => (
      <>
        {i > 0 && <div key={`d${i}`} style={{ width:1, height:40, background:"rgba(255,255,255,.25)" }} />}
        <div key={num} style={{ textAlign:"center", color:"#fff" }}>
          <div style={{ fontSize:36, fontWeight:600, letterSpacing:"-.03em", lineHeight:1 }}>{num}</div>
          <div style={{ fontSize:12, opacity:.8, marginTop:4 }}>{label}</div>
        </div>
      </>
    ))}
  </div>
);

const BackgroundSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>Background</SLabel>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
      <div>
        <STitle>My first internship. A real product. Real users.</STitle>
        <SBody>
          <p>It was my second year when I landed my first UI design internship working on Liveasy — a logistics Transport Management System.</p>
          <p style={{ marginTop:16 }}>I've always been drawn to products at the intersection of complexity and clarity. My responsibility: bring clarity to complexity.</p>
        </SBody>
      </div>
      <div>
        <div style={{ borderLeft:"3px solid var(--accent)", padding:"20px 24px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--text)", lineHeight:1.7, fontStyle:"italic", marginBottom:20 }}>
          "In logistics, users don't just evaluate features — they evaluate risk. That makes trust a core usability requirement, not a visual afterthought."
          <cite style={{ display:"block", fontSize:12, color:"var(--muted)", fontStyle:"normal", marginTop:8, fontWeight:500 }}>— Core insight that shaped the redesign</cite>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { num:"01", title:"No clear value proposition", desc:"The existing homepage failed to communicate what Liveasy does within seconds" },
            { num:"02", title:"Missing trust signals", desc:"No client logos, proof points, or credibility markers for high-stakes buyers" },
            { num:"03", title:"Weak CTAs and broken flow", desc:"Users had no clear next action — the result was hesitation, not conversion" },
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

const CompAnalysis = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>01 — Research</SLabel>
    <STitle>What competitors got right.<br />And where they all fell short.</STitle>
    <SBody>Before redesigning anything, I analyzed competing logistics and TMS platforms to understand how they communicate value, trust, and differentiation.</SBody>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:40 }}>
      <div style={{ borderRadius:16, padding:28, border:"1px solid var(--border)", borderTop:"3px solid #22c55e" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", fontWeight:500, marginBottom:16, color:"#22c55e" }}>What competitors did well</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {["Clear value above the fold","Basic credibility signals like client logos","Strong sales-oriented CTAs","Feature visibility showing platform capabilities"].map(t => (
            <div key={t} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--muted)", lineHeight:1.5 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", flexShrink:0, marginTop:6 }} />{t}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderRadius:16, padding:28, border:"1px solid var(--border)", borderTop:"3px solid #ef4444" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", fontWeight:500, marginBottom:16, color:"#ef4444" }}>Where they all fell short</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {["Feature-heavy messaging over value communication","Overloaded hero sections creating cognitive overload","Generic visual language making products interchangeable","Trust treated as an afterthought"].map(t => (
            <div key={t} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--muted)", lineHeight:1.5 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", flexShrink:0, marginTop:6 }} />{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PillarsSection = () => (
  <div style={{ background:"var(--black)", padding:"80px 6%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <SLabel>02 — Design Pillars</SLabel>
      <STitle white>Every decision filtered<br />through four principles.</STitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:40 }}>
        {[
          { num:"01", h:"Clarity before aesthetics", p:"Communicate what Liveasy does within seconds. Content hierarchy redesigned to prioritize understanding first." },
          { num:"02", h:"Trust is the product", p:"In logistics, users trust a platform with real business operations. Credibility signals embedded directly into the experience." },
          { num:"03", h:"Guide, don't let users wander", p:"Clear CTAs and directional cues introduced to reduce hesitation and guide action." },
          { num:"04", h:"Good design is good business", p:"Every decision evaluated through a business lens — does this help users understand, trust, or take action?" },
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

const imgStyle: React.CSSProperties = { width:"100%", borderRadius:16, border:"1px solid var(--border)", display:"block" };

const redesignBlocks = [
  {
    label:"Section 01", title:"Hero — Setting the first impression",
    body:"The hero section was redesigned to immediately communicate what Liveasy does, who it's for, and why it matters — all within the first few seconds.",
    pills:["Clear value prop above the fold","Strong visual hierarchy","Primary + secondary CTA","Better brand positioning"],
    src:"/work/liveasy/1.png", alt:"Liveasy hero redesign",
  },
  {
    label:"Section 02", title:"Trust — Establishing credibility at scale",
    body:"By showcasing recognizable client logos and real adoption metrics, the experience moves users from curious to confident without requiring additional explanation.",
    pills:["Client logos","Adoption metrics","Social proof","Confidence building"],
    src:"/work/liveasy/2.png", alt:"Trust section redesign",
  },
  {
    label:"Section 03", title:"Features — Translating capabilities into clear value",
    body:"Instead of overwhelming users with technical depth, features were organized to highlight practical outcomes — what users gain and what problems are solved.",
    pills:["Outcome-first framing","Improved hierarchy","Feature clarity over overload"],
    src:"/work/liveasy/3.png", alt:"Features section redesign",
  },
];

const RedesignSection = () => (
  <div style={{ padding:"80px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>03 — The Redesign</SLabel>
    <STitle>Three sections.<br />Three problems solved.</STitle>
    {redesignBlocks.map(({ label, title, body, pills, src, alt }) => (
      <div key={label} style={{ marginBottom:64, paddingBottom:64, borderBottom:"1px solid var(--border)" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)", fontWeight:500, marginBottom:10 }}>{label}</div>
        <h3 style={{ fontSize:22, fontWeight:600, letterSpacing:"-.02em", marginBottom:12 }}>{title}</h3>
        <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.8, maxWidth:600, marginBottom:20 }}>{body}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
          {pills.map(p => (
            <span key={p} style={{ fontSize:12, fontWeight:500, padding:"4px 14px", borderRadius:20, background:"var(--accent-light)", color:"var(--accent)" }}>{p}</span>
          ))}
        </div>
        <img src={src} alt={alt} style={imgStyle} />
      </div>
    ))}
  </div>
);

const ReflectionSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>04 — Reflection</SLabel>
    <STitle>What designing for<br />enterprise trust taught me.</STitle>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:40 }}>
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

const NextSection = () => (
  <div style={{ background:"var(--black)", padding:"100px 6%", textAlign:"center" }}>
    <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"#444", marginBottom:16 }}>Next Case Study</div>
    <div style={{ fontSize:"clamp(36px,6vw,72px)", fontWeight:600, color:"#fff", letterSpacing:"-.04em", marginBottom:10, lineHeight:1 }}>Lighthouse AI</div>
    <div style={{ fontSize:14, color:"#555", marginBottom:36 }}>AI coaching product · Playbook feature · End-to-end design</div>
    <a href="/work/lighthouse" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:10, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>View Case Study →</a>
  </div>
);

export default function LiveasyCaseStudy() {
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
      <BackgroundSection />
      <Divider />
      <CompAnalysis />
      <Divider />
      <PillarsSection />
      <RedesignSection />
      <Divider />
      <ReflectionSection />
      <NextSection />
    </>
  );
}