import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Datos enviados:', formData); // Verifica los datos enviados
    
    try {
      const response = await fetch('http://localhost:8083/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); 

        console.log('Respuesta del servidor:', data); 
        
        const token = data.data.token;  
        console.log('Token recibido:', token); 
        localStorage.setItem('authToken', token); 
        setResponseMessage('Inicio de sesión exitoso.');
        navigate('/homepage'); 
      } else {
        setResponseMessage('Credenciales incorrectas.');
      }
    } catch (error) {
      setResponseMessage('Error al conectar con la API.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;