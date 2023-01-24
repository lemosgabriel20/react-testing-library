import { React } from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('Teste se a página contém as informações sobre a Pokédex;', () => {
  render(<About />);
  const heading = screen.getByText('About Pokédex');
  const firstDesc = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
  const secondDesc = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
  expect(heading).toBeInTheDocument();
  expect(firstDesc).toBeInTheDocument();
  expect(secondDesc).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  render(<About />);
  const h2 = screen.getByRole('heading', 'About Pokédex');
  expect(h2).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(<About />);
  const firstDesc = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
  const secondDesc = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
  expect(firstDesc).toBeInTheDocument();
  expect(secondDesc).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  render(<About />);
  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
