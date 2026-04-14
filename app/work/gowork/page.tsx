"use client";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --blue:#60A5FA;--blue-light:#EFF6FF;--black:#0a0a0a;
    --gray:#f5f5f3;--text:#111;--muted:#666;--border:#ebebeb
  }
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
`;

const Tag = ({ label, variant }: { label: string; variant: "blue" | "gray" }) => (
  <span style={{
    display:"inline-block", fontSize:11, fontWeight:500, letterSpacing:".08em",
    textTransform:"uppercase", padding:"4px 12px", borderRadius:20,
    ...(variant === "blue"
      ? { background:"rgba(26,86,219,.25)", color:"#6ea8fe", border:"1px solid rgba(26,86,219,.3)" }
      : { background:"rgba(255,255,255,.08)", color:"#888", border:"1px solid rgba(255,255,255,.1)" })
  }}>{label}</span>
);

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".12em", color:"var(--blue)", fontWeight:500, marginBottom:16 }}>{children}</div>
);

const STitle = ({ children, white }: { children: React.ReactNode; white?: boolean }) => (
  <h2 style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:600, letterSpacing:"-.03em", lineHeight:1.15, marginBottom:20, color: white ? "#fff" : "var(--text)" }}>{children}</h2>
);

const SBody = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize:16, color:"var(--muted)", lineHeight:1.85, maxWidth:640 }}>{children}</div>
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
  <div style={{ padding:"120px 6% 80px", background:"var(--black)", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, background:"radial-gradient(circle,rgba(26,86,219,.15) 0%,transparent 70%)", pointerEvents:"none" }} />
    <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
      <Tag label="0→1 Product" variant="blue" />
      <Tag label="Job Tech · AI · 2025" variant="gray" />
      <Tag label="Designer & Builder" variant="gray" />
    </div>
    <h1 style={{ fontSize:"clamp(56px,9vw,108px)", fontWeight:600, lineHeight:.95, letterSpacing:"-.04em", color:"#fff", marginBottom:28 }}>
      GoWork<span style={{ color:"var(--blue)", display:"block" }}>Hunt smarter.<br />Not harder.</span>
    </h1>
    <p style={{ fontSize:18, color:"#888", maxWidth:580, lineHeight:1.7, marginBottom:56 }}>
      Designing and building an AI-powered job hunting platform that brings clarity and control to one of the most stressful experiences for early-career professionals.
    </p>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.08)", borderRadius:14, overflow:"hidden", maxWidth:700 }}>
      {[{ l:"Role", v:"Founding Designer & Builder" },{ l:"Timeline", v:"Jan 2025 – Present" },{ l:"Stack", v:"Figma · Next.js · OpenAI" },{ l:"Type", v:"Self-initiated" }].map(({ l, v }) => (
        <div key={l} style={{ padding:"20px 24px", background:"var(--black)" }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".1em", color:"#555", marginBottom:6, fontWeight:500 }}>{l}</div>
          <div style={{ fontSize:14, color:"#ccc", fontWeight:500 }}>{v}</div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomeBanner = () => (
  <div style={{ background:"var(--blue)", padding:"20px 6%", display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap" }}>
    {[{ num:"15", label:"User interviews conducted" },{ num:"40", label:"Survey participants" },{ num:"10", label:"Moderated usability tests" },{ num:"4", label:"Core features shipped" }].map(({ num, label }, i) => (
      <>
        {i > 0 && <div key={`div-${i}`} style={{ width:1, height:40, background:"rgba(255,255,255,.2)" }} />}
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
        <STitle>I built this because I lived the problem.</STitle>
        <SBody>
          <p>Job hunting as a student in a new city meant juggling spreadsheets, browser tabs, tailored resumes, and a constant feeling of sending applications into a void. I wasn't alone.</p>
          <p style={{ marginTop:16 }}>After talking to 15 job seekers and surveying 40 more, the same frustrations surfaced repeatedly. The jobs were out there. The process of tracking, applying, and understanding fit was completely broken.</p>
          <p style={{ marginTop:16 }}>So I built the tool I wished existed — owning the full product lifecycle as designer, researcher, and developer.</p>
        </SBody>
      </div>
      <div>
        <div style={{ borderLeft:"3px solid var(--blue)", padding:"20px 24px", background:"var(--gray)", borderRadius:"0 12px 12px 0", fontSize:15, color:"var(--text)", lineHeight:1.7, fontStyle:"italic", marginBottom:20 }}>
          "I have a whole Google Sheet just to track where I applied. It still doesn't help."
          <cite style={{ display:"block", fontSize:12, color:"var(--muted)", fontStyle:"normal", marginTop:8, fontWeight:500 }}>— Research participant, user interview</cite>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            { num:"01", title:"Lost in the process", desc:"Most users maintained 2–3 external tools just to track applications — and still felt out of control" },
            { num:"02", title:"Resume paralysis", desc:"Tailoring per role felt too slow — most sent the same resume everywhere and hoped for the best" },
            { num:"03", title:"Rejection void", desc:"Applications disappeared with no signal, no feedback — no way to improve what you couldn't see" },
            { num:"04", title:"Tab overload", desc:"A single application session averaged 5+ open tabs — LinkedIn, company site, resume, cover letter, spreadsheet" },
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

const StatsStrip = () => (
  <div style={{ display:"flex", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
    {[{ num:"15", label:"User interviews" },{ num:"40", label:"Survey participants" },{ num:"10", label:"Usability tests" },{ num:"4", label:"Core pain points" }].map(({ num, label }, i) => (
      <div key={num} style={{ flex:1, padding:"40px 6%", borderRight: i < 3 ? "1px solid var(--border)" : "none", textAlign:"center" }}>
        <div style={{ fontSize:40, fontWeight:600, color:"var(--blue)", letterSpacing:"-.03em", lineHeight:1 }}>{num}</div>
        <div style={{ fontSize:12, color:"var(--muted)", marginTop:6 }}>{label}</div>
      </div>
    ))}
  </div>
);

const ResearchSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>01 — Research</SLabel>
    <STitle>The same four problems.<br />Every single interview.</STitle>
    <SBody>I recruited early-career job seekers actively applying for roles. Sessions were 30–45 minutes, semi-structured, focused on current workflow and emotional state during the job hunt.</SBody>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16, marginTop:40 }}>
      {[
        { num:"01", h:"Chaos over clarity", p:"Most users maintained 2–3 external tools just to track applications.", q:`"I applied somewhere last week but I can't remember if it was on LinkedIn or their site."` },
        { num:"02", h:"Resume anxiety", p:"Users knew they should tailor their resume per role but found it too time-consuming.", q:`"I know I should customize it but I just don't have the time."` },
        { num:"03", h:"Invisible rejection", p:"The most emotionally draining insight: applications disappeared into a void.", q:`"I just ghost them back at this point. There's no point waiting."` },
        { num:"04", h:"Tab overload", p:"A typical session involved LinkedIn, the company site, a resume doc, cover letter template, and a spreadsheet.", q:`"My browser looks like I'm losing my mind by the time I finish one application."` },
      ].map(({ num, h, p, q }) => (
        <div key={num} style={{ background:"var(--black)", borderRadius:16, padding:28 }}>
          <div style={{ fontSize:11, color:"var(--blue)", fontWeight:600, letterSpacing:".1em", marginBottom:12 }}>{num}</div>
          <div style={{ fontSize:18, fontWeight:600, color:"#fff", marginBottom:8, lineHeight:1.3 }}>{h}</div>
          <div style={{ fontSize:13, color:"#777", lineHeight:1.7 }}>{p}</div>
          <div style={{ fontSize:12, color:"#555", fontStyle:"italic", marginTop:10, paddingTop:10, borderTop:"1px solid #1d1d1d" }}>{q}</div>
        </div>
      ))}
    </div>
  </div>
);

const GoalSection = () => (
  <div style={{ padding:"80px 0" }}>
    <div style={{ background:"var(--black)", borderRadius:24, padding:60, margin:"0 6%" }}>
      <SLabel>02 — The Goal</SLabel>
      <STitle white>One place. Full control.</STitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:36 }}>
        {[
          { num:"01", text:"Always know the status of every application" },
          { num:"02", text:"Know how your resume fits a role before you apply" },
          { num:"03", text:"Apply across sites without the repetition and copy-paste" },
        ].map(({ num, text }) => (
          <div key={num} style={{ background:"#1d1d1d", borderRadius:14, padding:24 }}>
            <div style={{ fontSize:11, color:"var(--blue)", fontWeight:600, letterSpacing:".1em", marginBottom:12 }}>{num}</div>
            <div style={{ fontSize:15, color:"#fff", fontWeight:500, lineHeight:1.5 }}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const imgStyle = { width:"100%", borderRadius:16, border:"1px solid var(--border)", display:"block" };

const features = [
  {
    tag:"Feature 01", title:"Your entire job hunt, in one view",
    body:"A centralized dashboard showing every application — company, role, status, date, and next action. No more spreadsheets.",
    insight:"Usability tests showed users checked application status most frequently right after submitting. The dashboard was designed to make that moment feel reassuring, not anxious.",
    screen: <img src="/work/gowork/1.png" alt="GoWork dashboard" style={imgStyle} />, flip:false,
  },
  {
    tag:"Feature 02", title:"Know your fit before you apply",
    body:"Paste a job description and GoWork scores how well your resume matches it — powered by OpenAI. See exactly where you're strong and where you have gaps.",
    insight:"Early testers used the score as a filter — if under 70%, they'd either improve the resume or skip the role.",
    screen: <img src="/work/gowork/2.png" alt="Match score" style={imgStyle} />, flip:true,
  },
  {
    tag:"Feature 03", title:"Up and running in under 2 minutes",
    body:"Onboarding was designed to get users to their first tracked application as fast as possible. Upload your resume and you're set.",
    insight:"The version that asked for a resume first had the highest completion rate because it reduced the number of decisions users had to make.",
    screen: <img src="/work/gowork/3.png" alt="Onboarding" style={imgStyle} />, flip:false,
  },
  {
    tag:"Feature 04", title:"Apply anywhere, without the copy-paste",
    body:"A Chrome extension that auto-fills application forms across job sites — synced to your GoWork profile.",
    insight:"The biggest complaint in testing wasn't the tracking — it was the repetition of filling the same fields on every site.",
    screen: <img src="/work/gowork/4.png" alt="Chrome extension" style={imgStyle} />, flip:true,
  },
];

const FeaturesSection = () => (
  <div style={{ padding:"80px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>03 — Solution</SLabel>
    <STitle>Four features.<br />One calm workflow.</STitle>
    {features.map(({ tag, title, body, insight, screen, flip }) => (
      <div key={tag} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", padding:"64px 0", borderBottom:"1px solid var(--border)" }}>
        {flip && screen}
        <div>
          <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".1em", color:"var(--muted)", fontWeight:500, marginBottom:12 }}>{tag}</div>
          <h3 style={{ fontSize:26, fontWeight:600, letterSpacing:"-.02em", marginBottom:14, lineHeight:1.3 }}>{title}</h3>
          <p style={{ fontSize:15, color:"var(--muted)", lineHeight:1.8, marginBottom:14 }}>{body}</p>
          <div style={{ borderLeft:"2px solid var(--blue)", padding:"10px 16px", background:"var(--gray)", borderRadius:"0 8px 8px 0", fontSize:13, color:"var(--text)", lineHeight:1.6, fontStyle:"italic" }}>{insight}</div>
        </div>
        {!flip && screen}
      </div>
    ))}
  </div>
);

const DecisionsSection = () => (
  <div style={{ background:"var(--black)", padding:"72px 6%" }}>
    <div style={{ maxWidth:1200, margin:"0 auto" }}>
      <SLabel>Key Design Decisions</SLabel>
      <STitle white>The tradeoffs that<br />shaped the product.</STitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginTop:36 }}>
        {[
          { tension:"Tension: Resume upload vs manual input", h:"Resume first, everything else second", p:"Moving the resume upload to step one cut friction immediately and raised onboarding completion.", choice:"→ Decision: Resume upload as step one" },
          { tension:"Tension: Score as number vs score as signal", h:"Show the breakdown, not just the number", p:"An 88% match score alone doesn't tell you what to fix. Showing the breakdown gave users something actionable.", choice:"→ Decision: Always show the breakdown" },
          { tension:"Tension: Auto-track vs manual logging", h:"Zero-effort tracking via extension", p:"Manual logging was the most common reason users abandoned tracking tools. Auto-tracking through the extension fixed that.", choice:"→ Decision: Automatic tracking by default" },
        ].map(({ tension, h, p, choice }) => (
          <div key={h} style={{ background:"#111", border:"1px solid #1d1d1d", borderRadius:14, padding:24 }}>
            <div style={{ fontSize:11, color:"#555", fontWeight:500, textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>{tension}</div>
            <div style={{ fontSize:14, fontWeight:600, color:"#fff", marginBottom:8 }}>{h}</div>
            <p style={{ fontSize:12, color:"#777", lineHeight:1.6 }}>{p}</p>
            <div style={{ fontSize:11, color:"var(--blue)", fontWeight:500, marginTop:10, paddingTop:10, borderTop:"1px solid #1d1d1d" }}>{choice}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProcessSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>04 — Process</SLabel>
    <STitle>From chaos to shipped.</STitle>
    <div style={{ display:"flex", alignItems:"flex-start", marginTop:40 }}>
      {[
        { n:"1", l:"Research", s:"15 interviews, survey, affinity mapping" },
        { n:"2", l:"Define", s:"Journey maps, problem framing" },
        { n:"3", l:"Design", s:"Sketches → wireframes → Figma" },
        { n:"4", l:"Test", s:"10 moderated usability tests" },
        { n:"5", l:"Ship", s:"Next.js + Supabase + OpenAI API" },
      ].map(({ n, l, s }, i) => (
        <div key={n} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", position:"relative" }}>
          {i < 4 && <div style={{ position:"absolute", top:15, left:"50%", width:"100%", height:1, background:"var(--border)", zIndex:0 }} />}
          <div style={{ width:30, height:30, borderRadius:"50%", background:"#111", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:600, marginBottom:10, position:"relative", zIndex:1, flexShrink:0 }}>{n}</div>
          <div style={{ fontSize:13, fontWeight:500, marginBottom:4 }}>{l}</div>
          <div style={{ fontSize:11, color:"var(--muted)", lineHeight:1.5, maxWidth:90 }}>{s}</div>
        </div>
      ))}
    </div>
  </div>
);

const ReflectionSection = () => (
  <div style={{ padding:"96px 6%", maxWidth:1200, margin:"0 auto" }}>
    <SLabel>05 — Reflection</SLabel>
    <STitle>What building 0→1<br />alone actually teaches you.</STitle>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginTop:40 }}>
      {[
        { n:"01", h:"Constraints sharpen decisions", p:"Wearing both designer and developer hats meant every design decision had to justify itself technically." },
        { n:"02", h:"Research earns trust", p:"Every major feature came directly from interview insights. When you can point to a real user frustration, decisions become easier to make." },
        { n:"03", h:"Shipped beats perfect", p:"Having a live product changed how I think about design tradeoffs. Good enough and shipped beats perfect and stuck in Figma." },
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
    <div style={{ fontSize:"clamp(36px,6vw,72px)", fontWeight:600, color:"#fff", letterSpacing:"-.04em", marginBottom:10, lineHeight:1 }}>Liveasy</div>
    <div style={{ fontSize:14, color:"#555", marginBottom:36 }}>UI Redesign · Logistics TMS · Trust-first design</div>
    <a href="/work/liveasy" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff", color:"#111", borderRadius:10, padding:"14px 28px", fontSize:14, fontWeight:600, textDecoration:"none" }}>View Case Study →</a>
  </div>
);

export default function GoWorkCaseStudy() {
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
      <StatsStrip />
      <ResearchSection />
      <Divider />
      <GoalSection />
      <Divider />
      <FeaturesSection />
      <Divider />
      <DecisionsSection />
      <ProcessSection />
      <Divider />
      <ReflectionSection />
      <NextSection />
    </>
  );
}