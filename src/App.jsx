import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import RecipePage from './pages/RecipePage'

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:slug" element={<RecipePage />} />
        </Routes>
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--muted)',
        fontSize: '0.875rem',
        fontFamily: 'var(--font-body)',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto',
      }}>
        recipes.gosselin.io
      </footer>
    </HashRouter>
  )
}
