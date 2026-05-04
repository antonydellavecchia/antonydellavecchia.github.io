function parseBib(text) {
  const entries = []
  const entryRe = /@(\w+)\s*\{\s*([^,]+),([^@]*)\}/gs

  for (const match of text.matchAll(entryRe)) {
    const type = match[1].toLowerCase()
    const key = match[2].trim()
    const fields = {}

    for (const field of match[3].matchAll(/(\w+)\s*=\s*[{"]([\s\S]*?)[}"]/g)) {
      fields[field[1].toLowerCase()] = field[2].trim()
    }

    entries.push({ type, key, ...fields })
  }

  return entries
}

function isPublished(e) {
  return e.type === 'article' || e.type === 'inproceedings' || e.type === 'incollection'
}

function entryHTML(e) {
  const published = isPublished(e)
  const venue = e.journal || e.booktitle || ''
  const arxivUrl = e.arxiv ? `https://arxiv.org/abs/${e.arxiv}` : (!published ? e.url : null)
  const pubUrl = published ? (e.doi ? `https://doi.org/${e.doi}` : e.url) : null

  const titleLink = pubUrl || arxivUrl || '#'
  const title = `<a href="${titleLink}">${e.title}</a>`

  const links = []
  if (pubUrl) links.push(`<a href="${pubUrl}">published</a>`)
  if (arxivUrl) links.push(`<a href="${arxivUrl}">arXiv</a>`)
  const linkStr = links.length ? ` <span class="paper-links">[${links.join(' | ')}]</span>` : ''

  const venueStr = venue ? ` — <em>${venue}</em>` : ''
  const statusStr = !published ? ' <span class="preprint">preprint</span>' : ''

  return `<li>
    ${title}${linkStr}
    <span class="meta">${e.author || ''} (${e.year || ''})${venueStr}${statusStr}</span>
  </li>`
}

export async function renderPublications() {
  let entries
  try {
    const res = await fetch('bibliography.bib')
    const text = await res.text()
    entries = parseBib(text)
  } catch {
    return
  }

  entries.sort((a, b) => (b.year || '0').localeCompare(a.year || '0'))

  const el = document.getElementById('papers-list')
  if (!el) return
  el.innerHTML = entries.length
    ? entries.map(entryHTML).join('')
    : '<li class="empty">No papers yet.</li>'
}
