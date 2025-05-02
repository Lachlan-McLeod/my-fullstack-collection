import { useState, useEffect } from 'react'
import useFetchGames from "../apis/Hooks/useFetchGames"
import AddGameForm from './addGameForm'
import useDeleteGame from '../apis/Hooks/useDeleteGame'
import UpdateGameForm from './UpdateGameForm'
import '../styles/App.css'
import { Game } from '../../models/games'



const Home = () => {
  const { games, loading, error, } = useFetchGames()  
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { mutate: deleteGame } = useDeleteGame()
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [releaseDates, setReleaseDates] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchMissingReleaseDates = async () => {
      const missing = games.filter(game => !game.release_date && !releaseDates[game.id])
  
      for (const game of missing) {
        try {
          const res = await fetch(`/api/v1/games/release/${game.id}`)
          const data = await res.json()
          setReleaseDates(prev => ({ ...prev, [game.id]: data.release_date }))
        } catch (err) {
          console.error(`Failed to fetch release date for game ${game.id}`, err)
        }
      }
    }
  
    fetchMissingReleaseDates()
  }, [games])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }

  const handleDelete = (gameId: number) => {
    deleteGame(gameId, {
      onSuccess: () => {
        window.location.reload()
      }
    })
  }

  const handleUpdate = (game: Game) => {
    setSelectedGame(game)  
  }

  const handleCloseUpdateForm = () => {
    setSelectedGame(null)  
  }

  return (
    <div>
      <header className="navbar" role="banner">
        <h1>Games DB</h1>
        <nav role="navigation">
          <ul className="navbar-links">
          </ul>
        </nav>
      </header>

      <main role="main" className="container">
        <h2>Games</h2>
        <button onClick={toggleFormVisibility}>
          {isFormVisible ? 'Hide' : 'Add a New Game'}
        </button>

        {isFormVisible && <AddGameForm />}

        <section aria-labelledby="games-grid-title">
        <h2 id="games-grid-title">Game Collection</h2>
          {games.map((game) => (
            <div key={game.id} className="game-card" role="article">
              <h3>{game.title}</h3>
              <p>Release Date: {game.release_date}</p>

              <div className="game-image-container">
                {game.image ? (
                  <img
                    src={game.image.includes('http') ? game.image : `/images/${game.image}`}
                    alt={game.title}
                    className="game-image"
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>

              <button onClick={() => handleDelete(game.id)}>Delete</button>
              <button onClick={() => handleUpdate(game)}>Update</button>
            </div>
          ))}
        </section>
      </main>

      {selectedGame && <UpdateGameForm game={selectedGame} onClose={handleCloseUpdateForm} />}
    </div>
  )
}

export default Home