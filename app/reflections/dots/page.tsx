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

export default function DotsPage() {
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
            <source src="/videos/dots.mp4" type="video/mp4" />
          </video>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.45)'}} />
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{fontSize:'clamp(28px,4vw,56px)',fontWeight:600,color:'#fff',letterSpacing:'-.03em',textAlign:'center',padding:'0 24px',fontFamily:'inherit'}}>
              "Dots to Decisions"
            </h1>
          </div>
        </div>
      </div>

      {/* section 01 */}
      <div style={{padding:'96px 8%',maxWidth:1200,margin:'0 auto'}}>
        <SLabel>Background</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>Research without synthesis is just noise with a spreadsheet.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>Most designers know how to collect research. Surveys, interviews, usability sessions - the methods are well-documented. What gets skipped is what comes after: the hard work of turning a pile of observations into something a team can actually build from.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>I have sat with 50 survey responses, 20 interviews, and 100 Reddit threads and felt completely stuck. Not because the data was bad. Because I did not yet know how to read it.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,fontWeight:600,color:'var(--text)'}}>Synthesis is the skill most designers never talk about - and the one that determines whether research actually changes anything.</p>
          </div>
          <div>
            <QuoteBlock
              text="Collecting data is the easy part. The hard part is sitting with it long enough to hear what it is actually saying."
              cite="What 100+ Reddit threads taught me"
            />
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {num:'01',title:'Data without direction',desc:'More research does not mean more clarity. Without a synthesis process, more data creates more confusion, not less.'},
                {num:'02',title:'Patterns hiding in plain sight',desc:'The most important insights are rarely in what users say directly. They are in what keeps coming up across different sources.'},
                {num:'03',title:'The jump to solutions',desc:'Most teams go from research straight to wireframes. Synthesis is the layer in between - and skipping it costs everything.'},
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
        <SLabel>01 - How I Synthesize</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <h2 style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>From raw data to a direction worth trusting.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>When I worked on Lighthouse AI, I ran 50 surveys, 20 interviews, and dug through over 100 Reddit threads across career-focused communities. The data was rich - but it was also overwhelming, contradictory, and scattered across formats.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>What I learned is that synthesis is not about organizing data. It is about finding the thread that runs through all of it - the thing that keeps showing up regardless of source, format, or framing.</p>
            <div style={{background:'rgba(124,58,237,.08)',border:'1px solid rgba(124,58,237,.2)',borderRadius:12,padding:'16px 20px',fontSize:14,color:'var(--text)',lineHeight:1.7}}>
              The insight is never in a single data point. It is in the pattern that only becomes visible when you look at everything together.
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {step:'01',label:'Collect without filtering',desc:'Pull everything in first. Surveys, interviews, forum posts, support tickets. Do not decide what matters yet.'},
              {step:'02',label:'Look for what keeps repeating',desc:'Not what one person said loudly. What shows up quietly across ten different sources.'},
              {step:'03',label:'Find the emotion underneath',desc:'Vague posts and frustrated language are often the most useful signals. They reveal overwhelm, not just behavior.'},
              {step:'04',label:'Name the insight, not the data',desc:'Stop at patterns, not quotes. The insight is the conclusion - the thing the data is pointing toward.'},
              {step:'05',label:'Connect insight to decision',desc:'Every synthesis should end with a direction. If it does not change something, it was not synthesis - it was just organizing.'},
            ].map(({step,label,desc})=>(
              <div key={step} style={{display:'flex',gap:16,alignItems:'flex-start',padding:'14px 18px',borderRadius:12,background:'var(--gray)',border:'1px solid var(--border)'}}>
                <div style={{fontSize:11,color:'var(--accent-mid)',fontWeight:600,minWidth:24,paddingTop:2}}>{step}</div>
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
        <SLabel>02 - What the Data Actually Says</SLabel>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div style={{background:'var(--black)',borderRadius:16,padding:28}}>
            <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.1em',color:'#555',marginBottom:20,fontWeight:500}}>Reddit research - what I found vs what I expected</div>
            {[
              {expected:'Users want more features',found:'Users want to feel less overwhelmed'},
              {expected:'Advice quality is the problem',found:'Timing of advice matters more than content'},
              {expected:'Target users are job seekers',found:'Emotionally burned-out professionals emerged as a new audience'},
              {expected:'Clear steps reduce anxiety',found:'Vague posts signal overwhelm - the real need is to feel heard first'},
            ].map(({expected,found},i)=>(
              <div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none'}}>
                <div style={{fontSize:11,color:'#ef4444',fontWeight:500,marginBottom:4,letterSpacing:'.04em'}}>Expected</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginBottom:8,lineHeight:1.4}}>{expected}</div>
                <div style={{fontSize:11,color:'#22c55e',fontWeight:500,marginBottom:4,letterSpacing:'.04em'}}>Found</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.7)',lineHeight:1.4}}>{found}</div>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:20}}>The insight is never what you expect.</h2>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:16}}>When I went into the Reddit research for Lighthouse AI, I expected to validate what we already assumed. Instead, the data kept pointing somewhere else. Users were not asking for better advice. They were asking to feel less alone in their uncertainty.</p>
            <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.85,marginBottom:24}}>That single shift - from information product to emotional support product - changed the entire design direction. It would never have emerged from a quick read of the surface-level responses. It only appeared after sitting with the data long enough to see the thread underneath.</p>
            <QuoteBlock
              text="Vague posts do not mean unclear thinking. They often mean the person does not yet have language for what they are feeling. That is exactly where the product needs to meet them."
              cite="The Reddit insight that changed Lighthouse AI"
            />
          </div>
        </div>
      </div>

      {/* dark section */}
      <div style={{background:'var(--black)',padding:'80px 8%'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <SLabel>03 - The Takeaway</SLabel>
          <h2 style={{fontSize:'clamp(28px,3.5vw,48px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:12,color:'#fff'}}>
            Three things synthesis taught me.<br />
            <span style={{color:'#444',fontStyle:'italic',fontWeight:400}}>Learned by sitting with the mess long enough.</span>
          </h2>
          <p style={{fontSize:15,color:'#666',lineHeight:1.85,maxWidth:580,marginBottom:48}}>Research without synthesis is just documentation. The difference between a researcher and a designer who can research is what happens after the data is collected.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
            <InsightCard num="01" title="Patterns over quotes" body="A single powerful quote is easy to find. A pattern that shows up across 50 people is actually useful. Quotes illustrate. Patterns decide." />
            <InsightCard num="02" title="Vague signals are the loudest" body="Frustrated, vague, or emotional responses are not noise. They are the clearest signal that something is genuinely wrong at the emotional level." />
            <InsightCard num="03" title="Synthesis ends in a decision" body="If your synthesis process produces more questions without producing a direction, it is not done yet. The output of synthesis is always a decision." />
          </div>
          <div style={{borderTop:'1px solid #1d1d1d',paddingTop:48}}>
            <SLabel>The Real Lesson</SLabel>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'center'}}>
              <div>
                <h3 style={{fontSize:'clamp(22px,2.5vw,34px)',fontWeight:600,letterSpacing:'-.03em',lineHeight:1.2,color:'#fff',marginBottom:16}}>Connecting dots is the work. Everything else is preparation.</h3>
                <p style={{fontSize:15,color:'#666',lineHeight:1.85,marginBottom:16}}>Collecting research is the easy part. Running sessions, sending surveys, scraping forums - that is process. Synthesis is judgment. It is the moment where the designer has to decide what the data is actually saying and what to do about it.</p>
                <p style={{fontSize:15,color:'#555',lineHeight:1.85}}>That skill does not come from reading about research methods. It comes from sitting with the mess long enough to stop being overwhelmed by it - and starting to see the shape of what it is trying to say.</p>
              </div>
              <div style={{background:'#111',border:'1px solid #1d1d1d',borderRadius:16,padding:32}}>
                <div style={{fontSize:13,color:'#555',marginBottom:20,fontWeight:500,letterSpacing:'.05em'}}>When synthesis is done well -</div>
                {[
                  {out:'Research changes direction',impact:'Not just validates what you assumed'},
                  {out:'Teams align faster',impact:'A clear insight removes debate'},
                  {out:'Design decisions have backing',impact:'Not gut feeling - grounded direction'},
                  {out:'The real user need surfaces',impact:'Not the stated need - the felt one'},
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

      {/* next — loops back to note 01 */}
      <div style={{background:'var(--black)',padding:'80px 8%',borderTop:'1px solid #1a1a1a',textAlign:'center'}}>
        <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.12em',color:'#333',marginBottom:12}}>Back to the Beginning</div>
        <div style={{fontSize:'clamp(32px,5vw,60px)',fontWeight:600,color:'#fff',letterSpacing:'-.04em',marginBottom:8,lineHeight:1}}>Good Design<br />is Good Business</div>
        <div style={{fontSize:14,color:'#444',marginBottom:32}}>Note 01 - Business - 4 min read</div>
        <a href="/reflections/good" style={{display:'inline-flex',alignItems:'center',gap:10,background:'#fff',color:'#111',borderRadius:10,padding:'14px 28px',fontSize:14,fontWeight:600,textDecoration:'none'}}>Read Again</a>
      </div>
    </>
  )
}