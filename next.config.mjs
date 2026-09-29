/** @type {import('next').NextConfig} */
const nextConfig = {
  // Routes that existed on the old portfolio and have no equivalent here yet.
  // /work/liveasy and /about came off this list once they landed.
  // Temporary, not permanent: a 308 is cached hard by browsers and would be
  // painful to undo when these pages come back.
  async redirects() {
    return [
      { source: '/work/gowork', destination: '/', permanent: false },
      // five of these were live - wildcard so any that were linked are covered
      { source: '/reflections', destination: '/', permanent: false },
      { source: '/reflections/:slug*', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
