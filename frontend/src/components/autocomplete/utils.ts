
export const stringMatcher = (label:string, searchTerm:string) => {
  const term = searchTerm.toLowerCase()
  const regex = new RegExp(`([${term}]+)|([^${term}]+)`, "gi");
  const parts = label.match(regex) || [];
  return parts.map((part) => {
    return {
      label: part,
      isMatch: term.includes(part.toLowerCase()[0])
    }
  })
}
