'use client'
import { useState, useEffect, useRef } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --black:#0a0a0a;--text:#111;--muted:#666;--border:#ebebeb;--gray:#f5f5f3;
    --accent:#7C3AED;--accent-mid:#A78BFA;--accent-light:#F5F3FF
  }
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
  .progress-bar{position:fixed;top:0;left:0;height:2px;background:var(--accent);z-index:999;transition:width .1s linear}
  .back-btn:hover{color:#fff!important;background:rgba(255,255,255,.1)!important}
  .nav-link:hover{color:rgba(255,255,255,.8)!important}
  .tag-accent{background:rgba(124,58,237,.2);color:#A78BFA;border:1px solid rgba(124,58,237,.3)}
  .tag-gray{background:rgba(255,255,255,.08);color:#888;border:1px solid rgba(255,255,255,.1)}
`

const Tag = ({ label, v }) => (
  <span className={v === 'accent' ? 'tag-accent' : 'tag-gray'} style={{
    display:'inline-block',fontSize:11,fontWeight:500,letterSpacing:'.08em',
    textTransform:'uppercase',padding:'4px 12px',borderRadius:20
  }}>{label}</span>
)

const SLabel = ({ children }) => (
  <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.12em',color:'var(--accent)',fontWeight:500,marginBottom:16}}>{children}</div>
)

const Divider = () => <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'0 6%'}} />

const InsightCard = ({ num, title, body }) => (
  <div style={{background:'var(--gray)',border:'1px solid var(--border)',borderRadius:14,padding:24,position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'var(--accent)'}} />
    <div style={{fontSize:11,color:'var(--accent-mid)',fontWeight:600,letterSpacing:'.1em',marginBottom:8}}>{num}</div>
    <div style={{fontSize:15,fontWeight:600,color:'var(--text)',marginBottom:8,lineHeight:1.3}}>{title}</div>
    <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.65}}>{body}</p>
  </div>
)

const QuoteBlock = ({ text, cite }) => (
  <div style={{borderLeft:'3px solid var(--accent)',padding:'20px 24px',background:'var(--gray)',borderRadius:'0 12px 12px 0',marginBottom:24}}>
    <p style={{fontSize:16,color:'var(--text)',lineHeight:1.75,fontStyle:'italic',marginBottom:8}}>{text}</p>
    <cite style={{display:'block',fontSize:12,color:'var(--muted)',fontStyle:'normal',fontWeight:500}}>{cite}</cite>
  </div>
)

const StatStrip = () => (
  <div style={{background:'var(--accent)',padding:'20px 6%',display:'flex',alignItems:'center',justifyContent:'center',gap:48,flexWrap:'wrap'}}>
    {[
      {n:'3',l:'Core design failures fixed'},
      {n:'4',l:'Design pillars applied'},
      {n:'1st',l:'Real internship insight'},
      {n:'x',l:'Business outcomes from empathy'}
    ].map(({n,l},i) => (
      <div key={n} style={{display:'flex',alignItems:'center',gap:48}}>
        {i > 0 && <div style={{width:1,height:40,background:'rgba(255,255,255,.25)'}} />}
        <div style={{textAlign:'center',color:'#fff'}}>
          <div style={{fontSize:32,fontWeight:600,letterSpacing:'-.03em',lineHeight:1}}>{n}</div>
          <div style={{fontSize:12,opacity:.8,marginTop:4}}>{l}</div>
        </div>
      </div>
    ))}
  </div>
)

const IADiagram = () => (
  <div style={{marginTop:8}}>
    <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#999',marginBottom:20,fontWeight:500}}>Before vs After</div>
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      {[
        {before:'Vague headline, no clear value', after:'Value prop understood in seconds'},
        {before:'Three CTAs competing equally', after:'One obvious primary action'},
        {before:'Features listed, no context', after:'Outcomes framed, user benefits clear'},
        {before:'No trust signals anywhere', after:'Credibility embedded throughout'},
        {before:'Footer with no closure', after:'Clear next step at every exit point'},
      ].map(({before,after},i) => (
        <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 32px 1fr',alignItems:'center',gap:0}}>
          <div style={{padding:'12px 16px',borderRadius:'8px 0 0 8px',background:'rgba(239,68,68,.06)',border:'1px solid rgba(239,68,68,.12)',borderRight:'none',fontSize:12,color:'#888',lineHeight:1.4}}>{before}</div>
          <div style={{background:'rgba(255,255,255,.04)',display:'flex',alignItems:'center',justifyContent:'center',height:'100%',fontSize:11,color:'#444'}}>&#8594;</div>
          <div style={{padding:'12px 16px',borderRadius:'0 8px 8px 0',background:'rgba(34,197,94,.06)',border:'1px solid rgba(34,197,94,.12)',borderLeft:'none',fontSize:12,color:'#bbb',lineHeight:1.4}}>{after}</div>
        </div>
      ))}
    </div>
    <div style={{marginTop:16,fontSize:12,color:'#555',fontStyle:'italic',lineHeight:1.6}}>
      Every section now answers one question and hands off to the next.
    </div>
  </div>
)

const TrustDiagram = () => (
  <div style={{marginTop:8}}>
    <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#999',marginBottom:20,fontWeight:500}}>How trust layers through the experience</div>
    <div style={{display:'flex',flexDirection:'column',gap:0}}>
      {[
        {num:'01',label:'Immediate',desc:'Brand clarity, confident headline, clean visual hierarchy.',color:'#A78BFA'},
        {num:'02',label:'Proof',desc:'Client logos, adoption stats, usage numbers that back up the claim.',color:'#22c55e'},
        {num:'03',label:'Reassurance',desc:'Features framed as outcomes, not capabilities. Support signals that say we have your back.',color:'#38bdf8'},
      ].map(({num,label,desc,color},i) => (
        <div key={num} style={{display:'flex',gap:16,alignItems:'flex-start',paddingBottom:i < 2 ? 24 : 0,marginBottom:i < 2 ? 0 : 0,position:'relative'}}>
          {i < 2 && <div style={{position:'absolute',left:15,top:32,bottom:0,width:1,background:'rgba(255,255,255,.06)'}} />}
          <div style={{width:32,height:32,borderRadius:'50%',border:`1px solid ${color}40`,background:`${color}12`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color,flexShrink:0}}>{num}</div>
          <div style={{paddingTop:4}}>
            <div style={{fontSize:14,fontWeight:600,color,marginBottom:4}}>{label}</div>
            <p style={{fontSize:13,color:'#666',lineHeight:1.65}}>{desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div style={{marginTop:24,fontSize:12,color:'#555',fontStyle:'italic',lineHeight:1.6}}>
      Trust is not a section - it is threaded through every layer.
    </div>
  </div>
)

export default function ReflectionArticle01() {
  const [progress, setProgress] = useState(0)
  const articleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{css}</style>
      <div className="progress-bar" style={{width:`${progress}%`}} />

      <a
        href="/#reflections"
        style={{position:'fixed',top:24,left:24,zIndex:600,display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',color:'#fff',fontSize:16,width:40,height:40,borderRadius:'50%',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',transition:'background .2s'}}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(0,0,0,0.8)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(0,0,0,0.55)'}
      >←</a>

      <div style={{position:'fixed',top:20,left:0,right:0,display:'flex',justifyContent:'center',zIndex:500,pointerEvents:'none'}}>
        <nav style={{background:'#fff',borderRadius:50,padding:'6px 8px',display:'flex',alignItems:'center',gap:2,border:'1px solid #e0e0e0',boxShadow:'0 2px 16px rgba(0,0,0,0.06)',pointerEvents:'auto'}}>

          {[{label:'About',href:'/#about'},{label:'Work',href:'/#work'},{label:'Experience',href:'/#experience'},{label:'Reflections',href:'/#reflections'}].map(l=>(
            <a
              key={l.label}
              href={l.href}
              style={{fontSize:13,color:'rgba(0,0,0,0.5)',textDecoration:'none',padding:'7px 18px',borderRadius:40,transition:'all .2s',whiteSpace:'nowrap'}}
              onMouseEnter={e=>{e.currentTarget.style.color='#111';e.currentTarget.style.background='rgba(0,0,0,0.04)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(0,0,0,0.5)';e.currentTarget.style.background='transparent'}}
            >{l.label}</a>
          ))}
          <a
            href="/#contact"
            style={{background:'#111',color:'#fff',fontWeight:500,padding:'7px 20px',borderRadius:40,fontSize:13,textDecoration:'none',transition:'background .2s'}}
            onMouseEnter={e=>e.currentTarget.style.background='#333'}
            onMouseLeave={e=>e.currentTarget.style.background='#111'}
          >Let&apos;s Talk!</a>
        </nav>
      </div>

      <div ref={articleRef}>

        <div style={{background:'var(--black)',padding:'0'}}>
          <div style={{position:'relative',width:'100%',aspectRatio:'16/7'}}>
            <video autoPlay muted loop playsInline style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}>
              <source src="/videos/good.mp4" type="video/mp4" />
            </video>
            <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.45)'}} />
            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <h1 style={{fontSize:'clamp(28px,4vw,56px)',fontWeight:600,color:'#fff',letterSpacing:'-.03em',textAlign:'center',padding:'0 24px',fontFamily:'inherit'}}>
                "Good Design is Good Business"
              </h1>
            </div>
          </div>
        </div>

        <div id="background" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
          <SLabel>Background</SLabel>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
            <div>
              <h2 style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>What I thought design was.</h2>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>When I first started learning UI during my undergrad, I believed good design was mostly about visual appeal - clean layouts, smooth animations, interfaces that simply looked amazing. I thought if something looked good, it was good design.</p>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>That perception began to change during my first internship at Nexus Info.</p>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85}}>As I started working on real products with real constraints, I realized design goes far beyond aesthetics. Visual appeal matters - but only when it supports clarity, intent, and impact.</p>
            </div>
            <div>
              <QuoteBlock
                text="Design is not just about how something looks - it is about how strategically those visuals guide users, reduce friction, and support real outcomes."
                cite="The shift that started everything"
              />
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[
                  {num:'01',title:'Aesthetics without intent',desc:'A beautiful interface that confuses users is still a failure. Looks cannot substitute for clear hierarchy and purpose.'},
                  {num:'02',title:'Speed without direction',desc:'Moving fast without understanding user goals creates work that looks done but achieves nothing.'},
                  {num:'03',title:'Features over outcomes',desc:'Listing capabilities tells users what exists - it does not tell them why it matters to their situation.'},
                ].map(({num,title,desc}) => (
                  <div key={num} style={{display:'flex',alignItems:'flex-start',gap:14,padding:'16px 20px',borderRadius:12,background:'var(--gray)',border:'1px solid var(--border)'}}>
                    <div style={{width:32,height:32,borderRadius:8,background:'#111',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,flexShrink:0}}>{num}</div>
                    <div>
                      <h4 style={{fontSize:14,fontWeight:600,marginBottom:2}}>{title}</h4>
                      <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.5}}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
          <SLabel>01 - The First Lesson</SLabel>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
            <div>
              <h2 style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Information Architecture is Strategy.</h2>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>During my internship at Nexus Info, I was asked to redesign the homepage for a logistics company called Liveasy. At first glance, the website seemed okay - but once I started navigating it as a user, the problems became clear.</p>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>The biggest issue was information architecture. The page was filled with scattered calls to action. Multiple CTAs competed for attention without a clear hierarchy or intent. There was no obvious primary action, no guided path.</p>
              <div style={{background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,padding:'16px 20px',fontSize:14,color:'var(--text)',lineHeight:1.7}}>
                Good information architecture is not about adding more options - it is about making the right action feel obvious.
              </div>
            </div>
            <IADiagram />
          </div>
        </div>

        <Divider />

        <div id="principles" style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
          <SLabel>02 - The Deeper Lesson</SLabel>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
            <TrustDiagram />
            <div>
              <h2 style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Credibility is a Design Responsibility.</h2>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Beyond usability, there was a deeper issue: trust.</p>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>I learned the importance of first impressions. I need to design my product in a way that wins the trust of the user interacting with it for the very first time. Users take one look and immediately judge how credible the product is.</p>
              <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>If I were a logistics manager at a large company, I would immediately ask: Why should I trust this company? What proof do they have? Who else has worked with them? If the product does not answer these instantly - it loses.</p>
              <QuoteBlock
                text="You only have one shot in winning the trust of your customers. If you fail at it, you are cooked."
                cite="What building Liveasy taught me"
              />
            </div>
          </div>
        </div>

        <div id="the-real-lesson" style={{background:'var(--black)',padding:'80px 8%'}}>
          <div style={{maxWidth:1200,margin:'0 auto'}}>
            <SLabel>03 - Core Principles</SLabel>
            <h2 style={{fontSize:'clamp(28px,3.5vw,48px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:12,color:'#fff'}}>
              Three principles.<br />
              <span style={{color:'#444',fontStyle:'italic',fontWeight:400}}>Internalized through building.</span>
            </h2>
            <p style={{fontSize:15,color:'#666',lineHeight:1.85,maxWidth:580,marginBottom:48}}>Not things I read in a design textbook - conclusions I had to arrive at myself, working on a real product under real pressure.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
              <InsightCard num="01" icon="" title="Context changes everything" body="Logistics buyers evaluate risk, not just features. Understanding the user's emotional context completely changed how I approached every design decision." />
              <InsightCard num="02" icon="" title="Competitive analysis before pixels" body="Studying competitors before touching Figma meant I was not designing in a vacuum. I knew the baseline, which made it possible to deliberately go beyond it." />
              <InsightCard num="03" icon="" title="Design pillars as a filter" body="Defining pillars before designing gave every decision a reason to exist. Does this build trust? became more useful than does this look good?" />
            </div>

            <div style={{borderTop:'1px solid #1d1d1d',paddingTop:48}}>
              <SLabel>The Real Lesson</SLabel>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'center'}}>
                <div>
                  <h3 style={{fontSize:'clamp(22px,2.5vw,34px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.2,color:'#fff',marginBottom:16}}>When UX fails, business suffers.</h3>
                  <p style={{fontSize:15,color:'#666',lineHeight:1.85,marginBottom:16}}>When design decisions are made without stepping into the user's shoes, it does not matter how beautiful your product looks - it is bound to fail.</p>
                  <p style={{fontSize:15,color:'#555',lineHeight:1.85}}>A product can look polished and still fail if it does not reduce uncertainty, guide decisions, and build confidence. Good design is not decoration - it is how businesses earn trust, reduce friction, and move users forward with clarity.</p>
                </div>
                <div style={{background:'#111',border:'1px solid #1d1d1d',borderRadius:16,padding:32}}>
                  <div style={{fontSize:13,color:'#555',marginBottom:20,fontWeight:500,letterSpacing:'.05em'}}>When design is grounded in empathy and pure intent -</div>
                  {[
                    {out:'Users understand faster',impact:'Reduces cognitive load - Higher engagement'},
                    {out:'Users trust more readily',impact:'Credibility signals - Stronger conversion'},
                    {out:'Users act with clarity',impact:'Guided flow - Lower drop-off'},
                    {out:'Business outcomes follow',impact:'Empathy-first design - Real ROI'},
                  ].map(({out,impact}) => (
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
          <div style={{fontSize:'clamp(32px,5vw,60px)',fontWeight:600,color:'#fff',letterSpacing:'-.04em',marginBottom:8,lineHeight:1}}>Clarity with<br />Controlled Velocity</div>
          <div style={{fontSize:14,color:'#444',marginBottom:32}}>Note 02 - Process - 5 min read</div>
          <a href="/reflections/clarity" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#fff',color:'#111',borderRadius:10,padding:'14px 28px',fontSize:14,fontWeight:600,textDecoration:'none'}}>Read Next</a>
        </div>

      </div>
    </>
  )
}