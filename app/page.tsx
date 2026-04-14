import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Work from '@/components/Work'
import Principle from '@/components/Principle'
import Experience from '@/components/Experience'

import Reflections from '@/components/Reflections'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
     
      <Work />
      <Principle />
      <Experience />

      <Reflections />
      <Contact />
    </main>
  )
}