import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';
import { describe, expect, it, vi } from 'vitest';
import { beforeEach, afterEach } from 'node:test';

vi.mock('./style.module.css', () => ({
  default: {
    clearButton: 'clear-button',
    hidden: 'hidden',
  },
}));

const props = {
  onChange: vi.fn(),
  inputId: 'search-input',
};

describe('Input', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render correclty', () => {
    const { container } = render(<Input {...props} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Search...'
    );

    const clearButton = container.querySelector('button#clear-input');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveAttribute('aria-hidden', 'true');
    expect(clearButton).toHaveClass('hidden');
  });

  it('should trigger onChange after 400ms', () => {
    vi.useFakeTimers(); 
    
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(props.onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);

    expect(props.onChange).toHaveBeenCalled();
    
    vi.useRealTimers();
  });
  
  it('should clear the input when the clear button is clicked', () => {
    const { container } = render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    let clearButton = container.querySelector('button#clear-input');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveAttribute('aria-hidden', 'false');
    expect(clearButton).not.toHaveClass('hidden');

    fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(input).toHaveValue('');

    clearButton = container.querySelector('button#clear-input');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveAttribute('aria-hidden', 'true');
    expect(clearButton).toHaveClass('hidden');
  });
});
