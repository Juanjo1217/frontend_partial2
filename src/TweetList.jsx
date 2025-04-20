import React, { useEffect, useState } from 'react';

function TweetList() {
  const [tweets, setTweets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentText, setCommentText] = useState({});
  const token = localStorage.getItem('authToken');
  const authUserId = localStorage.getItem('authUserId');

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/tweets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sortedTweets = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTweets(sortedTweets);
      } else {
        setErrorMessage('Error al obtener las publicaciones.');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con la API.');
    }
  };

  const handleDelete = async (tweetId) => {
    try {
      const response = await fetch(`http://localhost:8083/api/tweets/${tweetId}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      });

      if (response.ok) {
        setTweets(tweets.filter(tweet => tweet._id !== tweetId));
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      const response = await fetch('http://localhost:8083/api/tweets/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ tweetId }),
      });
  
      if (response.ok) {
        const updatedTweet = await response.json();
  
        // Actualizar el estado con el tweet actualizado del backend
        setTweets((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet._id === tweetId ? updatedTweet : tweet
          )
        );
      } else {
        console.error('Error al actualizar el like:', await response.text());
      }
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const handleComment = async (tweetId) => {
    const comment = commentText[tweetId];
    if (!comment || comment.trim() === '') return;
  
    try {
      const response = await fetch('http://localhost:8083/api/tweets/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ comment, tweetId }),
      });
  
      if (response.ok) {
        const updatedTweet = await response.json();
  
        // Actualizar el estado con el tweet actualizado del backend
        setTweets((prevTweets) =>
          prevTweets.map((tweet) =>
            tweet._id === tweetId ? updatedTweet : tweet
          )
        );
  
        // Limpiar el campo de texto del comentario
        setCommentText((prev) => ({ ...prev, [tweetId]: '' }));
      } else {
        console.error('Error al agregar el comentario:', await response.text());
      }
    } catch (error) {
      console.error('Error al comentar:', error);
    }
  };

  return (
    <div>
      <h2>Publicaciones Recientes</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id} style={{ marginBottom: '25px' }}>
            <p><strong>{tweet.user.username || 'Usuario desconocido'}</strong>: {tweet.content}</p>
            <p>Likes: {tweet.likes || 0}</p>
            <button
              onClick={() => handleLike(tweet._id)}
              disabled={tweet.likedBy?.includes(authUserId)} // Deshabilitar si el usuario ya dio like
            >
              {tweet.likedBy?.includes(authUserId) ? '✅ Ya te gusta' : '❤️ Me gusta'}
            </button>
  
            {/* Mostrar el botón de eliminar solo si el usuario autenticado es el propietario */}
            {authUserId === tweet.user._id && (
              <button onClick={() => handleDelete(tweet._id)} style={{ marginLeft: '10px' }}>🗑 Eliminar</button>
            )}
  
            {/* Comentarios */}
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Escribe un comentario"
                value={commentText[tweet._id] || ''}
                onChange={(e) =>
                  setCommentText({ ...commentText, [tweet._id]: e.target.value })
                }
              />
              <button onClick={() => handleComment(tweet._id)}>💬 Comentar</button>
            </div>
  
            <ul>
              {tweet.comments && tweet.comments.length > 0 ? (
                tweet.comments.map((comment, idx) => (
                  <li key={idx}>
                    <strong>{comment.user?.username || 'Anónimo'}:</strong> {comment.comment || 'Sin contenido'}
                  </li>
                ))
              ) : (
                <li style={{ fontStyle: 'italic' }}>Sin comentarios aún</li>
              )}
            </ul>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TweetList;
