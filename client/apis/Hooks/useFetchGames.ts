import { useQuery } from "@tanstack/react-query"

interface Game {
  id: number
  title: string
  release_date: string
  image: string | null
  developer_id: number 
}

const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch("/api/v1/games")
  if (!response.ok) {
    throw new Error("Failed to fetch games")
  }
  return response.json()
}

const useFetchGames = () => {
  const { data, isLoading, error } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: fetchGames,
  })

  return {
    games: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  }
}

export default useFetchGames