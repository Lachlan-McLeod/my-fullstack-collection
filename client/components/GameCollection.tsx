import { useQuery } from '@tanstack/react-query'

type Game = {
  id: number
  title: string
  developerId: number
  release_date: string
  image: string
}

async function fetchGames(searchTerm: string) {
  const queryParam = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''
  const response = await fetch(`/api/v1/games${queryParam}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

type GameListProps = {
  searchTerm: string
}

export default function GameList({ searchTerm }: GameListProps) {
  const { data, error, isLoading } = useQuery<Game[], Error>({
    queryKey: ['games', searchTerm], 
    queryFn: () => fetchGames(searchTerm), 
  })

  if (isLoading) return <div>Loading...</div>
  if (error instanceof Error) return <div>Error: {error.message}</div>

  return (
    <div className="game-grid">
      {data && data.length > 0 ? (
        data.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.title}</h3>
            <p>Release Date: {game.release_date}</p>
            {game.image && (
              <img 
                src={`/images/${game.image}`} 
                alt={game.title}
                className="game-image"
              />
            )}
          </div>
        ))
      ) : (
        <p>No games found</p>
      )}
    </div>
  )
}