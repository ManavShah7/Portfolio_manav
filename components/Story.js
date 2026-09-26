import { Lines, para } from './Chrome'
import { CaseHero, NextProject } from './Case'
import { Media, Video } from './Media'
import Gallery from './Gallery'

// The long-form case study: Lighthouse and Liveasy share this shape, so they
// share this template - overview with its facts, the insight, the research on
// the project's colour, the solution as features, the result.
//
// `C` is the page's copy file, used as authored. Media that has not been
// dropped in yet is simply left out and the copy carries the section alone.
export default function Story({ C, slug, name, kind, accent, hero, band, bandFill, features, extra }) {
  return (
    <>
      <CaseHero clip={hero} name={name} kind={kind} fill={bandFill}>
        <p className="t-headline intro-line wide" data-reveal>{para(C.overview.headline)}</p>
      </CaseHero>

      {/* ---- overview ---- */}
      <section className="section">
        <div className="wrap grid">
          <div className="span-7 stack-lg" data-stagger>
            <p className="t-body-lg regular" data-reveal>{para(C.overview.p1)}</p>
            <p className="t-body-lg regular c-2" data-reveal>{para(C.overview.p2)}</p>
          </div>
          <dl className="span-4 facts" data-stagger style={{ gridColumnEnd: -1 }}>
            {C.overview.meta.map(m => (
              <div key={m.label} data-reveal>
                <dt className="t-caption c-2">{m.label}</dt>
                {/* a list reads as a list; a date range reads as one line */}
                <dd className="t-body">{m.label === 'Skills'
                  ? m.values.map(v => <span key={v} className="fact-line">{v}</span>)
                  : para(m.values)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- the insight ---- */}
      <section className="section bg-fill">
        <div className="wrap">
          <div className="center head-gap">
            <h2 className="t-headline" data-reveal><Lines lines={C.insight.headline} /></h2>
            <p className="t-body-lg regular c-2 measure insight-body" data-reveal>{para(C.insight.body)}</p>
          </div>
          <div className="grid" data-stagger>
            <div className="card white span-12 wide-card" data-reveal>
              <h3 className="t-title"><Lines lines={C.insight.wide.head} /></h3>
              <p className="t-body-lg regular c-2">{para(C.insight.wide.body)}</p>
            </div>
            {C.insight.cards.map((c, i) => (
              <div key={i} className="card white span-6 insight-card" data-reveal>
                <h3 className="t-card"><Lines lines={c.head} /></h3>
                <p className="t-body c-2">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- research, on the project's own colour ---- */}
      <section className="section band-colour" style={{ background: bandFill }}>
        {band?.video && <Video src={band.src} poster={band.poster} className="band-colour-media" />}
        <div className="wrap band-colour-copy">
          <h2 className="t-headline on-dark head-gap" data-reveal><Lines lines={C.research.headline} /></h2>
        </div>
        <Gallery label="Research">
          {C.research.cards.map((c, i) => (
            <article key={i} className="card white research-card" data-reveal>
              <span className="t-eyebrow" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-card"><Lines lines={c.head} /></h3>
              <p className="t-body c-2">{para(c.body)}</p>
            </article>
          ))}
        </Gallery>
      </section>

      {/* ---- the solution ---- */}
      <section className="section">
        <div className="wrap">
          <h2 className="t-hero center solution-head" data-reveal><Lines lines={C.solution.headline} /></h2>
          {features.map((f, i) => (
            f.clip
              ? (
                <div key={i} className={`grid feature${i % 2 ? ' flip' : ''}`}>
                  <div className="span-7 feature-media">
                    <Media clip={f.clip} ratio={f.ratio || '16 / 10'} className="screen" data-sv="rise" />
                  </div>
                  <div className="span-5 feature-copy stack" data-reveal>
                    <h3 className="t-sub"><Lines lines={f.head} /></h3>
                    <p className="t-body-lg regular c-2">{para(f.body)}</p>
                    {f.caption && <p className="t-body c-2">{para(f.caption)}</p>}
                  </div>
                </div>
              )
              : (
                <div key={i} className="feature-solo center" data-stagger>
                  <h3 className="t-headline" data-reveal><Lines lines={f.head} /></h3>
                  <p className="t-body-lg c-2 measure" data-reveal>{para(f.body)}</p>
                  {f.caption && <p className="t-body c-2 measure feature-solo-cap" data-reveal>{para(f.caption)}</p>}
                </div>
              )
          ))}
        </div>
      </section>

      {/* ---- the result ---- */}
      <section className="section bg-fill">
        <div className="wrap center">
          <p className="t-hero impact" style={{ color: accent }} data-reveal><Lines lines={C.impact.headline} /></p>
        </div>
      </section>

      {extra}

      <NextProject slug={slug} />
    </>
  )
}
