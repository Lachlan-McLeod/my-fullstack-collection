import { useMutation, useQueryClient } from "@tanstack/react-query"

type Game = {
  id: number
  title: string
  developer: string
  release_date: string
}

const useDeleteGame = () => {
  const queryClient = useQueryClient()

  return useMutation<number, Error, number>({
    mutationFn: async (gameId: number) => {
      const response = await fetch(`/api/v1/games/${gameId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete the game, Status: ${response.status}`)
      }

      return gameId 
    },
    onSuccess: (deletedGameId) => {
      queryClient.setQueryData<Game[]>(['games'], (oldGames) => {
        if (!oldGames) return []
        return oldGames.filter((game) => game.id !== deletedGameId)
      })
    },
    onError: (error) => {
      console.error('Error deleting game:', error)
    }
  })
}

export default useDeleteGame