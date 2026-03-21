import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import RecipeCard from '../components/RecipeCard'
import styles from './Home.module.css'

export default function Home() {
  const recipes = useRecipes()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')

  const searchQuery = searchParams.get('search') || ''

  const categories = useMemo(() => {
    const cats = [...new Set(recipes.map(r => r.category))].sort()
    return ['All', ...cats]
  }, [recipes])

  const filtered = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = !searchQuery || [recipe.title, recipe.description, recipe.category, ...(recipe.tags || [])]
        .join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, activeCategory])

  function handleCategoryChange(cat) {
    setActiveCategory(cat)
    if (searchQuery) setSearchParams({})
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Family Recipes</h1>
        <p className={styles.heroSubtitle}>A collection of the meals we love</p>
      </section>

      <div className={styles.controls}>
        <div className={styles.categories} role="list" aria-label="Filter by category">
          {categories.map(cat => (
            <button
              key={cat}
              role="listitem"
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {searchQuery && (
          <p className={styles.searchInfo}>
            {filtered.length === 0 ? 'No results' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`} for <em>"{searchQuery}"</em>
            <button className={styles.clearSearch} onClick={() => setSearchParams({})}>clear</button>
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No recipes found.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(recipe => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
