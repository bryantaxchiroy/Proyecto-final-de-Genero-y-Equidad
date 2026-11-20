import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Lobby } from './pages/Lobby'
import { StationPage } from './pages/StationPage'
import { Reflection } from './pages/Reflection'
import { Project } from './pages/Project'
import { NotFound } from './pages/NotFound'

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/museo" element={<Lobby />} />
    <Route path="/estacion/:slug" element={<StationPage />} />
    <Route path="/sala-final" element={<Reflection />} />
    <Route path="/proyecto" element={<Project />} />
    <Route path="*" element={<NotFound />} />
  </Routes></Layout>
}
