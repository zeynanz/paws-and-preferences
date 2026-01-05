import { useState, useRef } from 'react'
import CatCard from './components/CatCard'

function App() {
  const bgAudio = useRef(null)
  const [started, setStarted] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const [cats] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      url: `https://cataas.com/cat?unique=${Date.now()}-${i}`
    }))
  )

  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState([])

  const handleSwipe = (dir, cat) => {
    if (navigator.vibrate) navigator.vibrate(30)

    if (dir === 'right') {
      new Audio('/sounds/like.mp3').play()
      setLiked(prev => [...prev, cat])
    } else {
      new Audio('/sounds/dislike.mp3').play()
    }

    setIndex(prev => prev + 1)
  }

  const restartApp = () => {
    if (bgAudio.current) {
    bgAudio.current.pause()
    bgAudio.current.currentTime = 0
    bgAudio.current = null
  }
    setIndex(0)
    setLiked([])
    setStarted(false)
    setLeaving(false)
  }

  if (!started) {
    return (
      <div style={styles.container}>
        <h1 className={`fade-in ${leaving ? 'fade-out' : ''}`}>
          🐾 Paws & Preferences
        </h1>

        <img
          src={`https://cataas.com/cat?welcome=${Date.now()}`}
          alt="welcome cat"
          style={styles.welcomeImg}
          className={`fade-in ${leaving ? 'fade-out' : ''}`}
        />

        <p className={`fade-in ${leaving ? 'fade-out' : ''}`}>
          Find Your Favourite Kitty 😻
        </p>

        <button
          className={`fade-in ${leaving ? 'fade-out' : ''}`}
          style={styles.startBtn}
          onClick={() => {
            setLeaving(true)
             if (!bgAudio.current) {
              bgAudio.current = new Audio('/sounds/bg-music.mp3')
              bgAudio.current.loop = true
              bgAudio.current.volume = 0.3
              bgAudio.current.play()
            }
            setTimeout(() => setStarted(true), 600)
          }}
        >
          Start
        </button>
      </div>
    )
  }

  if (index >= cats.length) {
    return (
      <div style={styles.container}>
        <h1>🐾 Paws & Preferences</h1>
        <p>You liked {liked.length} cats 😻</p>

        <div style={styles.grid}>
          {liked.map(cat => (
            <img
              key={cat.id}
              src={cat.url}
              alt="liked cat"
              style={styles.thumb}
            />
          ))}
        </div>

        <button style={styles.startBtn} onClick={restartApp}>
          Restart
        </button>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1>🐾 Paws & Preferences</h1>

      {/* progress indicator */}
      <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {index + 1} / {cats.length}
      </p>

      <CatCard
        key={cats[index].id}
        cat={cats[index]}
        onSwipe={handleSwipe}
      />
      <div style={styles.actionButtons}>
        <button
          style={{ ...styles.actionBtn, backgroundColor: '#ddd', color: '#333' }}
          onClick={() => handleSwipe('left', cats[index])}
        >
          ❌ Dislike
        </button>

        <button
          style={{ ...styles.actionBtn, backgroundColor: '#ff7a7a', color: '#fff' }}
          onClick={() => handleSwipe('right', cats[index])}
        >
          ❤️ Like
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(4px)',
    textAlign: 'center',
    padding: '20px'
  },
  welcomeImg: {
    width: '260px',
    height: '260px',
    objectFit: 'cover',
    borderRadius: '20px',
    margin: '20px 0',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  startBtn: {
    marginTop: '20px',
    padding: '12px 40px',
    fontSize: '18px',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#ff7a7a',
    color: '#fff',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    padding: '20px'
  },
  thumb: {
    width: '100%',
    borderRadius: '10px'
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px'
  },
  actionBtn: {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    minWidth: '120px'
  }
}

export default App
