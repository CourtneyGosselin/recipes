import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useRecipe } from '../hooks/useRecipes'
import styles from './RecipePage.module.css'

export default function RecipePage() {
  const { slug } = useParams()
  const recipe = useRecipe(slug)

  if (!recipe) {
    return (
      <div className={styles.notFound}>
        <p>Recipe not found.</p>
        <Link to="/" className={styles.backLink}>← Back to all recipes</Link>
      </div>
    )
  }

  const { title, description, category, time, servings, tags, image, content } = recipe

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumb}>
          <Link to="/" className={styles.backLink}>← All recipes</Link>
          {category && <span className={styles.categoryLabel}>{category}</span>}
        </nav>

        <header className={styles.header}>
          {image && (
            <div className={styles.heroImage}>
              <img src={image} alt={title} />
            </div>
          )}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}

          <div className={styles.meta}>
            {time && (
              <div className={styles.metaItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <div className={styles.metaLabel}>Time</div>
                  <div className={styles.metaValue}>{time}</div>
                </div>
              </div>
            )}
            {servings && (
              <div className={styles.metaItem}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div>
                  <div className={styles.metaLabel}>Serves</div>
                  <div className={styles.metaValue}>{servings}</div>
                </div>
              </div>
            )}
          </div>

          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </header>

        <article className={styles.article}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
