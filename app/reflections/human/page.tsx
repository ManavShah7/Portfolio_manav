'use client'
import { useState, useEffect } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--black:#0a0a0a;--text:#111;--muted:#666;--border:#ebebeb;--gray:#f5f5f3;--accent:#7C3AED;--accent-mid:#A78BFA;--accent-light:#F5F3FF}
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
  .progress-bar{position:fixed;top:0;left:0;height:2px;background:var(--accent);z-index:999;transition:width .1s linear}
  @media(max-width:768px){
    .r-grid{grid-template-columns:1fr!important;gap:32px!important}
    .r-grid-3{grid-template-columns:1fr!important;gap:16px!important}
    .r-pad{padding:60px 6%!important}
    .r-nav-links{display:none!important}
    .hero-ratio{aspect-ratio:16/9!important}
  }
`

const SLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.12em',color:'var(--accent)',fontWeight:500,marginBottom:16}}>{children}</div>
)
const Divider = () => <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'0 6%'}} />
const QuoteBlock = ({ text, cite }: { text: string; cite: string }) => (
  <div style={{borderLeft:'3px solid var(--accent)',padding:'20px 24px',background:'var(--gray)',borderRadius:'0 12px 12px 0',marginBottom:24}}>
    <p style={{fontSize:16,color:'var(--text)',lineHeight:1.75,fontStyle:'italic',marginBottom:8}}>{text}</p>
    <cite style={{display:'block',fontSize:12,color:'var(--muted)',fontStyle:'normal',fontWeight:500}}>{cite}</cite>
  </div>
)
const InsightCard = ({ num, title, body }: { num: string; title: string; body: string }) => (
  <div style={{background:'var(--gray)',border:'1px solid var(--border)',borderRadius:14,padding:24,position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'var(--accent)'}} />
    <div style={{fontSize:11,color:'var(--accent-mid)',fontWeight:600,letterSpacing:'.1em',marginBottom:8}}>{num}</div>
    <div style={{fontSize:15,fontWeight:600,color:'var(--text)',marginBottom:8,lineHeight:1.3}}>{title}</div>
    <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.65}}>{body}</p>
  </div>
)
const Nav = () => (
  <div style={{position:'fixed',top:20,left:0,right:0,display:'flex',justifyContent:'center',zIndex:500,pointerEvents:'none'}}>
    <nav style={{background:'#fff',borderRadius:50,padding:'6px 8px',display:'flex',alignItems:'center',gap:2,border:'1px solid #e0e0e0',boxShadow:'0 2px 16px rgba(0,0,0,0.06)',pointerEvents:'auto'}}>
      <div className="r-nav-links" style={{display:'flex',alignItems:'center',gap:2}}>
        {[{label:'About',href:'/#about'},{label:'Work',href:'/#work'},{label:'Experience',href:'/#experience'},{label:'Reflections',href:'/#reflections'}].map(l=>(
          <a key={l.label} href={l.href} style={{fontSize:13,color:'rgba(0,0,0,0.5)',textDecoration:'none',padding:'7px 18px',borderRadius:40,transition:'all .2s',whiteSpace:'nowrap'}}
            onMouseEnter={e=>{e.currentTarget.style.color='#111';e.currentTarget.style.background='rgba(0,0,0,0.04)'}}
            onMouseLeave={e=>{e.currentTarget.style.color='rgba(0,0,0,0.5)';e.currentTarget.style.background='transparent'}}
          >{l.label}</a>
        ))}
      </div>
      <a href="/#contact" style={{background:'#111',color:'#fff',fontWeight:500,padding:'7px 20px',borderRadius:40,fontSize:13,textDecoration:'none'}}
        onMouseEnter={e=>e.currentTarget.style.background='#333'}
        onMouseLeave={e=>e.currentTarget.style.background='#111'}
      >Let&apos;s Talk!</a>
    </nav>
  </div>
)

export default function HumanPage() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{css}</style>
      <div className="progress-bar" style={{width:`${progress}%`}} />
      <a href="/#reflections" style={{position:'fixed',top:24,left:24,zIndex:600,display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',color:'#fff',fontSize:16,width:40,height:40,borderRadius:'50%',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',transition:'background .2s'}}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(0,0,0,0.8)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(0,0,0,0.55)'}
      >←</a>
      <Nav />

      <div style={{background:'var(--black)'}}>
        <div className="hero-ratio" style={{position:'relative',width:'100%',aspectRatio:'16/7'}}>
          <video autoPlay muted loop playsInline style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}>
            <source src="/videos/human.mp4" type="video/mp4" />
          </video>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.45)'}} />
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{fontSize:'clamp(24px,4vw,56px)',fontWeight:600,color:'#fff',letterSpacing:'-.03em',textAlign:'center',padding:'0 24px'}}>&ldquo;Human Psychology and Designing&rdquo;</h1>
          </div>
        </div>
      </div>

      <div className="r-pad" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>Background</SLabel>
        <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(24px,3.5vw,44px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Psychology is already at work.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>The moment someone opens an interface, they begin reacting emotionally — before logic kicks in. Spacing, motion, copy, and feedback all shape how safe, pressured, confident, or uncertain a user feels.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,fontWeight:600}}>Design, whether we acknowledge it or not, is always guiding behavior.</p>
          </div>
          <div>
            <QuoteBlock text="Every product influences human behavior — whether that influence is intentional or not. Ignoring it does not make it go away." cite="The realization that changed how I design" />
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {num:'01',title:'Emotional before logical',desc:'Users feel before they think. The emotional reaction to spacing, color, and motion happens before any feature evaluation.'},
                {num:'02',title:'UI is signal, not decoration',desc:'Every element tells users what matters, what is safe to click, and what to ignore. Decoration is never neutral.'},
                {num:'03',title:'Accidental psychology is bad design',desc:'If you do not design the psychological impact intentionally, you still create one — just not the one you want.'},
              ].map(({num,title,desc})=>(
                <div key={num} style={{display:'flex',alignItems:'flex-start',gap:14,padding:'16px 20px',borderRadius:12,background:'var(--gray)',border:'1px solid var(--border)'}}>
                  <div style={{width:32,height:32,borderRadius:8,background:'#111',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,flexShrink:0}}>{num}</div>
                  <div><h4 style={{fontSize:14,fontWeight:600,marginBottom:2}}>{title}</h4><p style={{fontSize:13,color:'var(--muted)',lineHeight:1.5}}>{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className="r-pad" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>01 - Color and Trust</SLabel>
        <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(22px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Your colors define your idea.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Color communicates meaning instantly — urgency, success, warning, reassurance — long before a user reads a single word. Your color palette represents and defines your business and your idea.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Choosing color is not about preference. It starts with understanding the values of the company, the idea behind the product, and what it is trying to communicate.</p>
            <div style={{background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,padding:'16px 20px',fontSize:14,color:'var(--text)',lineHeight:1.7}}>
              When color is chosen with intent, it sets the emotional tone before the user takes their first action.
            </div>
          </div>
          <div style={{background:'var(--black)',borderRadius:16,padding:28}}>
            <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#555',marginBottom:20,fontWeight:500}}>Color context — same hue, different meaning</div>
            {[
              {product:'Financial app',color:'#2563eb',label:'Blue',why:'Stability, trust, calm — right signal for money.'},
              {product:'Health tracker',color:'#22c55e',label:'Green',why:'Growth, wellness, safety — matches the intent.'},
              {product:'Urgent alerts',color:'#ef4444',label:'Red',why:'Immediate attention needed — not decoration.'},
              {product:'Creative tool',color:'#A78BFA',label:'Purple',why:'Imagination, freedom, playfulness — earns it.'},
            ].map(({product,color,label,why})=>(
              <div key={product} style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}>
                <div style={{width:32,height:32,borderRadius:8,background:color,flexShrink:0}} />
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'#ddd',marginBottom:2}}>{product} — {label}</div>
                  <div style={{fontSize:11,color:'#666',lineHeight:1.4}}>{why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      <div className="r-pad" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>02 - Gamification and Pressure</SLabel>
        <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {label:'Streaks',effect:'Shifts motivation from choice to obligation. Missing one day feels like failure.',good:false},
              {label:'Forced milestones',effect:'Arbitrary checkpoints create pressure instead of natural progress.',good:false},
              {label:'Loss-based nudges',effect:'Reminding users what they will lose breeds anxiety, not loyalty.',good:false},
              {label:'Brick by brick',effect:'Small, achievable actions that compound naturally build trust that lasts longer than any reward loop.',good:true},
            ].map(({label,effect,good})=>(
              <div key={label} style={{display:'flex',gap:14,padding:'16px 20px',borderRadius:12,background:good?'rgba(34,197,94,.06)':'rgba(239,68,68,.04)',border:`1px solid ${good?'rgba(34,197,94,.15)':'rgba(239,68,68,.1)'}`}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:good?'#22c55e':'#ef4444',flexShrink:0,marginTop:6}} />
                <div>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:4,color:good?'#166534':'#991b1b'}}>{label}</div>
                  <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.5}}>{effect}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{fontSize:'clamp(22px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Progress should feel earned, not enforced.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>In one of my internships, there was a strong push toward gamification — streaks, rewards, and constant nudges. On paper, these patterns look effective. Over time, I started questioning what kind of engagement we were actually creating.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>Streaks shift motivation from choice to obligation. What begins as encouragement slowly turns into pressure.</p>
            <QuoteBlock text="Users should feel supported and not chased. Trust lasts longer than any artificial reward loop ever could." cite="What gamification taught me to avoid" />
          </div>
        </div>
      </div>

      <div style={{background:'var(--black)',padding:'80px 8%'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <SLabel>03 - Designing for Humans</SLabel>
          <h2 style={{fontSize:'clamp(24px,3.5vw,48px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:12,color:'#fff'}}>
            Respect human limits.<br />
            <span style={{color:'#444',fontStyle:'italic',fontWeight:400}}>Design around them, not against them.</span>
          </h2>
          <p style={{fontSize:15,color:'#666',lineHeight:1.85,maxWidth:580,marginBottom:48}}>People are not perfectly rational or endlessly motivated. They forget. They hesitate. They disengage. Good design does not punish this — it anticipates it and supports it.</p>
          <div className="r-grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
            <InsightCard num="01" title="Emotion precedes logic" body="Users react emotionally before evaluating rationally. Every visual decision shapes that first emotional response before features are even considered." />
            <InsightCard num="02" title="Color is never neutral" body="Color communicates intent, values, and emotion before a single word is read. Choosing it without context creates confusion instead of clarity." />
            <InsightCard num="03" title="Support, do not chase" body="Products that respect inconsistency, fatigue, and changing priorities earn long-term trust. Chasing engagement creates short-term metrics and long-term churn." />
          </div>
          <div style={{borderTop:'1px solid #1d1d1d',paddingTop:48}}>
            <SLabel>The Real Lesson</SLabel>
            <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'center'}}>
              <div>
                <h3 style={{fontSize:'clamp(20px,2.5vw,34px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.2,color:'#fff',marginBottom:16}}>That respect is what makes experiences feel human.</h3>
                <p style={{fontSize:15,color:'#666',lineHeight:1.85,marginBottom:16}}>When products are designed with psychological awareness, they guide users gently instead of forcing momentum. They reduce guilt, lower friction, and create space for users to return on their own terms.</p>
                <p style={{fontSize:15,color:'#555',lineHeight:1.85}}>Design that respects human limits does not feel like it was designed at all. It just feels right.</p>
              </div>
              <div style={{background:'#111',border:'1px solid #1d1d1d',borderRadius:16,padding:32}}>
                <div style={{fontSize:13,color:'#555',marginBottom:20,fontWeight:500,letterSpacing:'.05em'}}>Psychologically aware design produces —</div>
                {[
                  {out:'Lower guilt on re-engagement',impact:'Users return without shame'},
                  {out:'Higher long-term retention',impact:'Trust outlasts reward loops'},
                  {out:'Reduced friction at key moments',impact:'Emotional clarity guides action'},
                  {out:'Products that feel human',impact:'Respect for limits builds loyalty'},
                ].map(({out,impact})=>(
                  <div key={out} style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:14,padding:'12px 14px',background:'rgba(124,58,237,.06)',border:'1px solid rgba(124,58,237,.12)',borderRadius:8}}>
                    <div style={{width:6,height:6,borderRadius:'50%',background:'var(--accent-mid)',flexShrink:0,marginTop:5}} />
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:'#ddd',marginBottom:2}}>{out}</div>
                      <div style={{fontSize:11,color:'#666',lineHeight:1.4}}>{impact}</div>
                    </div>
                  </div>
                ))}
                <div style={{marginTop:16,textAlign:'center',fontSize:12,color:'#333',fontStyle:'italic'}}>God Bless the White Monster Energy.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{background:'var(--black)',padding:'80px 8%',borderTop:'1px solid #1a1a1a',textAlign:'center'}}>
        <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.12em',color:'#333',marginBottom:12}}>Next Reflection</div>
        <div style={{fontSize:'clamp(28px,5vw,60px)',fontWeight:600,color:'#fff',letterSpacing:'-.04em',marginBottom:8,lineHeight:1}}>Feedback vs Noise</div>
        <div style={{fontSize:14,color:'#444',marginBottom:32}}>Note 04 — Craft — 3 min read</div>
        <a href="/reflections/feedback" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#fff',color:'#111',borderRadius:10,padding:'14px 28px',fontSize:14,fontWeight:600,textDecoration:'none'}}>Read Next</a>
      </div>
    </>
  )
}