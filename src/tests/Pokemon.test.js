import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('É exibido na tela um h2 com o texto <name> Details', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('link', { name: /more details/i });
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  fireEvent.click(button);
  const h2 = screen.getByRole('heading', { name: `${pokemonName} Details` });
  expect(h2).toHaveTextContent(`${pokemonName} Details`);
  //console.log(h2.innerHTML)
});

test('É exibido na tela um h2 com o texto Summary', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(button);
  const h2 = screen.getByRole('heading', { name: /summary/i });
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('Summary');
});

test('É exibido na tela um texto contendo <summary>', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(button);
  const h2 = screen.getByRole('heading', { name: /summary/i });
  const summary = h2.nextElementSibling;
  expect(summary).toHaveTextContent(summary.innerHTML);
});

test('É exibido na tela um h2 com o texto Game Locations of <name>', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(button);
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  const gameLocation = screen.getByRole('heading', { name: `Game Locations of ${pokemonName}` });
});