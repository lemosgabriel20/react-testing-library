import { React } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
// Se houver pokemons salvos, conferir o nome

test('Teste se é exibida na tela a mensagem \'No favorite Pokémon found\', caso a pessoa não tenha Pokémon favoritos', () => {
  render(<FavoritePokemon />);
  const text = screen.getByText('No favorite Pokémon found');
  expect(text).toBeInTheDocument();
});

test('Teste se apenas são exibidos os Pokémon favoritados', async () => {
  renderWithRouter(<App />);
  const linkToDetails = screen.getByRole('link', { name: /more details/i });
  const pokemon = screen.getByTestId('pokemon-name');
  fireEvent.click(linkToDetails);
  const favoritePokemon = screen.getByLabelText(/pokémon favoritado/i);
  fireEvent.click(favoritePokemon);
  fireEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));
  expect(screen.getByTestId('pokemon-name')).toStrictEqual(pokemon);
});
