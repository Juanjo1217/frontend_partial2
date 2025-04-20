import React, { useState } from 'react';
import TweetList from './TweetList';

function Homepage() {
  const [tweet, setTweet] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Obtén el token almacenado

    try {
      const response = await fetch('http://localhost:8083/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": token, // Agrega el token a los headers
        },
        body: JSON.stringify({ content: tweet }),
      });

      if (response.ok) {
        setResponseMessage('Publicación realizada con éxito.');
        setTweet(''); // Limpia el campo de texto después de publicar
      } else {
        setResponseMessage('Error al realizar la publicación.');
      }
    } catch (error) {
      setResponseMessage('Error al conectar con la API.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>Has iniciado sesión exitosamente.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Escribe tu publicación:</label>
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            rows="4"
            cols="50"
            placeholder="¿Qué estás pensando?"
            required
          />
        </div>
        <button type="submit">Publicar</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      {/* Mostrar la lista de publicaciones */}
      <TweetList />
    </div>
  );
}

export default Homepage;