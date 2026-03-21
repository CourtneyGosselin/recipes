import { Link } from 'react-router-dom'
import styles from './RecipeCard.module.css'

export default function RecipeCard({ recipe }) {
  const { slug, title, description, category, time, servings, image } = recipe

  return (
    <Link to={`/recipe/${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={title} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderEmoji}>🍽</span>
          </div>
        )}
        {category && (
          <span className={styles.category}>{category}</span>
        )}
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        <div className={styles.meta}>
          {time && (
            <span className={styles.metaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {time}
            </span>
          )}
          {servings && (
            <span className={styles.metaItem}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {servings}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
