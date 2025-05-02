import { useMutation, useQueryClient } from '@tanstack/react-query'

type UpdatedGame = {
  id: number
  title: string
  release_date: string
  image: string
}

const useUpdateGame = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdatedGame, Error, UpdatedGame>({
    mutationFn: async (updatedGame: UpdatedGame) => {
      const response = await fetch(`/api/v1/games/${updatedGame.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedGame.title,
          release_date: updatedGame.release_date,
          image: updatedGame.image,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update game')
      }

      return response.json()
    },
    onSuccess: (updatedGame) => {
      console.log('Game updated successfully:', updatedGame)

      queryClient.setQueryData<UpdatedGame[]>(['games'], (oldGames) => {
        if (!oldGames) return []
        return oldGames.map((game) =>
          game.id === updatedGame.id ? updatedGame : game
        )
      })
    },
    onError: (error) => {
      console.error('Error updating game:', error)
    },
  })
}

export default useUpdateGame