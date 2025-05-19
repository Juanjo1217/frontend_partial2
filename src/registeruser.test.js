import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterUser from './registerUser';

test('renderiza el formulario de registro', () => {
  render(<BrowserRouter><RegisterUser /></BrowserRouter>);
  expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument();
});