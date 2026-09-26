import { Page, Lines, para } from '@/components/Chrome'
import Story from '@/components/Story'
import { slots } from '@/lib/clips'
import * as C from '@/lib/liveasy-copy'

export const metadata = {
  title: 'Liveasy',
  description: 'Liveasy - a logistics homepage that earns the click before it asks for one. Case study by Manav Shah.',
}

const V = slots('liveasy')
const BRONZE = '#C2893A'
const FILL = 'radial-gradient(120% 100% at 30% 0%,#F2C27A 0%,#C2893A 36%,#6E4516 76%,#2A1905 100%)'

export default function Liveasy() {
  const S = C.solution
  return (
    <Page title="Liveasy" dark>
      <Story C={C} slug="liveasy" name="Liveasy" kind="Marketing site · UI Design Intern"
             accent={BRONZE} hero={V('hero')} band={V('bronze')} bandFill={FILL}
             features={[
               { head: S.pillars.head, body: S.pillars.body, caption: S.pillars.caption, clip: V('pillars') },
               { head: S.hero.head, body: S.hero.body, clip: V('hero-screen') },
               { head: S.proof.head, body: S.proof.body, clip: V('proof') },
             ]}
             extra={
               <section className="section">
                 <div className="wrap">
                   <h2 className="t-headline head-gap" data-reveal><Lines lines={C.reflection.head} /></h2>
                   <div className="grid" data-stagger>
                     {C.reflection.cards.map((c, i) => (
                       <div key={i} className="card span-6 insight-card" data-reveal>
                         <h3 className="t-card"><Lines lines={c.head} /></h3>
                         <p className="t-body c-2">{para(c.body)}</p>
                       </div>
                     ))}
                   </div>
                 </div>
               </section>
             } />
    </Page>
  )
}
