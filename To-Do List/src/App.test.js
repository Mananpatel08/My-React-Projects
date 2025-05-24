import { render, screen } from '@testing-library/react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
