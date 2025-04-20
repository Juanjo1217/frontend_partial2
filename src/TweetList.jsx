import React, { useEffect, useState } from 'react';

function TweetList() {
  const [tweets, setTweets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/tweets',
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token'), // Agrega el token a los headers
                },
            }
        );
        if (response.ok) {
          const data = await response.json();
          setTweets(data);
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
        {tweets.map((tweet, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <p><strong>{tweet.author}</strong>: {tweet.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TweetList;