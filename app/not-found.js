import { Page, Lines, Outro, para } from '@/components/Chrome'
import OtherWork from '@/components/OtherWork'

export const metadata = {
  title: 'Page not found',
  description: 'That page is not here. The work is.',
}

// Next.js ships a stock 404 - "404 | This page could not be found" on a blank
// white page, with no nav and no link anywhere. On a portfolio that is a dead
// end at the exact moment someone is already lost. This is the site's own
// chrome, and it hands them the work instead.
export default function NotFound() {
  return (
    <Page title="Page not found">
      <div className="lh-wip du cine">
        <section className="du-sec" style={{ '--pt': 300, '--pb': 40 }}>
          <div className="du-x" style={{ '--x': 190 }}>
            <p className="p28 w500 lh-wip-eyebrow" data-reveal>404</p>
            <h1 className="p70 lh-wip-head" data-reveal>
              <Lines lines={['This page', 'is not here.']} />
            </h1>
            <p className="p30 w500 lh-wip-body" data-reveal>
              {para(['Nothing at that address. The work is below, and the name',
                     'at the top of the page goes home.'])}
            </p>
          </div>
        </section>

        <OtherWork slug="" headX={190} head={['Try one of', 'these instead.']}
                   other={{ pt: 180, pb: 0 }} />
        <Outro x={190} pt={164} pb={220} />
      </div>
    </Page>
  )
}
