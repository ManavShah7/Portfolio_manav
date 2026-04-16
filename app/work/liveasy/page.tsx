"use client";

import { useState } from "react";

const css = `
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --accent:#c2893a;--accent-dim:rgba(194,137,58,.15);--accent-mid:#e0aa6a;
    --black:#000;--off-black:#0a0a0a;--card:#111;--card-border:#1c1c1c;
    --white:#fff;--text-dim:rgba(255,255,255,.55);--text-muted:rgba(255,255,255,.35);
    --gray:#f5f5f3;--light-text:#111;--light-muted:#666;--light-border:#e8e8e8;
  }
  body{
    font-family:-apple-system,'SF Pro Display','SF Pro Text',BlinkMacSystemFont,'Helvetica Neue',sans-serif;
    background:#fff;color:var(--light-text);line-height:1.6;overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }
  @media(max-width:768px){
    .r-grid{grid-template-columns:1fr!important;gap:28px!important}
    .r-grid-2{grid-template-columns:1fr!important;gap:16px!important}
    .r-grid-3{grid-template-columns:1fr!important;gap:16px!important}
    .r-grid-4{grid-template-columns:1fr 1fr!important}
    .r-meta{grid-template-columns:1fr 1fr!important}
    .r-pad{padding:56px 6%!important}
    .r-nav-links{display:none!important}
    .r-banner{gap:20px!important;padding:16px 6%!important}
    .before-row{grid-template-columns:1fr!important;gap:24px!important}
    .after-row{grid-template-columns:1fr!important;gap:24px!important}
  }
`;

const SLabel = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color: light ? "var(--light-muted)" : "var(--accent)", fontWeight:600, marginBottom:14 }}>{children}</div>
);
const STitle = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:700, letterSpacing:"-.035em", lineHeight:1.12, marginBottom:18, color: light ? "var(--light-text)" : "#fff" }}>{children}</h2>
);
const Divider = ({ dark }: { dark?: boolean }) => (
  <hr style={{ border:"none", borderTop:`1px solid ${dark ? "var(--card-border)" : "var(--light-border)"}`, margin:"0 6%" }} />
);

const Nav = () => (
  <div style={{ position:"fixed", top:20, left:0, right:0, display:"flex", justifyContent:"center", zIndex:500, pointerEvents:"none" }}>
    <nav style={{ background:"rgba(255,255,255,.92)", borderRadius:50, padding:"6px 8px", display:"flex", alignItems:"center", gap:2, border:"1px solid rgba(0,0,0,.08)", boxShadow:"0 2px 20px rgba(0,0,0,.1)", backdropFilter:"blur(20px)", pointerEvents:"auto" }}>
      <div className="r-nav-links" style={{ display:"flex", alignItems:"center", gap:2 }}>
        {[{label:"About",href:"/#about"},{label:"Work",href:"/#work"},{label:"Experience",href:"/#experience"},{label:"Reflections",href:"/#reflections"}].map(l => (
          <a key={l.label} href={l.href} style={{ fontSize:13, color:"rgba(0,0,0,.5)", textDecoration:"none", padding:"7px 18px", borderRadius:40, transition:"all .2s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.color="#111";e.currentTarget.style.background="rgba(0,0,0,.04)"}}
            onMouseLeave={e=>{e.currentTarget.style.color="rgba(0,0,0,.5)";e.currentTarget.style.background="transparent"}}
          >{l.label}</a>
        ))}
      </div>
      <a href="/#contact" style={{ background:"#111", color:"#fff", fontWeight:500, padding:"7px 20px", borderRadius:40, fontSize:13, textDecoration:"none" }}
        onMouseEnter={e=>e.currentTarget.style.background="#333"}
        onMouseLeave={e=>e.currentTarget.style.background="#111"}
      >Let&apos;s Talk!</a>
    </nav>
  </div>
);

export default function LiveasyCaseStudy() {
  return (
    <>
      <style>{css}</style>
      <a href="/#work" style={{ position:"fixed", top:24, left:24, zIndex:600, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", color:"#fff", fontSize:16, width:40, height:40, borderRadius:"50%", background:"rgba(0,0,0,.5)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.12)", transition:"background .2s" }}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,.75)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,.5)"}
      >←</a>
      <Nav />

      {/* ── CINEMATIC HERO ── */}
      <div style={{ position:"relative", width:"100%", height:"100vh", overflow:"hidden", background:"#000" }}>
        <video autoPlay muted loop playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.5 }}>
          <source src="/videos/liveasy.mp4" type="video/mp4" />
        </video>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.2) 50%, rgba(0,0,0,.5) 100%)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 6% 64px" }}>
          <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
            {[{t:"UI Design Internship",c:"rgba(194,137,58,.25)",tc:"#f0c97a"},{t:"Logistics · TMS · 2024",c:"rgba(255,255,255,.1)",tc:"rgba(255,255,255,.55)"},{t:"Nexus Info",c:"rgba(255,255,255,.1)",tc:"rgba(255,255,255,.55)"}].map(({t,c,tc})=>(
              <span key={t} style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", padding:"4px 14px", borderRadius:20, background:c, color:tc, border:`1px solid ${tc}40` }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize:"clamp(52px,8.5vw,110px)", fontWeight:700, lineHeight:.92, letterSpacing:"-.045em", color:"#fff", marginBottom:18 }}>
            Liveasy<br /><span style={{ color:"var(--accent-mid)" }}>Trust is the product.</span>
          </h1>
          <p style={{ fontSize:17, color:"var(--text-dim)", maxWidth:500, lineHeight:1.65, marginBottom:44, fontWeight:400 }}>
            Redesigning the homepage of a logistics TMS — where clarity, credibility, and guided action aren&apos;t just design goals, they&apos;re core usability requirements.
          </p>
          <div className="r-meta" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:14, overflow:"hidden", maxWidth:680 }}>
            {[{l:"Role",v:"UI Design Intern"},{l:"Duration",v:"Jul – Aug 2024"},{l:"Scope",v:"Homepage redesign"},{l:"Company",v:"Nexus Info"}].map(({l,v})=>(
              <div key={l} style={{ padding:"18px 16px", background:"rgba(0,0,0,.35)", backdropFilter:"blur(12px)" }}>
                <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(255,255,255,.3)", marginBottom:5, fontWeight:600 }}>{l}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", fontWeight:500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUTCOME BANNER ── */}
      <div className="r-banner" style={{ background:"var(--accent)", padding:"22px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
        {[{num:"20%",label:"Lift in click-through rates"},{num:"6",label:"Core pages redesigned"},{num:"10+",label:"Trust signals integrated"},{num:"4",label:"Design pillars defined"}].map(({num,label},i)=>(
          <div key={num} style={{ display:"flex", alignItems:"center", gap:48 }}>
            {i>0&&<div style={{ width:1, height:36, background:"rgba(255,255,255,.25)" }}/>}
            <div style={{ textAlign:"center", color:"#fff" }}>
              <div style={{ fontSize:32, fontWeight:700, letterSpacing:"-.03em", lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:11, opacity:.75, marginTop:4, letterSpacing:".03em" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── BACKGROUND ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>Background</SLabel>
        <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
          <div>
            <STitle light>My first internship. A real product. Real users.</STitle>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:16 }}>It was my second year when I landed my first UI design internship working on Liveasy — a logistics Transport Management System.</p>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9 }}>What looked like a visual problem turned out to be a trust problem — and that realization changed everything.</p>
          </div>
          <div>
            <div style={{ borderLeft:"3px solid var(--accent)", padding:"18px 22px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--light-text)", lineHeight:1.75, fontStyle:"italic", marginBottom:16 }}>
              &ldquo;In logistics, users don&apos;t just evaluate features — they evaluate risk. That makes trust a core usability requirement, not a visual afterthought.&rdquo;
              <cite style={{ display:"block", fontSize:12, color:"var(--light-muted)", fontStyle:"normal", marginTop:6, fontWeight:500 }}>— Core insight that shaped the redesign</cite>
            </div>
            {[{n:"01",t:"No clear value proposition",d:"The homepage failed to communicate what Liveasy does within seconds"},{n:"02",t:"Missing trust signals",d:"No client logos, proof points, or credibility markers for high-stakes buyers"},{n:"03",t:"Weak CTAs and broken flow",d:"Users had no clear next action — the result was hesitation, not conversion"}].map(({n,t,d})=>(
              <div key={n} style={{ display:"flex", gap:14, padding:"13px 16px", borderRadius:12, background:"var(--gray)", border:"1px solid var(--light-border)", marginBottom:10 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"#111", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{n}</div>
                <div><h4 style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{t}</h4><p style={{ fontSize:12, color:"var(--light-muted)", lineHeight:1.5 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* ── BEFORE — dark ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>01 — The Problem</SLabel>
          <STitle>What was broken<br />before I touched it.</STitle>
          <p style={{ fontSize:15, color:"var(--text-dim)", maxWidth:580, lineHeight:1.9, marginBottom:56 }}>The existing site had no hierarchy, no trust, and no clear path for a logistics buyer to take action.</p>

          {[
            {label:"Screen 01 — Hero Section",src:"/work/liveasy/before/1.jpg",problems:["Wall of text as the hero — no headline, no value prop","No CTA — users have no clear next action above the fold","No contrast control on background photo — text barely readable","No visual hierarchy — every word carries the same weight"]},
            {label:"Screen 02 — Features Section",src:"/work/liveasy/before/2.jpg",problems:["Cartoon illustrations feel unprofessional for enterprise B2B","Zigzag layout with a dashed line creates confusion, not clarity","No trust signals — no logos, no stats, nothing to build credibility","'Why choose us?' section lists features instead of answering the question"]},
          ].map(({label,src,problems})=>(
            <div key={label} style={{ marginBottom:52 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.3)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:20 }}>{label}</div>
              <div className="before-row" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:36, alignItems:"start" }}>
                <div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)", borderRadius:6, marginBottom:10 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:"#ef4444", letterSpacing:".1em", textTransform:"uppercase" }}>⚠ Before</span>
                  </div>
                  <img src={src} alt={label} style={{ width:"100%", borderRadius:10, border:"2px solid rgba(239,68,68,.2)", display:"block" }} />
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#ef4444", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>✗ What&apos;s wrong here</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {problems.map((p,i)=>(
                      <div key={i} style={{ display:"flex", gap:12, padding:"12px 16px", borderRadius:10, background:"rgba(239,68,68,.05)", border:"1px solid rgba(239,68,68,.12)" }}>
                        <div style={{ width:22, height:22, borderRadius:6, background:"rgba(239,68,68,.15)", color:"#ef4444", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                        <p style={{ fontSize:13, color:"rgba(255,255,255,.55)", lineHeight:1.55 }}>{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RESEARCH ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>02 — Research</SLabel>
        <STitle light>What competitors got right.<br />And where they all fell short.</STitle>
        <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, maxWidth:560, marginBottom:40 }}>Before redesigning anything, I analyzed competing logistics and TMS platforms.</p>
        <div className="r-grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {[{label:"What competitors did well",color:"#22c55e",items:["Clear value above the fold","Client logos visible early","Strong primary CTA","Feature sections organized around outcomes"]},{label:"Where they all fell short",color:"#ef4444",items:["Feature-heavy messaging over value","Overloaded hero sections","Generic visual language — products felt interchangeable","Trust treated as an afterthought"]}].map(({label,color,items})=>(
            <div key={label} style={{ borderRadius:14, padding:24, border:"1px solid var(--light-border)", borderTop:`3px solid ${color}` }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", fontWeight:600, marginBottom:16, color }}>{label}</div>
              {items.map(t=>(
                <div key={t} style={{ display:"flex", gap:10, alignItems:"flex-start", fontSize:13, color:"var(--light-muted)", lineHeight:1.5, marginBottom:10 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:color, flexShrink:0, marginTop:5 }} />{t}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PILLARS — dark ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>03 — Design Pillars</SLabel>
          <STitle>Every decision filtered<br />through four principles.</STitle>
          <div className="r-grid-4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:40 }}>
            {[{n:"01",h:"Clarity before aesthetics",p:"Communicate what Liveasy does within seconds. Hierarchy redesigned to prioritize understanding first."},{n:"02",h:"Trust is the product",p:"Logistics buyers evaluate risk. Credibility signals embedded throughout the experience."},{n:"03",h:"Guide, don't let users wander",p:"One primary CTA. Clear directional hierarchy. Reduced hesitation."},{n:"04",h:"Good design is good business",p:"Every decision evaluated through a business lens — understand, trust, or act?"}].map(({n,h,p})=>(
              <div key={n} style={{ background:"var(--card)", border:"1px solid var(--card-border)", borderRadius:14, padding:22, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"var(--accent)" }} />
                <div style={{ fontSize:10, color:"var(--accent-mid)", fontWeight:700, letterSpacing:".1em", marginBottom:10, textTransform:"uppercase" }}>{n}</div>
                <div style={{ fontSize:14, fontWeight:600, color:"#fff", marginBottom:7, lineHeight:1.3 }}>{h}</div>
                <p style={{ fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REDESIGN ── */}
      {[
        {dark:false,label:"Screen 01 — New Hero",src:"/work/liveasy/after/1.jpg",changes:["Clear headline 'Connecting transporters and shifters across India' — purpose in 3 seconds","One primary CTA (Schedule a Demo) — no competing actions above the fold","Truck imagery used intentionally — visual context, not decoration","Secondary app CTAs below — hierarchy preserved"]},
        {dark:true,label:"Screen 02 — Trust & Logos",src:"/work/liveasy/after/2.jpg",changes:["Client logos from British Paints, Berger, Chryso — instant enterprise credibility","Stats strip: 500+ customers, 50,000+ downloads — proof before features","Replaced cartoon illustrations with clean feature cards","Clean grid replaces zigzag — scannable, structured, outcome-led copy"]},
        {dark:false,label:"Screen 03 — Features",src:"/work/liveasy/after/3.jpg",changes:["Six feature cards in a 3-col grid with consistent iconography","Each card leads with capability, then explains the business outcome","'How it Works' step flow gives buyers a clear mental model","Teal section creates breathing room before the footer CTA"]},
      ].map(({dark,label,src,changes})=>(
        <div key={label} style={{ background: dark ? "var(--off-black)" : "#fff", padding:"88px 6%" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ fontSize:11, fontWeight:700, color: dark ? "rgba(255,255,255,.3)" : "var(--light-muted)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:20 }}>{label}</div>
            <div className="after-row" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:36, alignItems:"start", marginBottom:0 }}>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 12px", background:"rgba(194,137,58,.15)", border:"1px solid rgba(194,137,58,.3)", borderRadius:6, marginBottom:10 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:"var(--accent)", letterSpacing:".1em", textTransform:"uppercase" }}>✓ After</span>
                </div>
                <img src={src} alt={label} style={{ width:"100%", borderRadius:10, border:`2px solid rgba(194,137,58,.2)`, display:"block" }} />
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--accent)", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>✓ What changed &amp; why</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {changes.map((c,i)=>(
                    <div key={i} style={{ display:"flex", gap:12, padding:"12px 16px", borderRadius:10, background: dark ? "rgba(194,137,58,.06)" : "rgba(194,137,58,.04)", border:`1px solid rgba(194,137,58,.12)` }}>
                      <div style={{ width:22, height:22, borderRadius:6, background:"rgba(194,137,58,.15)", color:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                      <p style={{ fontSize:13, color: dark ? "rgba(255,255,255,.55)" : "var(--light-muted)", lineHeight:1.55 }}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ── REFLECTION ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>04 — Reflection</SLabel>
          <STitle>What designing for<br />enterprise trust taught me.</STitle>
          <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40 }}>
            {[{n:"01",h:"Context changes everything",p:"Logistics buyers evaluate risk, not just features. Understanding the user's emotional context completely changed how I approached every decision."},{n:"02",h:"Competitive analysis before pixels",p:"Studying competitors before touching Figma meant I wasn't designing in a vacuum. I knew the baseline, which made it possible to deliberately go beyond it."},{n:"03",h:"Design pillars as a filter",p:'"Does this build trust?" became more useful than "does this look good?" Pillars gave every decision a reason to exist.'}].map(({n,h,p})=>(
              <div key={n} style={{ border:"1px solid var(--card-border)", borderRadius:16, padding:28 }}>
                <div style={{ fontSize:40, fontWeight:700, color:"rgba(255,255,255,.08)", lineHeight:1, marginBottom:14 }}>{n}</div>
                <div style={{ fontSize:15, fontWeight:600, color:"#fff", marginBottom:8 }}>{h}</div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.45)", lineHeight:1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEXT ── */}
      <div style={{ background:"var(--black)", padding:"100px 6%", textAlign:"center" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color:"rgba(255,255,255,.25)", marginBottom:16, fontWeight:600 }}>Next Case Study</div>
        <div style={{ fontSize:"clamp(40px,6vw,80px)", fontWeight:700, color:"#fff", letterSpacing:"-.045em", marginBottom:10, lineHeight:1 }}>Lighthouse AI</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.35)", marginBottom:36 }}>AI coaching product · Playbook feature · End-to-end design</div>
        <a href="/work/lighthouse" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:12, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>View Case Study →</a>
      </div>
    </>
  );
}