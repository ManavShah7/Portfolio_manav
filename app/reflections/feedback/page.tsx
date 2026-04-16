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

export default function FeedbackPage() {
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
            <source src="/videos/feedback.mp4" type="video/mp4" />
          </video>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.45)'}} />
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{fontSize:'clamp(24px,4vw,56px)',fontWeight:600,color:'#fff',letterSpacing:'-.03em',textAlign:'center',padding:'0 24px'}}>&ldquo;Feedback vs Noise&rdquo;</h1>
          </div>
        </div>
      </div>

      <div className="r-pad" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>Background</SLabel>
        <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(24px,3.5vw,44px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Not all input is equal.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Early on, I treated all input equally. If someone had an opinion, I assumed it deserved the same weight as everything else. Over time, I realized that this approach creates confusion instead of clarity.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:20}}>Designing in isolation is risky. Collaboration introduces perspectives you would not reach on your own — it uncovers blind spots, challenges assumptions, and surfaces better alternatives early on.</p>
            <div style={{background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,padding:'16px 20px',fontSize:14,color:'var(--text)',lineHeight:1.7}}>
              The challenge is not avoiding input. It is knowing how to interpret it.
            </div>
          </div>
          <div>
            <QuoteBlock text="Good collaboration shifts conversations from who is right to what works best. When ideas are discussed openly, decisions become stronger and easier to stand behind." cite="Why collaboration is not optional" />
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {num:'01',title:'Feedback helps refine',desc:'Rooted in user context and real friction. Points toward an underlying issue worth examining, even when critical.'},
                {num:'02',title:'Noise distracts',desc:'Loud but shallow. Driven by personal preference or opinions detached from the product intent.'},
                {num:'03',title:'Urgency does not equal importance',desc:'Noise feels urgent. The difference is not how strongly something is said — it is how deeply it is grounded.'},
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
        <SLabel>01 - How to Tell Them Apart</SLabel>
        <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(22px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Three questions I always ask.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>Differentiating between feedback and noise requires judgment. I slow down and run every piece of input through the same filter before acting on it.</p>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {[
                {q:'Who is this coming from?',why:'Context about the source determines how much weight the input carries.'},
                {q:'What problem are they actually experiencing?',why:'Real friction points to a real issue. Preference alone does not.'},
                {q:'Does this align with the core goal of the product?',why:'If the input pulls away from the core intent, it is almost always noise.'},
              ].map(({q,why},i)=>(
                <div key={i} style={{padding:'16px 20px',borderRadius:12,background:'var(--gray)',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:6,color:'var(--text)'}}>{q}</div>
                  <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.5}}>{why}</p>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,padding:'16px 20px',fontSize:14,color:'var(--text)',lineHeight:1.7}}>
              If a comment reveals friction or misunderstanding, it is worth exploring. If it introduces preference without purpose, it is usually noise.
            </div>
          </div>
          <div>
            <div style={{background:'var(--black)',borderRadius:16,padding:28}}>
              <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#555',marginBottom:20,fontWeight:500}}>Feedback vs Noise — at a glance</div>
              {[
                {label:'Feedback',traits:['Rooted in user context','Points to a real friction','Aligns with product goals','Worth exploring even if critical'],color:'#22c55e'},
                {label:'Noise',traits:['Driven by personal preference','Isolated or edge-case scenario','Detached from product intent','Feels urgent, lacks grounding'],color:'#ef4444'},
              ].map(({label,traits,color})=>(
                <div key={label} style={{marginBottom:20}}>
                  <div style={{fontSize:11,color,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',marginBottom:10}}>{label}</div>
                  {traits.map(t=>(
                    <div key={t} style={{display:'flex',gap:10,alignItems:'flex-start',fontSize:12,color:'rgba(255,255,255,.5)',lineHeight:1.5,marginBottom:6}}>
                      <div style={{width:5,height:5,borderRadius:'50%',background:color,flexShrink:0,marginTop:5}} />{t}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className="r-pad" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>02 - Protecting the Core</SLabel>
        <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div style={{background:'var(--black)',borderRadius:16,padding:28}}>
            <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#555',marginBottom:20,fontWeight:500}}>What happens when noise wins</div>
            {[
              {stage:'01',label:'Every opinion becomes a change',effect:'Products lose coherence as unfiltered input shapes decisions.'},
              {stage:'02',label:'Interfaces become cluttered',effect:'Flows grow complex, clarity fades, and the core intent gets buried.'},
              {stage:'03',label:'Each change seems reasonable',effect:'But together they dilute the experience until nothing feels intentional.'},
              {stage:'04',label:'The IDEA gets lost',effect:'The original purpose — the thing worth protecting — disappears under noise.'},
            ].map(({stage,label,effect})=>(
              <div key={stage} style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}>
                <div style={{fontSize:11,color:'var(--accent-mid)',fontWeight:600,minWidth:20}}>{stage}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'#ddd',marginBottom:3}}>{label}</div>
                  <div style={{fontSize:11,color:'#666',lineHeight:1.4}}>{effect}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{fontSize:'clamp(22px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Protecting the core experience.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Designing well means protecting the primary user, the primary flow, and the primary intent. Saying no thoughtfully is just as important as saying yes.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>When every opinion turns into a change, products lose coherence. Each decision might make sense on its own, but together they dilute the experience.</p>
            <QuoteBlock text="Saying no thoughtfully is just as important as saying yes. The only thing that truly matters is protecting the idea." cite="What noise taught me to defend against" />
          </div>
        </div>
      </div>

      <div style={{background:'var(--black)',padding:'80px 8%'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <SLabel>03 - The Takeaway</SLabel>
          <h2 style={{fontSize:'clamp(24px,3.5vw,48px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:12,color:'#fff'}}>
            Three things separating feedback from noise.<br />
            <span style={{color:'#444',fontStyle:'italic',fontWeight:400}}>Learned through getting it wrong first.</span>
          </h2>
          <p style={{fontSize:15,color:'#666',lineHeight:1.85,maxWidth:580,marginBottom:48}}>Filtering input is not about dismissing people. It is about being honest about what actually serves the product and the user.</p>
          <div className="r-grid-3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
            <InsightCard num="01" title="Context determines weight" body="Feedback from someone experiencing real friction carries more weight than an opinion from someone who never used the product." />
            <InsightCard num="02" title="Synthesis over reaction" body="Acting on every piece of input is reactive. Good design decisions come from patterns across multiple inputs." />
            <InsightCard num="03" title="Protect the idea" body="The core experience is the most important thing to protect. Noise dilutes it. Feedback refines it. Knowing the difference is the skill." />
          </div>
          <div style={{borderTop:'1px solid #1d1d1d',paddingTop:48}}>
            <SLabel>The Real Lesson</SLabel>
            <div className="r-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'center'}}>
              <div>
                <h3 style={{fontSize:'clamp(20px,2.5vw,34px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.2,color:'#fff',marginBottom:16}}>Good design decisions come from synthesis, not reaction.</h3>
                <p style={{fontSize:15,color:'#666',lineHeight:1.85,marginBottom:16}}>Not everything that comes back from collaboration is feedback. Some of it is noise. Learning to tell the difference is what separates reactive design from intentional design.</p>
                <p style={{fontSize:15,color:'#555',lineHeight:1.85}}>Every change that dilutes the experience is a brick you have to remove later.</p>
              </div>
              <div style={{background:'#111',border:'1px solid #1d1d1d',borderRadius:16,padding:32}}>
                <div style={{fontSize:13,color:'#555',marginBottom:20,fontWeight:500,letterSpacing:'.05em'}}>When you filter well —</div>
                {[
                  {out:'Fewer contradictory changes',impact:'Coherence stays intact'},
                  {out:'Stronger design decisions',impact:'Grounded in real user context'},
                  {out:'Faster reviews',impact:'Less back-and-forth on preference'},
                  {out:'The idea survives',impact:'Core experience protected through iteration'},
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
        <div style={{fontSize:'clamp(28px,5vw,60px)',fontWeight:600,color:'#fff',letterSpacing:'-.04em',marginBottom:8,lineHeight:1}}>Dots to Decisions</div>
        <div style={{fontSize:14,color:'#444',marginBottom:32}}>Note 05 — Research — 5 min read</div>
        <a href="/reflections/dots" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#fff',color:'#111',borderRadius:10,padding:'14px 28px',fontSize:14,fontWeight:600,textDecoration:'none'}}>Read Next</a>
      </div>
    </>
  )
}