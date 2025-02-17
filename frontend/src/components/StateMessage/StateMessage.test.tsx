import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StateMessage } from './StateMessage';

vi.mock('./StateMessage.module.css', () => ({
  default: {
    container: 'container',
    error: 'error',
    info: 'info',
    loading: 'loading',
    spinner: 'spinner',
    visuallyHidden: 'visuallyHidden'
  }
}));

describe('StateMessage', () => {
  it('renders the message correctly', () => {
    render(<StateMessage message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with info type by default', () => {
    render(<StateMessage message="Info message" />);
    const container = screen.getByText('Info message').parentElement;
    expect(container).toHaveClass('info');
  });

  it('renders with error type and correct styling', () => {
    render(<StateMessage message="Error message" type="error" />);
    const container = screen.getByText('Error message').parentElement;
    expect(container).toHaveClass('error');
  });

  it('renders loading spinner when type is loading', () => {
    render(<StateMessage message="Loading message" type="loading" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading message')).toBeInTheDocument();
  });

}); 