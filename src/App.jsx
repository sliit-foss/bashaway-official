import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Header, Footer, Layout } from './components/common'
import { Register, Sponsors, Speakers, Prizes, Rules, Timeline, Competition, Landing } from './components'

function App() {

  useEffect(() => {
    Aos.init({ offset: 0, duration: 1500 })
    window.addEventListener('load', Aos.refresh)
  }, [])

  return (
    <Layout>
      <Header />
      <Landing />
      <Timeline />
      <Competition />
      <Rules />
      <Prizes />
      <Speakers />
      <Sponsors />
      <Register />
      <Footer />
    </Layout>
  )
}

export default App
