import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/Layout'
import { IntroProvider } from './contexts/IntroContext'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Insights } from './pages/Insights'
import { Legal } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { ServiceDetail } from './pages/ServiceDetail'
import { ServicesIndex } from './pages/ServicesIndex'

function App() {
  return (
    <BrowserRouter>
      <IntroProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="insights" element={<Insights />} />
            <Route path="services" element={<ServicesIndex />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="legal/:slug" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </IntroProvider>
    </BrowserRouter>
  )
}

export default App
