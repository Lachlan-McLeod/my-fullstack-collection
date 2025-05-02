import React, { useState } from 'react'
import useUpdateGame from '../apis/Hooks/useUpdateGame'
import '../styles/UpdateGameForm.css'

interface Game {
  id: number
  title: string
  release_date: string
  developer_id: number
  image: string
}

const UpdateGameForm = ({ game, onClose }: { game: Game, onClose: () => void }) => {
  const [title, setTitle] = useState(game.title || '')
  const [release_date, setReleaseDate] = useState(game.release_date || '')
  const [image, setImage] = useState(game.image || '')

  const { mutate } = useUpdateGame() 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    mutate({
      id: game.id, 
      title,
      release_date,
      image
    })
  }

  return (
    <div className="update-game-form">
      <h3>Update Game</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="release_date">Release Date</label>
          <input
            type="text"
            placeholder="yyyy-mm-dd"
            pattern="\d{4}-\d{2}-\d{2}"
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn primary-btn">Update Game</button>
          <button type="button" className="btn cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateGameForm