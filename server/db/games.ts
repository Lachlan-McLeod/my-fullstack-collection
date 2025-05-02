import { Game } from '../../models/games'
import connection from './connection'

export const gameKeys = [
  'games.id as id',
  'games.developer_id as developerId',
  'games.title as title',
  'games.release_date as releaseDate',
  'games.image as image',
]


export async function getAllGames(): Promise<Game[]> {
  try {
    const result = await connection('games').select(...gameKeys)
    return result as Game[]
  } catch (error) {
    console.error('Error in getAllGames:', error)
    throw error
  }
}
// Create a game (Insert)
export async function createGame(game: Game): Promise<Game> {
  try {
    const result = await connection('games').insert({
      title: game.title,
      developer_id: game.developerId,
      release_date: game.releaseDate,
      image: game.image,
    }).returning('*')

    return result[0]
  } catch (error: unknown) { 
    if (error instanceof Error) {
      console.error('Error while inserting game into the database:', error.message)
    } else {
      console.error('An unknown error occurred:', error)
    }
    throw new Error('Failed to create game')
  }
}

// Delete a game (Delete)
export async function deleteGame(gameId: number): Promise<Game | null> {
  const gameToDelete = await connection('games')
    .where('id', gameId)
    .first()

  if (!gameToDelete) {
    return null
  }

  await connection('games')
    .where('id', gameId)
    .del()

  return gameToDelete
}

// Update a game (Update)
export async function updateGame(gameId: number, updatedData: Partial<Game>): Promise<Game | null> {
  await connection('games')
  .where('id', gameId)
  .update(updatedData)

const updatedGame = await connection('games')
  .where('id', gameId)
  .first()

return updatedGame || null
}