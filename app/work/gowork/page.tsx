"use client";

const css = `
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --blue:#38bdf8;--blue-dim:rgba(56,189,248,.15);--blue-border:rgba(56,189,248,.3);
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
    .r-grid-2{grid-template-columns:1fr 1fr!important;gap:12px!important}
    .r-grid-3{grid-template-columns:1fr!important;gap:16px!important}
    .r-meta{grid-template-columns:1fr 1fr!important}
    .r-pad{padding:56px 6%!important}
    .r-nav-links{display:none!important}
    .r-banner{gap:20px!important;padding:16px 6%!important}
    .r-stats{flex-direction:column!important}
  }
`;

const SLabel = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color: light ? "var(--light-muted)" : "var(--blue)", fontWeight:600, marginBottom:14 }}>{children}</div>
);
const STitle = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <h2 style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:700, letterSpacing:"-.035em", lineHeight:1.12, marginBottom:18, color: light ? "var(--light-text)" : "#fff" }}>{children}</h2>
);
const Divider = ({ dark }: { dark?: boolean }) => (
  <hr style={{ border:"none", borderTop:`1px solid ${dark ? "var(--card-border)" : "var(--light-border)"}`, margin:"0 6%" }} />
);
const imgFull: React.CSSProperties = { width:"100%", borderRadius:12, display:"block", border:"1px solid var(--light-border)" };
const imgDark: React.CSSProperties = { width:"100%", borderRadius:12, display:"block", border:"1px solid var(--card-border)" };

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

export default function GoWorkCaseStudy() {
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
          <source src="/videos/gowork.mp4" type="video/mp4" />
        </video>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,.55) 100%)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 6% 64px" }}>
          <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
            {[{t:"0→1 Product",c:"rgba(56,189,248,.25)",tc:"#7dd3fc"},{t:"Job Tech · AI · 2025",c:"rgba(255,255,255,.1)",tc:"rgba(255,255,255,.55)"},{t:"Designer & Builder",c:"rgba(255,255,255,.1)",tc:"rgba(255,255,255,.55)"}].map(({t,c,tc})=>(
              <span key={t} style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", padding:"4px 14px", borderRadius:20, background:c, color:tc, border:`1px solid ${tc}40` }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontSize:"clamp(52px,8.5vw,110px)", fontWeight:700, lineHeight:.92, letterSpacing:"-.045em", color:"#fff", marginBottom:18 }}>
            GoWork<br /><span style={{ color:"var(--blue)" }}>Hunt smarter.<br />Not harder.</span>
          </h1>
          <p style={{ fontSize:17, color:"var(--text-dim)", maxWidth:500, lineHeight:1.65, marginBottom:44, fontWeight:400 }}>
            Designing and building an AI-powered job hunting platform that brings clarity and control to one of the most stressful experiences for early-career professionals.
          </p>
          <div className="r-meta" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:14, overflow:"hidden", maxWidth:680 }}>
            {[{l:"Role",v:"Founding Designer & Builder"},{l:"Timeline",v:"Jan 2025 – Present"},{l:"Stack",v:"Figma · Next.js · OpenAI"},{l:"Type",v:"Self-initiated"}].map(({l,v})=>(
              <div key={l} style={{ padding:"18px 16px", background:"rgba(0,0,0,.35)", backdropFilter:"blur(12px)" }}>
                <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(255,255,255,.3)", marginBottom:5, fontWeight:600 }}>{l}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", fontWeight:500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OUTCOME BANNER ── */}
      <div className="r-banner" style={{ background:"var(--blue)", padding:"22px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
        {[{num:"15",label:"User interviews"},{num:"40",label:"Survey participants"},{num:"10",label:"Usability tests"},{num:"4",label:"Features shipped"}].map(({num,label},i)=>(
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
            <STitle light>I built this because I lived the problem.</STitle>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9, marginBottom:16 }}>Job hunting as a student in a new city meant juggling spreadsheets, browser tabs, tailored resumes, and a constant feeling of sending applications into a void. I wasn&apos;t alone.</p>
            <p style={{ fontSize:15, color:"var(--light-muted)", lineHeight:1.9 }}>After talking to 15 job seekers and surveying 40 more, the same frustrations surfaced repeatedly. So I built the tool I wished existed — owning the full product lifecycle as designer, researcher, and developer.</p>
          </div>
          <div>
            <div style={{ borderLeft:"3px solid var(--blue)", padding:"18px 22px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--light-text)", lineHeight:1.75, fontStyle:"italic", marginBottom:16 }}>
              &ldquo;I have a whole Google Sheet just to track where I applied. It still doesn&apos;t help.&rdquo;
              <cite style={{ display:"block", fontSize:12, color:"var(--light-muted)", fontStyle:"normal", marginTop:6, fontWeight:500 }}>— Research participant</cite>
            </div>
            {[{n:"01",t:"Lost in the process",d:"Most users maintained 2–3 external tools just to track applications — and still felt out of control"},{n:"02",t:"Resume paralysis",d:"Tailoring per role felt too slow — most sent the same resume everywhere"},{n:"03",t:"Rejection void",d:"Applications disappeared with no signal, no feedback — no way to improve"},{n:"04",t:"Tab overload",d:"A single application averaged 5+ open tabs — LinkedIn, company site, resume, cover letter, spreadsheet"}].map(({n,t,d})=>(
              <div key={n} style={{ display:"flex", gap:14, padding:"13px 16px", borderRadius:12, background:"var(--gray)", border:"1px solid var(--light-border)", marginBottom:10 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"#111", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{n}</div>
                <div><h4 style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{t}</h4><p style={{ fontSize:12, color:"var(--light-muted)", lineHeight:1.5 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESEARCH — dark ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>01 — Research</SLabel>
          <STitle>The same four problems.<br />Every single interview.</STitle>
          <p style={{ fontSize:15, color:"var(--text-dim)", maxWidth:560, lineHeight:1.9, marginBottom:44 }}>30–45 minute semi-structured sessions, focused on current workflow and emotional state during the job hunt.</p>
          <div className="r-grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[{n:"01",h:"Chaos over clarity",p:"Most users maintained 2–3 external tools just to track applications.",q:"I applied somewhere last week but I can't remember if it was on LinkedIn or their site."},{n:"02",h:"Resume anxiety",p:"Users knew they should tailor their resume but found it too time-consuming.",q:"I know I should customize it but I just don't have the time."},{n:"03",h:"Invisible rejection",p:"Applications disappeared into a void — the most emotionally draining insight.",q:"I just ghost them back at this point. There's no point waiting."},{n:"04",h:"Tab overload",p:"A typical session: LinkedIn, company site, resume doc, cover letter, spreadsheet.",q:"My browser looks like I'm losing my mind by the time I finish one application."}].map(({n,h,p,q})=>(
              <div key={n} style={{ background:"var(--card)", borderRadius:16, padding:26, border:"1px solid var(--card-border)" }}>
                <div style={{ fontSize:10, color:"var(--blue)", fontWeight:700, letterSpacing:".1em", marginBottom:10, textTransform:"uppercase" }}>{n}</div>
                <div style={{ fontSize:17, fontWeight:600, color:"#fff", marginBottom:7, lineHeight:1.3 }}>{h}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.65, marginBottom:12 }}>{p}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,.3)", fontStyle:"italic", paddingTop:12, borderTop:"1px solid var(--card-border)" }}>&ldquo;{q}&rdquo;</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GOAL ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>02 — The Goal</SLabel>
        <STitle light>One place. Full control.</STitle>
        <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:8 }}>
          {[{n:"01",t:"Always know the status of every application"},{n:"02",t:"Know how your resume fits a role before you apply"},{n:"03",t:"Apply across sites without the repetition and copy-paste"}].map(({n,t})=>(
            <div key={n} style={{ padding:"24px 22px", borderRadius:14, background:"var(--gray)", border:"1px solid var(--light-border)" }}>
              <div style={{ fontSize:10, color:"var(--blue)", fontWeight:700, letterSpacing:".1em", marginBottom:12, textTransform:"uppercase" }}>{n}</div>
              <div style={{ fontSize:15, fontWeight:600, color:"var(--light-text)", lineHeight:1.5 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── FEATURES — alternating dark/light ── */}
      {[
        {dark:true,num:"Feature 01",title:"Your entire job hunt, in one view",body:"A centralized dashboard showing every application — company, role, status, date, and next action. No more spreadsheets.",quote:"Usability tests showed users checked application status most frequently right after submitting. The dashboard was designed to make that moment feel reassuring, not anxious.",src:"/work/gowork/1.png"},
        {dark:false,num:"Feature 02",title:"Know your fit before you apply",body:"Paste a job description and GoWork scores how well your resume matches it — powered by OpenAI. See exactly where you're strong and where you have gaps.",quote:"Early testers used the score as a filter — if under 70%, they'd either improve the resume or skip the role entirely.",src:"/work/gowork/2.png"},
        {dark:true,num:"Feature 03",title:"Up and running in under 2 minutes",body:"Onboarding was designed to get users to their first tracked application as fast as possible. Upload your resume and you're set.",quote:"The version that asked for a resume first had the highest completion rate because it reduced the number of decisions users had to make.",src:"/work/gowork/3.png"},
        {dark:false,num:"Feature 04",title:"Apply anywhere, without the copy-paste",body:"A Chrome extension that auto-fills application forms across job sites — synced to your GoWork profile.",quote:"The biggest complaint in testing wasn't the tracking — it was the repetition of filling the same fields on every site.",src:"/work/gowork/4.png"},
      ].map(({dark,num,title,body,quote,src})=>(
        <div key={num} style={{ background: dark ? "var(--off-black)" : "#fff", padding:"88px 6%" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color: dark ? "rgba(255,255,255,.3)" : "var(--light-muted)", fontWeight:600, marginBottom:10 }}>{num}</div>
            <div className="r-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44, marginBottom:36 }}>
              <div>
                <h3 style={{ fontSize:"clamp(22px,2.5vw,34px)", fontWeight:700, letterSpacing:"-.03em", marginBottom:14, lineHeight:1.2, color: dark ? "#fff" : "var(--light-text)" }}>{title}</h3>
                <p style={{ fontSize:15, color: dark ? "var(--text-dim)" : "var(--light-muted)", lineHeight:1.85 }}>{body}</p>
              </div>
              <div style={{ borderLeft:`2px solid var(--blue)`, padding:"14px 18px", background: dark ? "rgba(56,189,248,.08)" : "var(--gray)", borderRadius:"0 10px 10px 0", fontSize:14, color: dark ? "rgba(255,255,255,.6)" : "var(--light-text)", lineHeight:1.75, fontStyle:"italic", alignSelf:"center" }}>
                &ldquo;{quote}&rdquo;
              </div>
            </div>
            <img src={src} alt={title} style={ dark ? imgDark : imgFull } />
          </div>
        </div>
      ))}

      {/* ── DECISIONS — dark ── */}
      <div style={{ background:"var(--off-black)", padding:"88px 6%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SLabel>Key Design Decisions</SLabel>
          <STitle>The tradeoffs that<br />shaped the product.</STitle>
          <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:40 }}>
            {[{tension:"Resume upload vs manual input",h:"Resume first, everything else second",p:"Moving the resume upload to step one cut friction immediately and raised onboarding completion.",choice:"Resume upload as step one"},{tension:"Score as number vs score as signal",h:"Show the breakdown, not just the number",p:"An 88% match score alone doesn't tell you what to fix. The breakdown gave users something actionable.",choice:"Always show the breakdown"},{tension:"Auto-track vs manual logging",h:"Zero-effort tracking via extension",p:"Manual logging was the most common reason users abandoned tracking tools. Auto-tracking fixed that.",choice:"Automatic tracking by default"}].map(({tension,h,p,choice})=>(
              <div key={h} style={{ background:"var(--card)", border:"1px solid var(--card-border)", borderRadius:14, padding:24 }}>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.3)", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>{tension}</div>
                <div style={{ fontSize:14, fontWeight:600, color:"#fff", marginBottom:8 }}>{h}</div>
                <p style={{ fontSize:12, color:"rgba(255,255,255,.45)", lineHeight:1.65, marginBottom:12 }}>{p}</p>
                <div style={{ fontSize:11, color:"var(--blue)", fontWeight:600, paddingTop:12, borderTop:"1px solid var(--card-border)" }}>→ {choice}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REFLECTION ── */}
      <div className="r-pad" style={{ padding:"88px 6%", maxWidth:1200, margin:"0 auto" }}>
        <SLabel light>Reflection</SLabel>
        <STitle light>What building 0→1<br />alone actually teaches you.</STitle>
        <div className="r-grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40 }}>
          {[{n:"01",h:"Constraints sharpen decisions",p:"Wearing both designer and developer hats meant every design decision had to justify itself technically."},{n:"02",h:"Research earns trust",p:"Every major feature came directly from interview insights. When you can point to a real user frustration, decisions become easier to make."},{n:"03",h:"Shipped beats perfect",p:"Having a live product changed how I think about design tradeoffs. Good enough and shipped beats perfect and stuck in Figma."}].map(({n,h,p})=>(
            <div key={n} style={{ border:"1px solid var(--light-border)", borderRadius:16, padding:28 }}>
              <div style={{ fontSize:40, fontWeight:700, color:"rgba(0,0,0,.06)", lineHeight:1, marginBottom:14 }}>{n}</div>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:8 }}>{h}</div>
              <p style={{ fontSize:13, color:"var(--light-muted)", lineHeight:1.7 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEXT ── */}
      <div style={{ background:"var(--black)", padding:"100px 6%", textAlign:"center" }}>
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".14em", color:"rgba(255,255,255,.25)", marginBottom:16, fontWeight:600 }}>Next Case Study</div>
        <div style={{ fontSize:"clamp(40px,6vw,80px)", fontWeight:700, color:"#fff", letterSpacing:"-.045em", marginBottom:10, lineHeight:1 }}>Liveasy</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,.35)", marginBottom:36 }}>UI Redesign · Logistics TMS · Trust-first design</div>
        <a href="/work/liveasy" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:12, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>View Case Study →</a>
      </div>
    </>
  );
}