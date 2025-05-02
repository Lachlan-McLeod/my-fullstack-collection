import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface Game {
  id: number
  title: string
  release_date: string
  developer_id: number
  image: string | null
}

function About() {
  const { id } = useParams()
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(`/api/v1/games/${id}`)
      const data = await response.json()
      setGame(data)
    }

    fetchGameDetails()
  }, [id])

  if (!game) return <div>Loading...</div>

  return (
    <div>
      <h1>{game.title}</h1>
      <p>{game.release_date}</p>
      {game.image && <img src={`/images/${game.image}`} alt={game.title} />}
      <p>Developer ID: {game.developer_id}</p>
    </div>
  )
}

export default About