export const stringMatcher = (label:string, searchTerm:string) => {
  const term = searchTerm.toLowerCase()
  const sanitizedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`([${sanitizedTerm}]+)|([^${sanitizedTerm}]+)`, "gi");
  const parts = label.match(regex) || [];
  return parts.map((part) => {
    return {
      label: part,
      isMatch: term.includes(part.toLowerCase()[0])
    }
  })
}
