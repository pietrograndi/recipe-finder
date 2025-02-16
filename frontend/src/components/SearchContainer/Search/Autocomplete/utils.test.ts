import { describe, expect, it } from "vitest"
import { stringMatcher } from "./utils"

describe('stringMatcher', () => {
  it('should return an array of objects with label and isMatch property', () => {
    const label = 'Hello World'
    const searchTerm = 'hello'
    const result = stringMatcher(label, searchTerm)
    expect(result).toEqual([
      { label: 'Hello', isMatch: true },
      { label: ' W', isMatch: false },
      { label: 'o', isMatch: true },
      { label: 'r', isMatch: false },
      { label: 'l', isMatch: true },
      { label: 'd', isMatch: false },
    ])
  })

  it('should return an array with one item if the search term is empty', () => {
    const label = 'Hello World'
    const searchTerm = ''
    const result = stringMatcher(label, searchTerm)
    expect(result).toEqual([{ label: 'Hello World', isMatch: false }])
  })

  it('should return an array with one item if the search term is not found', () => {
    const label = 'Hello World'
    const searchTerm = 'bananna'
    const result = stringMatcher(label, searchTerm)
    expect(result).toEqual([{ label: 'Hello World', isMatch: false }])
  })

  it('should return an array of objects with label and isMatch property with insensitive search', () => {
    const label = 'Hello World'
    const searchTerm = 'hello'
    const result = stringMatcher(label, searchTerm)
    expect(result).toEqual([
      { label: 'Hello', isMatch: true },
      { label: ' W', isMatch: false },
      { label: 'o', isMatch: true },
      { label: 'r', isMatch: false },
      { label: 'l', isMatch: true },
      { label: 'd', isMatch: false },
    ])
  })
})
