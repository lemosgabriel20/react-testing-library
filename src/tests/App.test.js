import { React } from 'react';
import { screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  const home = links[0];
  const about = links[1];
  const favorites = links[2];
  expect(home).toHaveTextContent('Home');
  expect(about).toHaveTextContent('About');
  expect(favorites).toHaveTextContent('Favorite Pokémon');
});

test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  const home = links[0];
  userEvent.click(home);
  expect(history.location.pathname).toBe('/');
  const text = screen.getByText('Encountered Pokémon');
  expect(text).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  const about = links[1];
  userEvent.click(about);
  expect(history.location.pathname).toBe('/about');
  const text = screen.getByText('About Pokédex');
  expect(text).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  const favorites = links[2];
  userEvent.click(favorites);
  expect(history.location.pathname).toBe('/favorites');
  const text = screen.getAllByText('Favorite Pokémon');
  expect(text[1]).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
  const { history } = renderWithRouter(<App />);
  await act(async () => history.push('/Not-found'));
  const text = screen.getByText('Page requested not found');
  expect(text).toBeInTheDocument();
});
// acessar os elementos da tela
// interagir com os elementos se for necessario
// fazer os testes
