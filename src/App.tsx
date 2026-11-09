import { Route, Routes } from 'react-router-dom'
import { UIProvider } from './context/UIContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import DivisionPage from './pages/DivisionPage'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <UIProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/marine" element={<DivisionPage divisionKey="marine" />} />
          <Route path="/services/real-estate" element={<DivisionPage divisionKey="real-estate" />} />
          <Route path="/services/fashion-ai" element={<DivisionPage divisionKey="fashion-ai" />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UIProvider>
  )
}
