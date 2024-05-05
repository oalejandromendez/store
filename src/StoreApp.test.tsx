import React from 'react';
import { render, screen } from '@testing-library/react';
import { StoreApp } from './StoreApp';

test('renders learn react link', () => {
  render(<StoreApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
