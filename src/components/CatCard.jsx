import { useRef, useState } from 'react'

function CatCard({ cat, onSwipe }) {
  const startX = useRef(0)
  const [deltaX, setDeltaX] = useState(0)

  const handleStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  const handleMove = (e) => {
    const currentX = e.touches ? e.touches[0].clientX : e.clientX
    setDeltaX(currentX - startX.current)
  }

  const handleEnd = () => {
    if (deltaX > 100) onSwipe('right', cat)
    else if (deltaX < -100) onSwipe('left', cat)
    setDeltaX(0)
  }

  return (
    <div
      style={{
        ...styles.card,
        transform: `translateX(${deltaX}px) rotate(${deltaX / 15}deg)`
      }}
      onMouseDown={handleStart}
      onMouseMove={(e) => deltaX !== 0 && handleMove(e)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <img src={cat.url} alt="cat" style={styles.image} />
    </div>
  )
}

const styles = {
  card: {
    width: '300px',
    height: '420px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'transform 0.3s ease-out'
  },
  image: {
    width: '100%',
    height: '90%',
    objectFit: 'cover',
    borderRadius: '20px'
  },
  hint: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center'
  }
}

export default CatCard
