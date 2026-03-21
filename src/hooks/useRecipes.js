import { useMemo } from 'react'

const rawFiles = import.meta.glob('../recipes/*.md', { as: 'raw', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw.trim() }

  const content = match[2].trim()
  const data = {}

  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (!key) continue

    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
    } else {
      data[key] = val.replace(/^['"]|['"]$/g, '')
    }
  }

  return { data, content }
}

function slugify(filepath) {
  return filepath
    .replace(/^.*[\\/]/, '')
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
}

export function useRecipes() {
  return useMemo(() => {
    return Object.entries(rawFiles).map(([filepath, raw]) => {
      const { data, content } = parseFrontmatter(raw)
      const slug = slugify(filepath)
      return {
        slug,
        content,
        title: data.title || slug,
        description: data.description || '',
        category: data.category || 'Uncategorized',
        time: data.time || '',
        servings: data.servings || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        image: data.image || null,
        date: data.date || '',
      }
    }).sort((a, b) => a.title.localeCompare(b.title))
  }, [])
}

export function useRecipe(slug) {
  const recipes = useRecipes()
  return recipes.find(r => r.slug === slug) || null
}
