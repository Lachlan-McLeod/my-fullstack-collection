import { useState } from 'react'
import useAddGame from '../apis/Hooks/useAddGame'

const AddGameForm = () => {
  const [title, setTitle] = useState('')
  const [developerId, setDeveloperId] = useState(0)
  const [release_date, setReleaseDate] = useState('')
  const [image, setImage] = useState('')
  
  const { mutate } = useAddGame()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const gameData = { title, developer_id: developerId, release_date: release_date, image }
    mutate(gameData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="developerId">Developer ID</label>
        <input 
          type="number" 
          id="developerId" 
          value={developerId} 
          onChange={(e) => setDeveloperId(Number(e.target.value))} 
        />
      </div>
      <div>
        <label htmlFor="release_date">Release Date</label>
        <input 
          type="date" 
          id="release_date" 
          value={release_date} 
          onChange={(e) => setReleaseDate(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input 
          type="text" 
          id="image" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
        />
      </div>
      <button type="submit">Add Game</button>
    </form>
  )
}

export default AddGameForm