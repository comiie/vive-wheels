/** Compensate natural page scrolling so the engineering screen lifts only once. */
export function engineeringMotion(offset: number, sectionHeight: number, viewport: number) {
  const travel = Math.max(sectionHeight, viewport) * 1.45
  const position = Math.max(0, Math.min(travel, offset))
  const t = position / travel
  const progress = t * t * t * (t * (t * 6 - 15) + 10)
  return { progress, translate: position - sectionHeight * progress }
}

/** Journal stays below the viewport until Engineering clears, plus a reading pause. */
export function storyTiming(engineeringHeight: number, aboutHeight: number, viewport: number) {
  const engineeringEnd = Math.max(engineeringHeight, viewport) * 1.45
  const journalEntry = engineeringEnd + viewport * .9
  const spacerHeight = Math.max(0, journalEntry + viewport - aboutHeight)
  return { engineeringEnd, journalEntry, spacerHeight, journalTop: journalEntry + viewport }
}
