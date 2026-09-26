import { Page } from '@/components/Chrome'
import Story from '@/components/Story'
import { slots } from '@/lib/clips'
import * as C from '@/lib/lighthouse-copy'

export const metadata = {
  title: 'Lighthouse AI',
  description: 'Lighthouse AI - Navi, the playbook and the Chrome extension. Case study by Manav Shah.',
}

const V = slots('lighthouse')
const GREEN = '#34C759'
const FILL = 'radial-gradient(120% 100% at 30% 0%,#7BE38F 0%,#1FAF3C 38%,#0B6B22 78%,#053312 100%)'

export default function Lighthouse() {
  const S = C.solution
  return (
    <Page title="Lighthouse AI" dark>
      <Story C={C} slug="lighthouse" name="Lighthouse AI" kind="Web app and Chrome extension · Product Design Intern"
             accent={GREEN} hero={V('hero') || V('green')} band={V('green')} bandFill={FILL}
             features={[
               { head: S.navi.head, body: S.navi.body, caption: S.navi.caption, clip: V('navi') },
               { head: S.playbook.head, body: S.playbook.body, clip: V('playbook') },
               { head: S.ext.head, body: S.ext.body, clip: V('extension') },
             ]} />
    </Page>
  )
}
