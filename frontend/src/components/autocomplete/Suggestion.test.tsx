import { fireEvent, render, screen } from '@testing-library/react'
import { Suggestion } from './Suggestion'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./style.module.css', () => ({
  default: {
    suggestion: 'suggestion',
    label: 'label',
    match: 'match',
    description: 'description'
  }
}))

const mockIngredient = {
  name: 'Test Ingredient',
  description: 'Test Description',
  id: 1
}

const defaultProps = {
  suggestion: mockIngredient,
  type: 'ingredient' as const,
  onSelect: vi.fn(),
  searchTerm: 'test'
}

describe('Suggestion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  });
  it('should render correctly', () => {
    render(<Suggestion {...defaultProps} />)
    
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Test')).toHaveClass('match')
    expect(screen.getByText('Ingr')).toBeInTheDocument()
    expect(screen.getByText('Ingr')).not.toHaveClass('match')
  })

  it('should call onSelect when clicked', () => {
    render(<Suggestion {...defaultProps} />)
    
    fireEvent.click(screen.getByRole('option'))
    
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      mockIngredient,
      'ingredient'
    )
  })

  it('should call onSelect when Enter key is pressed', () => {
    render(<Suggestion {...defaultProps} />)
    
    fireEvent.keyDown(screen.getByRole('option'), { key: 'Enter' })
    
    expect(defaultProps.onSelect).toHaveBeenCalledWith(
      mockIngredient,
      'ingredient'
    )
  })

  it('should not call onSelect when other keys are pressed', () => {
    render(<Suggestion {...defaultProps} />)
    
    fireEvent.keyDown(screen.getByRole('option'), { key: 'Space' })
    
    expect(defaultProps.onSelect).not.toHaveBeenCalled()
  })

  it('should highlight matching text parts', () => {
    render(<Suggestion {...defaultProps} />)
    
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Test')).toHaveClass('match')
    expect(screen.getByText('Ingr')).toBeInTheDocument()
    expect(screen.getByText('Ingr')).not.toHaveClass('match')
  })
})

