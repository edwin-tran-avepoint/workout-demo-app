import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the app with calendar', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('MON')).toBeInTheDocument();
    });
  });

  test('loads data from JSON if no localStorage', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Back Day')).toBeInTheDocument();
    });
  });

});
