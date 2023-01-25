import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  renderWithRouter(<App />);
  const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  fireEvent.click(moreDetailsButton);
  expect(screen.getByText(`${pokemonName} Details`)).toBeInTheDocument();
  expect(moreDetailsButton).not.toBeInTheDocument();
  expect(moreDetailsButton).not.toBeVisible();
  expect(screen.getByText('Summary')).toBeInTheDocument();
  const summary = screen.getByText('Summary').nextElementSibling.innerHTML;
  expect(screen.getByText(`${summary}`)).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  renderWithRouter(<App />);
  const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  fireEvent.click(moreDetailsButton);
  expect(screen.getByText(`Game Locations of ${pokemonName}`)).toBeInTheDocument();
  const locationImages = screen.getAllByAltText(`${pokemonName} location`);
  locationImages.forEach((image) => {
    expect(image).toHaveAttribute('src', image.src);
  });
});

test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(moreDetailsButton);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(screen.getByLabelText('Pokémon favoritado?'));
  fireEvent.click(checkbox);
  const star = screen.getByAltText('Pikachu is marked as favorite');
  expect(star).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(star).not.toBeInTheDocument();
});
