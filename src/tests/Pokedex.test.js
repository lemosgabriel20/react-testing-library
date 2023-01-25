import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const nextPokemonId = 'next-pokemon';
const pokemonNameId = 'pokemon-name';
const pokemonTypeButtonId = 'pokemon-type-button';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);
  const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
  expect(heading).toBeInTheDocument();
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  test('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });
  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const pokemonsLenght = 8;
    const button = screen.getByTestId(nextPokemonId);
    const pokemon = screen.getByTestId(pokemonNameId);
    for (let i = 0; i < pokemonsLenght; i += 1) {
      const previousPokemon = pokemon.innerHTML;
      fireEvent.click(button);
      const actualPokemon = pokemon.innerHTML;
      expect(actualPokemon).not.toBe(previousPokemon);
    }
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const pokemonsLenght = 8;
    const button = screen.getByTestId(nextPokemonId);
    const pokemon = screen.getByTestId(pokemonNameId);
    const firstPokemon = pokemon.innerHTML;
    for (let i = 0; i <= pokemonsLenght; i += 1) {
      fireEvent.click(button);
    }
    const actualPokemon = pokemon.innerHTML;
    expect(actualPokemon).toBe(firstPokemon);
  });
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);
  const pokemonsLenght = 8;
  const button = screen.getByTestId(nextPokemonId);
  const pokemon = screen.getAllByTestId(pokemonNameId);
  for (let i = 0; i <= pokemonsLenght; i += 1) {
    fireEvent.click(button);
    expect(pokemon).toHaveLength(1);
  }
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const button = screen.getAllByTestId(pokemonTypeButtonId);
    for (let i = 0, j = 1; j < button.length; i += 1, j += 1) {
      expect(button[i].innerHTML).not.toBe(button[j].innerHTML);
    }
  });
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo\n\t\b\be o texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const pokeTypeButton = screen.getAllByTestId(pokemonTypeButtonId);
    const nextButton = screen.getByTestId(nextPokemonId);
    for (let i = 0; i < pokeTypeButton.length; i += 1) {
      fireEvent.click(pokeTypeButton[i]);
      const typeText = pokeTypeButton[i].innerHTML;
      const pokemonType = screen.getByTestId('pokemon-type');
      if (i === 1 || i === 4) {
        for (let j = 0; j < 1; j += 1) {
          const typeAfterNext = screen.getByTestId('pokemon-type');
          expect(typeText).toBe(typeAfterNext.innerHTML);
          fireEvent.click(nextButton);
        }
      } else {
        expect(typeText).toBe(pokemonType.innerHTML);
      }
    }
  });
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const pokeTypeButton = screen.getAllByTestId(pokemonTypeButtonId);
    for (let i = 0; i < pokeTypeButton.length; i += 1) {
      fireEvent.click(pokeTypeButton[i]);
      expect(allButton).toBeVisible();
    }
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].innerHTML).toBe('All');
  });
  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const pokeTypeButton = screen.getAllByTestId(pokemonTypeButtonId);
    fireEvent.click(pokeTypeButton[1]);
    fireEvent.click(allButton);
    const pokemon = screen.getByTestId(pokemonNameId);
    const nextButton = screen.getByTestId(nextPokemonId);
    expect(pokemon.innerHTML).toBe('Pikachu');
    expect(nextButton).not.toHaveAttribute('disabled', '');
  });
});
