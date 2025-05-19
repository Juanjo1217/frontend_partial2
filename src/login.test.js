import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './login';

test('renderiza el formulario de login', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
});

test('muestra mensaje de error si las credenciales son incorrectas', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: false })
  );
  render(<BrowserRouter><Login /></BrowserRouter>);
  fireEvent.change(screen.getByLabelText(/Nombre de Usuario/i), { target: { value: 'user' } });
  fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrong' } });
  fireEvent.click(screen.getByText(/Iniciar Sesión/i));
  expect(await screen.findByText(/Credenciales incorrectas/i)).toBeInTheDocument();
});