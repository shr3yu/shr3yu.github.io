// Utility to load markdown files and convert to HTML
export const loadMarkdownFile = async (folder, filename) => {
  try {
    const response = await fetch(`/${folder}/${filename}.md`)
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}`)
    }
    const markdown = await response.text()
    return markdownToHTML(markdown, folder)
  } catch (error) {
    console.error(`Error loading markdown file ${filename}:`, error)
    return `Error loading ${filename}`
  }
}

// Convert markdown to HTML (preserves bold, italics, images, and basic formatting)
const markdownToHTML = (markdown, folder) => {
  // First, convert lists to proper HTML lists (before other processing)
  let html = markdown
    // Convert unordered lists - find consecutive list items and wrap them
    .replace(/((?:^[\s]*[-*+]\s+.+(?:\n|$))+)/gm, (match) => {
      const items = match.trim().split(/\n/).filter(line => /^[\s]*[-*+]\s+/.test(line))
      if (items.length > 0) {
        const listItems = items.map(item => 
          '<li>' + item.replace(/^[\s]*[-*+]\s+/, '') + '</li>'
        ).join('')
        return '<ul>' + listItems + '</ul>'
      }
      return match
    })
    // Convert ordered lists
    .replace(/((?:^[\s]*\d+\.\s+.+(?:\n|$))+)/gm, (match) => {
      const items = match.trim().split(/\n/).filter(line => /^[\s]*\d+\.\s+/.test(line))
      if (items.length > 0) {
        const listItems = items.map(item => 
          '<li>' + item.replace(/^[\s]*\d+\.\s+/, '') + '</li>'
        ).join('')
        return '<ol>' + listItems + '</ol>'
      }
      return match
    })
  
  // Convert headers (with minimal spacing)
  html = html
    .replace(/^###\s+(.+)$/gm, '<strong>$1</strong>')
    .replace(/^##\s+(.+)$/gm, '<strong>$1</strong>')
    .replace(/^#\s+(.+)$/gm, '<strong>$1</strong>')
  
  // Convert bold (must be done before italic to avoid conflicts)
  html = html
    .replace(/\*\*(.+?)\*\*/g, '<BOLD>$1</BOLD>')
    .replace(/__(.+?)__/g, '<BOLD>$1</BOLD>')
  
  // Then convert italic (single asterisks/underscores)
  html = html
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    .replace(/_([^_\n]+?)_/g, '<em>$1</em>')
  
  // Convert bold placeholders back to strong tags
  html = html
    .replace(/<BOLD>(.+?)<\/BOLD>/g, '<strong>$1</strong>')
  
  // Continue with other formatting
  html = html
    // Convert images - must be done before links and line breaks
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      // If src doesn't start with http/https, assume it's relative to the images folder
      if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('/')) {
        src = `/${folder}/images/${src}`
      }
      return `<IMG>${src}|${alt || ''}</IMG>`
    })
    // Convert links (keep text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    // Convert inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Convert code blocks (keep content)
    .replace(/```[\s\S]*?```/g, '')
    // Convert horizontal rules to line breaks
    .replace(/^---$/gm, '<br>')
    // Convert line breaks, but preserve list structure
    .replace(/\n/g, '<br>')
    // Convert image placeholders to actual img tags (after line breaks)
    .replace(/<IMG>([^|]+)\|([^<]*)<\/IMG>/g, '<img src="$1" alt="$2" class="notepad-image" />')
    // Clean up: remove <br> before/after list tags and images
    .replace(/<br>\s*<(ul|ol)>/g, '<$1>')
    .replace(/<\/(ul|ol)>\s*<br>/g, '</$1>')
    .replace(/<br>\s*<\/li>/g, '</li>')
    .replace(/<\/li>\s*<br>/g, '</li>')
    .replace(/<br>\s*<img/g, '<img')
    .replace(/\/>\s*<br>/g, '/>')
    // Clean up extra line breaks (reduce to single breaks)
    .replace(/(<br>){2,}/g, '<br>')
    .trim()
  
  return html
}

// Get document name from filename (remove .md extension and format)
export const getDocumentName = (filename) => {
  return filename.replace(/\.md$/, '').replace(/_/g, ' ').replace(/-/g, ' ')
}

