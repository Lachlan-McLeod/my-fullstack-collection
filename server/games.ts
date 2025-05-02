import express from 'express'
import * as db from './db/games.ts'
import connection from './db/connection.ts'


const router = express.Router()

// GET /api/v1/games

router.get('/', async (req, res) => {
  try {
    const games = await db.getAllGames() 
    res.json(games)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.log('Unknown error')
    }
    res.sendStatus(500) 
  }
})

router.get('/release/:id', async (req, res) => {
  const { id } = req.params
  const result = await connection('games').where('id', id).select('release_date').first()

  if (!result) return res.status(404).json({ message: 'Not found' })
  res.json({ release_date: result.release_date })
})

// Route to create a new game
router.post('/', async (req, res) => {
  const { id, title, developerId, releaseDate, image } = req.body
  const game = { id, title, developerId, releaseDate, image }
  try {
    const newGame = await db.createGame(game)  
    res.status(201).json(newGame)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.log('Failed to create new game')
    }
    res.sendStatus(500)
  }
})

// Route to delete a game
router.delete('/:gameId', async (req, res) => {
  const { gameId } = req.params

  try {
    const deletedGame = await db.deleteGame(Number(gameId))

    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' })
    }

    res.status(200).json({
      message: 'Game deleted successfully',
      game: deletedGame,
    })
  } catch (error) {
    console.error('Error deleting game:', error)
    res.status(500).json({ message: 'Failed to delete game' })
  }
})


router.patch('/:gameId', async (req, res) => {
  const { gameId } = req.params
  const { title, releaseDate, image } = req.body

  try {
    const updatedGame = await db.updateGame(Number(gameId), {
      title,
      releaseDate,
      image
    })

    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' })
    }

    res.status(200).json(updatedGame)
  } catch (error) {
    console.error('Error updating game:', error)
    res.status(500).json({ message: 'Failed to update game' })
  }
})



export default router