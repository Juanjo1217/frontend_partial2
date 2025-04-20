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






  const handleLike = async (tweetId, like) => {
    const token = localStorage.getItem('authToken'); // Obtén el token almacenado

    if (!tweetId || (like !== 1 && like !== 0)) {
      console.error('Parámetros inválidos:', { like, tweetId });
      return;
    }
    try {
      const response = await fetch('http://localhost:8083/api/tweets/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token, // Agrega el token a los headers
        },
        body: JSON.stringify({ like, tweetId }),
      });

      if (response.ok) {
        setTweets((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet._id === tweetId
              ? { ...tweet, likes: like === 1 ? tweet.likes + 1 : tweet.likes - 1 }
              : tweet
          )
        );
      } else {
        console.error('Error al actualizar el like. Código de estado:', response.status);
      }
    } catch (error) {
      console.error('Error al conectar con la API para el like:', error);
    }
  };







  const handleDelete = async (tweetId) => {
    const token = localStorage.getItem('authToken'); // Obtén el token almacenado

    try {
      const response = await fetch('http://localhost:8083/api/tweets', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token, // Agrega el token a los headers
        },
        body: JSON.stringify({ tweetId }), // Envía el tweetId en el cuerpo
      });

      if (response.ok) {
        // Elimina el tweet localmente
        setTweets((prevTweets) => prevTweets.filter((tweet) => tweet._id !== tweetId));
      } else {
        console.error('Error al eliminar el tweet. Código de estado:', response.status);
      }
    } catch (error) {
      console.error('Error al conectar con la API para eliminar el tweet:', error);
    }
  };





  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Publicaciones Recientes</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {Array.isArray(tweets) && tweets.length > 0 ? (
          tweets.map((tweet) => (
            <li key={tweet._id} style={{ marginBottom: '10px' }}>
              <p>
                <strong>{tweet.user?.username || 'Usuario desconocido'}</strong>: {tweet.content || 'Sin contenido'}
              </p>
              <p>Likes: {tweet.likes || 0}</p>
              <button onClick={() => handleLike(tweet._id, 1)}>Me gusta</button>
              <button onClick={() => handleDelete(tweet._id)} style={{ color: 'red' }}>
                Eliminar
              </button>
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