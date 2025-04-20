import React, { useState } from 'react';

function RegisterUser() {
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de contraseñas
        if (formData.password !== formData.passwordConfirmation) {
            setResponseMessage('Las contraseñas no coinciden.');
            return;
        }

        console.log('Datos enviados:', formData); // Verifica los datos enviados

        try {
            const response = await fetch('http://localhost:8083/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setResponseMessage('Usuario registrado exitosamente.');
            } else {
                setResponseMessage('Error al registrar el usuario.');
            }
        } catch (error) {
            setResponseMessage('Error al conectar con la API.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre real:</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={formData.passwordConfirmation}
                        onChange={(e) => setFormData({ ...formData, passwordConfirmation: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

export default RegisterUser;