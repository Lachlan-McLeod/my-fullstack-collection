import { useQuery } from '@tanstack/react-query'
import { getAllGames } from '../../../server/db/games'

export default function useGames() {
  return useQuery({
    queryKey: ['games'],  
    queryFn: getAllGames,    
  })
}