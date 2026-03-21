import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Recipes</span>
        </Link>
        <form className={styles.searchForm} onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search recipes…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search recipes"
          />
          <button type="submit" className={styles.searchBtn} aria-label="Submit search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>
      </div>
    </header>
  )
}
