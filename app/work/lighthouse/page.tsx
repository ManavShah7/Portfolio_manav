"use client";

const css = `
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --green:#5a9e28;--green-dim:rgba(90,158,40,.15);--green-border:rgba(90,158,40,.3);
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
    .r-grid-3{grid-template-columns:1fr!important;gap:16px!important}
    .r-stats{grid-template-columns:1fr 1fr 1fr!important}
    .r-meta{grid-template-columns:1fr 1fr!important}
    .r-pad{padding:56px 6%!important}
    .r-nav-links{display:none!important}
    .r-banner{gap:20px!important;padding:16px 6%!important}
    .r-feature-img{order:-1}
  }
`;

const SLabel = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color: light ? "var(--light-muted)" : "var(--green)", fontWeight:600, marginBottom:14 }}>{children}</div>
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

const imgFull: React.CSSProperties = { width:"100%", borderRadius:12, display:"block", border:"1px solid var(--light-border)" };
const imgDark: React.CSSProperties = { width:"100%", borderRadius:12, display:"block", border:"1px solid var(--card-border)" };

export default function LighthouseCaseStudy() {
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
        <video autoPlay muted loop playsInline style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:.45 }}>
          <source src="/videos/lighthouse.mp4" type="video/mp4" />
        </video>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,.5) 100%)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 6% 64px" }}>
          <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
            {[{t:"Product Design Internship",c:"rgba(90,158,40,.3)",tc:"#8dc44e"},{t:"AI · Career Tech · 2025",c:"rgba(255,255,255,.1)",tc:"rgba(255,255,255,.55)"},{t:"California · Remote",c:"rgba(255,255,255,.1)",tc:"rgba(255,255,255,.55)"}].map(({t,c,tc})=>(
              <span key={t} style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", padding:"4px 14px", borderRadius:20, background:c, color:tc, border:`1px solid ${tc}40` }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize:"clamp(52px,8.5vw,110px)", fontWeight:700, lineHeight:.92, letterSpacing:"-.045em", color:"#fff", marginBottom:18 }}>
            Lighthouse AI<br /><span style={{ color:"var(--green)" }}>Clarity over noise.</span>
          </h1>
          <p style={{ fontSize:17, color:"var(--text-dim)", maxWidth:500, lineHeight:1.65, marginBottom:44, fontWeight:400 }}>
            Designing an AI-powered coaching product that turns overwhelming information into a personalized path forward.
          </p>
          <div className="r-meta" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:14, overflow:"hidden", maxWidth:680 }}>
            {[{l:"Role",v:"Product Design Intern"},{l:"Duration",v:"Feb – Jul 2025"},{l:"Scope",v:"End-to-end design"},{l:"Team",v:"Design, PM, Eng"}].map(({l,v})=>(
              <div key={l} style={{ padding:"18px 16px", background:"rgba(0,0,0,.35)", backdropFilter:"blur(12px)" }}>
                <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(255,255,255,.3)", marginBottom:5, fontWeight:600 }}>{l}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", fontWeight:500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUTCOME BANNER ── */}
      <div className="r-banner" style={{ background:"var(--green)", padding:"22px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
        {[{num:"40%",label:"Extension download increase"},{num:"5",label:"Prototypes shipped"},{num:"70+",label:"Research participants"},{num:"100s",label:"Reddit threads analyzed"}].map(({num,label},i)=>(
          <div key={num} style={{ display:"flex", alignItems:"center", gap:48 }}>
            {i>0&&<div style={{ width:1, height:36, background:"rgba(255,255,255,.2)" }}/>}
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
            <STitle light>I joined to help shape an idea that didn&apos;t fully exist yet.</STitle>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:16 }}>It was my final semester when I joined Lighthouse AI as a Product Design Intern. The mission: help people navigate their growth without drowning in information.</p>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9 }}>I designed from the inside out — as a student myself, I spoke with peers and mapped the problems I faced every day.</p>
          </div>
          <div>
            <div style={{ borderLeft:"3px solid var(--green)", padding:"18px 22px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--light-text)", lineHeight:1.75, fontStyle:"italic", marginBottom:16 }}>
              &ldquo;The problem isn&apos;t a lack of knowledge — it&apos;s a lack of direction.&rdquo;
              <cite style={{ display:"block", fontSize:12, color:"var(--light-muted)", fontStyle:"normal", marginTop:6, fontWeight:500 }}>— Core insight that shaped everything</cite>
            </div>
            {[{n:"01",t:"Information without direction",d:"Courses, blogs, videos everywhere — yet progress still felt unclear"},{n:"02",t:"Effort without visible progress",d:"Users worked hard but couldn't measure momentum"},{n:"03",t:"No personalized guidance",d:"Generic advice failed to account for individual context"}].map(({n,t,d})=>(
              <div key={n} style={{ display:"flex", gap:14, padding:"14px 18px", borderRadius:12, background:"var(--gray)", border:"1px solid var(--light-border)", marginBottom:10 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"#111", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{n}</div>
                <div><h4 style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{t}</h4><p style={{ fontSize:12, color:"var(--light-muted)", lineHeight:1.5 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* ── REDDIT / RESEARCH — dark cinematic ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>01 — Research</SLabel>
          <STitle>The insight that changed<br />everything came from Reddit.</STitle>
          <p style={{ fontSize:15, color:"var(--text-dim)", maxWidth:580, lineHeight:1.9, marginBottom:48 }}>
            Surveys and interviews told us what users said they wanted. Reddit told us what they actually felt. That distinction made all the difference.
          </p>

          <div className="r-stats" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:44 }}>
            {[{num:"50",label:"Survey responses"},{num:"20",label:"User interviews"},{num:"100s",label:"Reddit threads"}].map(({num,label})=>(
              <div key={num} style={{ background:"var(--card)", borderRadius:14, padding:"28px 24px", textAlign:"center", border:"1px solid var(--card-border)" }}>
                <div style={{ fontSize:44, fontWeight:700, color:"var(--green)", letterSpacing:"-.04em", lineHeight:1 }}>{num}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.4)", marginTop:6, letterSpacing:".04em" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ background:"var(--card)", borderRadius:20, padding:"40px 44px", border:"1px solid var(--card-border)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-100, right:-100, width:300, height:300, background:"radial-gradient(circle,rgba(90,158,40,.1) 0%,transparent 70%)", pointerEvents:"none" }} />
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:28 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"rgba(255,69,0,.15)", border:"1px solid rgba(255,69,0,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>👾</div>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(255,255,255,.4)", fontWeight:600 }}>Why Reddit was the most important data source</div>
            </div>
            <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44, marginBottom:32 }}>
              <div>
                <p style={{ fontSize:15, color:"rgba(255,255,255,.65)", lineHeight:1.9, marginBottom:16 }}>Structured interviews produce polished answers. Reddit is the opposite — raw, unfiltered, and emotionally honest.</p>
                <p style={{ fontSize:15, color:"rgba(255,255,255,.65)", lineHeight:1.9 }}>We dug through hundreds of threads across r/cscareerquestions, r/ProductManagement, r/careerguidance, and r/ExperiencedDevs. What we found wasn&apos;t a lack of resources — it was a crisis of direction.</p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[{sub:"r/cscareerquestions",q:"I've watched 40 hours of content this month and I still don't know what to do next."},{sub:"r/careerguidance",q:"Every roadmap I find is for someone else's situation, not mine."},{sub:"r/ExperiencedDevs",q:"I'm doing everything right on paper but nothing is moving."}].map(({sub,q})=>(
                  <div key={sub} style={{ padding:"16px 18px", borderRadius:12, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)" }}>
                    <div style={{ fontSize:10, color:"var(--green)", fontWeight:700, marginBottom:7, letterSpacing:".08em", textTransform:"uppercase" }}>{sub}</div>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,.65)", lineHeight:1.65, fontStyle:"italic" }}>&ldquo;{q}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding:"20px 24px", borderRadius:14, background:"rgba(90,158,40,.12)", border:"1px solid rgba(90,158,40,.25)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--green)", marginBottom:8, textTransform:"uppercase", letterSpacing:".1em" }}>The insight that changed the product direction</div>
              <p style={{ fontSize:15, color:"rgba(255,255,255,.7)", lineHeight:1.8 }}>Users weren&apos;t overwhelmed by a lack of information. They were overwhelmed by an excess of it — with no way to filter what was relevant to <em>their</em> specific situation. That shifted everything: from building an information product to building a <strong style={{ color:"#fff" }}>personalization engine</strong>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPLORE USE CASES ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>02 — Explore Use Cases</SLabel>
        <div style={{ maxWidth:760 }}>
          <STitle light>Users didn&apos;t know what to ask for.<br /><span style={{ color:"var(--light-muted)", fontWeight:300, fontStyle:"italic" }}>So we showed them first.</span></STitle>
          <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:20 }}>One pattern kept surfacing in Reddit threads — users would open Lighthouse, see an empty chat, and freeze. Not because the product was unclear, but because they didn&apos;t yet have language for their own goal.</p>
          <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:28 }}>Explore Use Cases lived on the dashboard as a direct response. Before committing to a conversation, users could browse real scenarios and see how Lighthouse approaches each one — what context it needs, what output to expect. Not a feature tour. A trust-building mechanism.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ padding:"18px 20px", borderRadius:12, background:"var(--gray)", border:"1px solid var(--light-border)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--green)", marginBottom:6, textTransform:"uppercase", letterSpacing:".08em" }}>Design intent</div>
              <p style={{ fontSize:13, color:"var(--light-text)", lineHeight:1.65 }}>Show users what Lighthouse can do for someone exactly like them — before typing a single word.</p>
            </div>
            <div style={{ padding:"18px 20px", borderRadius:12, background:"rgba(90,158,40,.06)", border:"1px solid rgba(90,158,40,.2)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--green)", marginBottom:6, textTransform:"uppercase", letterSpacing:".08em" }}>Outcome</div>
              <p style={{ fontSize:13, color:"var(--light-muted)", lineHeight:1.65 }}>Users who browsed first provided richer onboarding context — generating more accurate playbooks. Feature was later removed from the product.</p>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── EXTENSION DOWNLOADS — dark ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>03 — Increasing Extension Downloads</SLabel>
          <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
            <div>
              <STitle>The extension existed.<br /><span style={{ color:"rgba(255,255,255,.35)", fontWeight:300, fontStyle:"italic" }}>Nobody knew to install it.</span></STitle>
              <p style={{ fontSize:15, color:"var(--text-dim)", lineHeight:1.9, marginBottom:18 }}>The Chrome extension was already built and working. The problem was discoverability — users got value from the web app but never connected the dots that the extension made it significantly more powerful.</p>
              <p style={{ fontSize:15, color:"var(--text-dim)", lineHeight:1.9, marginBottom:28 }}>I audited the entire onboarding and product flow, identified highest-intent moments, and placed strategically timed nudges there — not on a buried settings page, but exactly when users could feel the friction the extension solves.</p>
              <div style={{ borderLeft:"3px solid var(--green)", padding:"14px 18px", background:"rgba(255,255,255,.04)", borderRadius:"0 10px 10px 0", fontSize:14, color:"rgba(255,255,255,.7)", lineHeight:1.75, fontStyle:"italic", marginBottom:24 }}>
                &ldquo;A nudge at the right moment is a feature. A nudge at the wrong moment is noise.&rdquo;
              </div>
              <div style={{ padding:"18px 22px", borderRadius:12, background:"rgba(90,158,40,.1)", border:"1px solid rgba(90,158,40,.25)" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--green)", marginBottom:6, textTransform:"uppercase", letterSpacing:".08em" }}>Result</div>
                <p style={{ fontSize:14, color:"var(--text-dim)", lineHeight:1.7 }}>40% increase in extension downloads. The extension didn&apos;t change — the timing and placement of the ask did.</p>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                {moment:"After completing a playbook",nudge:"In-app banner: 'Your extension can track your progress automatically'",why:"Highest moment of intent — user just saw the value of structure.",timing:"High intent",color:"#4ade80"},
                {moment:"Onboarding — final step",nudge:"Prompt: 'Add the extension to make this automatic'",why:"User is already in setup mode. One more step feels natural.",timing:"Activation",color:"var(--green)"},
                {moment:"Manual activity logging",nudge:"Tooltip: 'The extension does this for you automatically'",why:"Intercept the friction in real time — show the solution at the exact moment they feel it.",timing:"Pain point",color:"#fbbf24"},
              ].map(({moment,nudge,why,timing,color})=>(
                <div key={moment} style={{ padding:"18px 20px", borderRadius:14, border:"1px solid var(--card-border)", background:"var(--card)", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, bottom:0, width:3, background:color }} />
                  <div style={{ paddingLeft:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"#fff", lineHeight:1.3 }}>{moment}</div>
                      <span style={{ fontSize:10, fontWeight:700, color:color, background:`${color}18`, border:`1px solid ${color}30`, padding:"2px 10px", borderRadius:20, whiteSpace:"nowrap", flexShrink:0 }}>{timing}</span>
                    </div>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,.4)", fontStyle:"italic", marginBottom:8 }}>&ldquo;{nudge}&rdquo;</div>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", lineHeight:1.55 }}>{why}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ENGAGEMENT RETENTION ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>04 — Maintaining Engagement</SLabel>
        <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"start" }}>
          <div>
            <STitle light>Installed doesn&apos;t mean active.<br /><span style={{ color:"var(--light-muted)", fontWeight:300, fontStyle:"italic" }}>The extension was the answer.</span></STitle>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:18 }}>After downloads went up, a new problem surfaced. Users installed the extension, used Lighthouse for a bit, then quietly drifted away. The extension sat idle in their browser toolbar — present but ignored.</p>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:18 }}>I realized the extension icon was the most underused asset in the entire product. Every user who installed it had a permanent Lighthouse presence living in their browser — on every tab, every session, every day. A re-entry point nobody was using.</p>
            <div style={{ padding:"18px 22px", borderRadius:12, background:"var(--gray)", border:"1px solid var(--light-border)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--green)", marginBottom:6, textTransform:"uppercase", letterSpacing:".08em" }}>The insight</div>
              <p style={{ fontSize:14, color:"var(--light-text)", lineHeight:1.7 }}>The extension isn&apos;t just a tracking tool. It&apos;s the only surface Lighthouse has outside its own product — making it the most powerful re-engagement channel available.</p>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              {trigger:"Day 3 of no platform activity",action:"Extension icon badge + browser notification fires",design:"Passive presence becomes active signal. The icon that was ignored becomes the thing that pulls you back.",color:"#60a5fa"},
              {trigger:"Playbook milestone approaching",action:"Extension popup: 'You're 60% through week 2'",design:"Surfaces momentum — users see how far they've come, not how far they have to go.",color:"var(--green)"},
              {trigger:"User visits job boards or courses",action:"Extension detects context and surfaces a playbook nudge",design:"Connects real-world behavior to the plan — makes Lighthouse feel ambient, not something you have to remember to open.",color:"#a78bfa"},
            ].map(({trigger,action,design,color})=>(
              <div key={trigger} style={{ padding:"18px 20px", borderRadius:14, border:"1px solid var(--light-border)", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, bottom:0, width:3, background:color }} />
                <div style={{ paddingLeft:14 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:color, textTransform:"uppercase", letterSpacing:".08em", marginBottom:7 }}>Trigger: {trigger}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--light-text)", marginBottom:7 }}>{action}</div>
                  <div style={{ fontSize:12, color:"var(--light-muted)", lineHeight:1.6, fontStyle:"italic" }}>{design}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* ── FEATURES — dark ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>05 — Feature Breakdown</SLabel>
          <STitle>Three features.<br />One coherent system.</STitle>

          {[
            {num:"Feature 01",title:"Chat-Based Onboarding",sub:"Context first. Direction second.",body:"Instead of forms and dropdowns, Navi opens a conversation. It asks about your background, current role, goals, and timeline — building a rich context profile before generating anything.",quote:"The redesigned onboarding flow drove a 40% increase in downloads. Getting context through conversation felt natural — not like filling out a form.",src:"/work/lighthouse/1.png"},
            {num:"Feature 02",title:"Playbook Generation",sub:"A personalized roadmap, not generic advice.",body:"Based on the context gathered in onboarding, Lighthouse AI generates a structured, week-by-week playbook tailored to your specific goals — what to do, in what order, and why it matters for your situation.",quote:"The same goal — break into product design — produces completely different playbooks for a CS grad vs a career switcher. Context is everything.",src:"/work/lighthouse/2.png"},
            {num:"Feature 03",title:"Chrome Extension",sub:"Passive accountability. Active alignment.",body:"The Chrome extension logs relevant activity in the background — courses watched, articles read, tools used — and cross-references it against your playbook to surface whether you're on track or drifting.",quote:"Most productivity tools require manual input. The extension removes that friction entirely — it just watches and reports back.",src:"/work/lighthouse/3.png"},
          ].map(({num,title,sub,body,quote,src},i)=>(
            <div key={num} style={{ paddingTop:64, paddingBottom:64, borderBottom: i<2 ? "1px solid var(--card-border)" : "none" }}>
              <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color:"rgba(255,255,255,.3)", fontWeight:600, marginBottom:10 }}>{num} — {title}</div>
              <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44, marginBottom:36 }}>
                <div>
                  <h3 style={{ fontSize:"clamp(22px,2.5vw,32px)", fontWeight:700, letterSpacing:"-.03em", marginBottom:14, lineHeight:1.2, color:"#fff" }}>{sub}</h3>
                  <p style={{ fontSize:15, color:"var(--text-dim)", lineHeight:1.85 }}>{body}</p>
                </div>
                <div style={{ borderLeft:"2px solid var(--green)", padding:"14px 18px", background:"rgba(90,158,40,.08)", borderRadius:"0 10px 10px 0", fontSize:14, color:"rgba(255,255,255,.65)", lineHeight:1.75, fontStyle:"italic", alignSelf:"center" }}>
                  &ldquo;{quote}&rdquo;
                </div>
              </div>
              <img src={src} alt={title} style={imgDark} />
            </div>
          ))}
        </div>
      </div>

      {/* ── IMPACT ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>06 — Impact</SLabel>
        <STitle light>What shipped.<br />What changed.</STitle>
        <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40 }}>
          {[{num:"40%",label:"Increase in AI extension downloads after redesigning onboarding"},{num:"5",label:"High-fidelity prototypes shipped across Playbook, onboarding, and coaching flows"},{num:"70+",label:"Research participants across surveys, interviews, and usability tests"}].map(({num,label})=>(
            <div key={num} style={{ border:"1px solid var(--light-border)", borderRadius:16, padding:28, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"var(--green)" }} />
              <div style={{ fontSize:48, fontWeight:700, color:"var(--green)", letterSpacing:"-.04em", lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:13, color:"var(--light-muted)", marginTop:8, lineHeight:1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── REFLECTION ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>07 — Reflection</SLabel>
          <STitle>What this internship<br />taught me about design.</STitle>
          <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40 }}>
            {[{n:"01",h:"Research changes what you design",p:"Reddit taught me that unfiltered conversations reveal more than structured interviews alone. The insight that timing and tone matter as much as content completely changed how we designed Navi."},{n:"02",h:"Systems before screens",p:"Designing the Input → Interpretation → Direction → Feedback loop before touching Figma meant every screen had a clear reason to exist."},{n:"03",h:"Advocacy is part of the job",p:"Presenting research findings to PMs and engineering leadership — not just handing off screens — was where design actually shaped the roadmap."}].map(({n,h,p})=>(
              <div key={n} style={{ border:"1px solid var(--card-border)", borderRadius:16, padding:28 }}>
                <div style={{ fontSize:40, fontWeight:700, color:"rgba(255,255,255,.08)", lineHeight:1, marginBottom:14 }}>{n}</div>
                <div style={{ fontSize:15, fontWeight:600, color:"#fff", marginBottom:8 }}>{h}</div>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.7 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEXT ── */}
      <div style={{ background:"var(--black)", padding:"100px 6%", textAlign:"center" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color:"rgba(255,255,255,.25)", marginBottom:16, fontWeight:600 }}>Next Case Study</div>
        <div style={{ fontSize:"clamp(40px,6vw,80px)", fontWeight:700, color:"#fff", letterSpacing:"-.045em", marginBottom:10, lineHeight:1 }}>GoWork</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.35)", marginBottom:36 }}>0→1 product · AI-powered job hunting · Built and designed solo</div>
        <a href="/work/gowork" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:12, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none", letterSpacing:"-.01em" }}>View Case Study →</a>
      </div>
    </>
  );
}