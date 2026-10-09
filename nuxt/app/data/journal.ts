export const journalCategories = [
  { id: 'all', label: 'ALL' },
  { id: 'brand', label: 'BRAND NEWS', count: 12 },
  { id: 'engineering', label: 'ENGINEERING', count: 23 },
  { id: 'case-studies', label: 'CASE STUDIES', count: 16 },
] as const
export const journalTitles = [
  'VIVE Unveils Its New Forged Wheel Collection',
  'Next-Generation Lightweight Wheels Debut with Performance and Style',
  'New Multi-Spoke Design Redefines the Performance Wheel Aesthetic',
  'VIVE Introduces New Custom Wheel Finish Options',
]
// Preview inventory mirrors Figma's counts and repeated cards. Replace with CMS
// records before publication; the supplied detail copy is shared preview content.
export const journalArticles = journalCategories.filter(category => 'count' in category).flatMap(category =>
  Array.from({ length: category.count }, (_, index) => ({
    slug: `${category.id}-${index + 1}`,
    title: journalTitles[index % journalTitles.length]!,
    category: category.id,
    imageIndex: index % journalTitles.length,
    date: '2026.7.12',
  })),
)
export type JournalArticle = typeof journalArticles[number]
