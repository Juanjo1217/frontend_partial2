import React, { useEffect, useState } from 'react';

function TweetList() {
  const [tweets, setTweets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTweets = async () => {
      const token = localStorage.getItem('authToken'); // Obtén el token almacenado
      try {
        const response = await fetch('http://localhost:8083/api/tweets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token, // Agrega el token a los headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Datos recibidos:', data);
          setTweets(data.data); // Accede a la propiedad "data" que contiene el arreglo de tweets
        } else {
          setErrorMessage('Error al obtener las publicaciones.');
        }
      } catch (error) {
        setErrorMessage('Error al conectar con la API.');
      }
    };

    fetchTweets();
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Publicaciones Recientes</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {Array.isArray(tweets) && tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <p>
                <strong>{tweet.user.username}</strong>: {tweet.content}
              </p>
            </li>
          ))
        ) : (
          <p>No hay publicaciones disponibles.</p>
        )}
      </ul>
    </div>
  );
}

export default TweetList;