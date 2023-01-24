import { React } from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

test('Teste se a página contém um heading h2 com o texto \'Page requested not found\'', () => {
  render(<NotFound />);
  const h2 = screen.getByRole('heading', { name: 'Page requested not found' });
  expect(h2).toBeInTheDocument();
});

test('Teste se a página mostra a imagem', () => {
  render(<NotFound />);
  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
