import { useMutation } from '@tanstack/react-query'

interface GameData {
  title: string
  developer_id: number
  release_date: string
  image: string
}

interface GameResponse {
  id: number
  title: string
  developer_id: number
  release_date: string
  image: string
}

const addGame = async (gameData: GameData): Promise<GameResponse> => {
  const response = await fetch('/api/v1/games/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
  })

  if (!response.ok) {
    throw new Error('Failed to create game')
  }

  return response.json()
}

const useAddGame = () => {
  return useMutation<GameResponse, Error, GameData>({
    mutationFn: addGame, 
  })
}

export default useAddGame