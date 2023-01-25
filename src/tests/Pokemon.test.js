import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);
  expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  const weight = screen.getByTestId('pokemon-weight').innerHTML.match(/\d+/g).join().replace(',', '.');
  expect(screen.getByTestId('pokemon-weight').innerHTML).toBe(`Average weight: ${weight} kg`);
  const sprite = screen.getByAltText('Pikachu sprite');
  expect(screen.getByAltText('Pikachu sprite')).toHaveAttribute('src', sprite.src);
});

it('Teste do Link do Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  expect(link.href).toContain('/pokemon/25');
  fireEvent.click(link);
  expect(history.location.pathname).toBe('/pokemon/25');
});

it('Teste favoritar o Pokémon', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(link);
  fireEvent.click(screen.getByRole('checkbox'));
  const star = screen.getByAltText('Pikachu is marked as favorite');
  expect(star).toBeInTheDocument();
  expect(star).toHaveAttribute('src', '/star-icon.svg');
});
