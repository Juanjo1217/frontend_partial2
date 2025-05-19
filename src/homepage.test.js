import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

test('renderiza el título de la página principal', () => {
    render(<Homepage />);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
});