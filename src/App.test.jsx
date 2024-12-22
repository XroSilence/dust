import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './quote/Quote.jsx';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(true).toBe(true);
  });
  describe('Concatenation', () => {
    test('should concatenate two strings', () => {
      expect('hello' + ' ' + 'world').toBe('hello world');
    });
  });
});  
