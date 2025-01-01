import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('renders Loader component', () => {
  render(<Loader />);
  const loaderElement = screen.getByText(/loading/i);
  expect(loaderElement).toBeInTheDocument();
});