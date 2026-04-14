'use client'
import { useState, useEffect } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --black:#0a0a0a;--text:#111;--muted:#666;--border:#ebebeb;--gray:#f5f5f3;
    --accent:#7C3AED;--accent-mid:#A78BFA;--accent-light:#F5F3FF
  }
  body{font-family:'DM Sans',system-ui,sans-serif;background:#fff;color:var(--text);line-height:1.6;overflow-x:hidden}
  .progress-bar{position:fixed;top:0;left:0;height:2px;background:var(--accent);z-index:999;transition:width .1s linear}
`
const SLabel = ({ children }: { children: React.ReactNode }) => (  
  <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.12em',color:'var(--accent)',fontWeight:500,marginBottom:16}}>{children}</div>
)

const Divider = () => <hr style={{border:'none',borderTop:'1px solid var(--border)',margin:'0 6%'}} />

const QuoteBlock = ({ text, cite }) => (
  <div style={{borderLeft:'3px solid var(--accent)',padding:'20px 24px',background:'var(--gray)',borderRadius:'0 12px 12px 0',marginBottom:24}}>
    <p style={{fontSize:16,color:'var(--text)',lineHeight:1.75,fontStyle:'italic',marginBottom:8}}>{text}</p>
    <cite style={{display:'block',fontSize:12,color:'var(--muted)',fontStyle:'normal',fontWeight:500}}>{cite}</cite>
  </div>
)

const InsightCard = ({ num, title, body }) => (
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
      {[{label:'About',href:'/#about'},{label:'Work',href:'/#work'},{label:'Experience',href:'/#experience'},{label:'Reflections',href:'/#reflections'}].map(l=>(
        <a key={l.label} href={l.href} style={{fontSize:13,color:'rgba(0,0,0,0.5)',textDecoration:'none',padding:'7px 18px',borderRadius:40,transition:'all .2s',whiteSpace:'nowrap'}}
          onMouseEnter={e=>{e.currentTarget.style.color='#111';e.currentTarget.style.background='rgba(0,0,0,0.04)'}}
          onMouseLeave={e=>{e.currentTarget.style.color='rgba(0,0,0,0.5)';e.currentTarget.style.background='transparent'}}
        >{l.label}</a>
      ))}
      <a href="/#contact" style={{background:'#111',color:'#fff',fontWeight:500,padding:'7px 20px',borderRadius:40,fontSize:13,textDecoration:'none'}}
        onMouseEnter={e=>e.currentTarget.style.background='#333'}
        onMouseLeave={e=>e.currentTarget.style.background='#111'}
      >Let&apos;s Talk!</a>
    </nav>
  </div>
)

export default function ClarityPage() {
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

      {/* hero video */}
      <div style={{background:'var(--black)',padding:'0'}}>
        <div style={{position:'relative',width:'100%',aspectRatio:'16/7'}}>
          <video autoPlay muted loop playsInline style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}>
            <source src="/videos/clarity.mp4" type="video/mp4" />
          </video>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.45)'}} />
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{fontSize:'clamp(28px,4vw,56px)',fontWeight:600,color:'#fff',letterSpacing:'-.03em',textAlign:'center',padding:'0 24px',fontFamily:'inherit'}}>
              "Clarity with Controlled Velocity"
            </h1>
          </div>
        </div>
      </div>

      {/* section 01 */}
      <div style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>Background</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Depth builds the foundation.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>In my journey, I learned that the deeper you go, the stronger the foundation of a product becomes. Speed can help teams move forward, but clarity determines whether what is being built can actually stand.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Products created without depth often appear complete, yet struggle the moment real users interact with them.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,fontWeight:600,color:'var(--text)'}}>Velocity without depth does not create momentum, it creates fragility.</p>
          </div>
          <div>
            <QuoteBlock
              text="Clarity determines whether what is being built can actually stand. Speed without it is just controlled chaos."
              cite="The core tension I keep coming back to"
            />
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {num:'01',title:'Moving fast without depth',desc:'Products that skip depth look complete but collapse the moment real users interact with edge cases and friction points.'},
                {num:'02',title:'Speed masking misalignment',desc:'Velocity feels productive. But if the direction is wrong, moving faster only compounds the mistake.'},
                {num:'03',title:'Clarity as the missing layer',desc:'Most teams optimize for output. Clarity is what makes that output actually usable and trustworthy.'},
              ].map(({num,title,desc})=>(
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

      {/* section 02 */}
      <div style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>01 - Slowing Down</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Thinking better by moving slower.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>When I need to truly understand a problem, I step away from the screen and open a notebook. It forces focus. I start by identifying every type of user who might interact with the product - not just ideal or frequent users, but first-time users, hesitant users, and those navigating with uncertainty.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>I map out each small step they might take. Every decision point, every possible hesitation, every moment where friction could appear. For each step, I ask what the product should do next and whether that action feels supportive or confusing.</p>
            <div style={{background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,padding:'16px 20px',fontSize:14,color:'var(--text)',lineHeight:1.7}}>
              The goal is not to over-control the experience - it is to be prepared for every action a user might take.
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {step:'01',label:'Map every user type',desc:'Not just the happy path user. First-timers, hesitant users, confused users - all of them.'},
              {step:'02',label:'Trace each micro-step',desc:'Every click, every scroll, every moment where the user has to make a decision.'},
              {step:'03',label:'Ask what the product does next',desc:'At each decision point - does the product support or confuse? Guide or abandon?'},
              {step:'04',label:'Anticipate before reacting',desc:'Designs must be anticipatory, not reactive. Edge cases planned, not patched.'},
            ].map(({step,label,desc})=>(
              <div key={step} style={{display:'flex',gap:16,alignItems:'flex-start',padding:'16px 20px',borderRadius:12,background:'var(--gray)',border:'1px solid var(--border)'}}>
                <div style={{fontSize:11,color:'var(--accent-mid)',fontWeight:600,minWidth:24}}>{step}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{label}</div>
                  <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.5}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* section 03 */}
      <div style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>02 - Anticipation</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Strong products anticipate. They do not react.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>When you anticipate what a user might do next, you are not trying to control them. You are removing the moments where they can hesitate, get stuck, or lose trust. That benefits both the user and the business - users reach their goal frictionlessly, and the product earns confidence instead of forcing it.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>Because when clarity is built in upfront, velocity becomes controlled. Teams move faster with fewer surprises, less rework, and decisions that do not collapse under real-world use.</p>
            <QuoteBlock
              text="Speed matters, but only when it is guided by understanding. Clarity gives velocity purpose."
              cite="What controlled velocity actually means"
            />
          </div>
          <div>
            <div style={{background:'var(--black)',borderRadius:16,padding:28}}>
              <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#555',marginBottom:20,fontWeight:500}}>Reactive vs Anticipatory design</div>
              {[
                {type:'Reactive',items:['Patches friction after users complain','Designs for the happy path only','Discovers edge cases in production'],color:'#ef4444'},
                {type:'Anticipatory',items:['Maps friction before a user hits it','Designs for every user type upfront','Discovers edge cases in planning'],color:'#22c55e'},
              ].map(({type,items,color})=>(
                <div key={type} style={{marginBottom:16}}>
                  <div style={{fontSize:11,color,fontWeight:600,letterSpacing:'.08em',textTransform:'uppercase',marginBottom:10}}>{type}</div>
                  {items.map(item=>(
                    <div key={item} style={{display:'flex',gap:10,alignItems:'flex-start',fontSize:12,color:'rgba(255,255,255,.5)',lineHeight:1.5,marginBottom:6}}>
                      <div style={{width:5,height:5,borderRadius:'50%',background:color,flexShrink:0,marginTop:5}} />{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* dark section */}
      <div style={{background:'var(--black)',padding:'80px 8%'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <SLabel>03 - The Takeaway</SLabel>
          <h2 style={{fontSize:'clamp(28px,3.5vw,48px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:12,color:'#fff'}}>
            Three things clarity taught me.<br />
            <span style={{color:'#444',fontStyle:'italic',fontWeight:400}}>Learned through building, not reading.</span>
          </h2>
          <p style={{fontSize:15,color:'#666',lineHeight:1.85,maxWidth:580,marginBottom:48}}>Controlled velocity is not a process. It is a mindset that changes what you build, how you build it, and how it holds up when real users show up.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
            <InsightCard num="01" title="Depth before speed" body="Going deep on user behavior, edge cases, and friction points before building saves ten times the rework later." />
            <InsightCard num="02" title="Anticipation over reaction" body="Reactive design patches problems. Anticipatory design removes them. The difference shows up in how confident users feel." />
            <InsightCard num="03" title="Clarity compounds" body="When every layer of a product is clear - hierarchy, copy, flow - velocity follows naturally. Clarity is what makes speed safe." />
          </div>
          <div style={{borderTop:'1px solid #1d1d1d',paddingTop:48}}>
            <SLabel>The Real Lesson</SLabel>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'center'}}>
              <div>
                <h3 style={{fontSize:'clamp(22px,2.5vw,34px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.2,color:'#fff',marginBottom:16}}>When the foundation is strong, progress sustains itself.</h3>
                <p style={{fontSize:15,color:'#666',lineHeight:1.85,marginBottom:16}}>Understanding before building is not slower. It is the only approach that actually stays fast - because you are not rebuilding, not patching, not second-guessing every decision after launch.</p>
                <p style={{fontSize:15,color:'#555',lineHeight:1.85}}>When it is not, moving faster only accelerates the breakdown.</p>
              </div>
              <div style={{background:'#111',border:'1px solid #1d1d1d',borderRadius:16,padding:32}}>
                <div style={{fontSize:13,color:'#555',marginBottom:20,fontWeight:500,letterSpacing:'.05em'}}>Clarity at each layer produces -</div>
                {[
                  {out:'Fewer surprises in production',impact:'Anticipation replaces firefighting'},
                  {out:'Faster decisions in reviews',impact:'Clarity removes ambiguity'},
                  {out:'More confident users',impact:'Guided flows build trust'},
                  {out:'Controlled, compounding velocity',impact:'Strong foundation - sustained speed'},
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

      {/* next */}
      <div style={{background:'var(--black)',padding:'80px 8%',borderTop:'1px solid #1a1a1a',textAlign:'center'}}>
        <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.12em',color:'#333',marginBottom:12}}>Next Reflection</div>
        <div style={{fontSize:'clamp(32px,5vw,60px)',fontWeight:600,color:'#fff',letterSpacing:'-.04em',marginBottom:8,lineHeight:1}}>Human Psychology<br />and Designing</div>
        <div style={{fontSize:14,color:'#444',marginBottom:32}}>Note 03 - Psychology - 6 min read</div>
        <a href="/reflections/human" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#fff',color:'#111',borderRadius:10,padding:'14px 28px',fontSize:14,fontWeight:600,textDecoration:'none'}}>Read Next</a>
      </div>
    </>
  )
}