import { useState } from 'react'

function ProgressTracker() {
  const [game, setGame] = useState('')
  const [progress, setProgress] = useState(0)

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value))
  }

  const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value)
  }

  const saveProgress = () => {
    alert(`Progress for ${game} saved: ${progress}%`)
  }

  return (
    <div className="progress-tracker">
      <h2>Track Your Progress</h2>
      <label htmlFor="game">Game: </label>
      <input 
        type="text" 
        id="game" 
        value={game} 
        onChange={handleGameChange} 
        placeholder="Enter game title"
      />
      <label htmlFor="progress">Progress: </label>
      <input 
        type="number" 
        id="progress" 
        value={progress} 
        onChange={handleProgressChange} 
        min="0" 
        max="100" 
        step="1" 
      />
      <button onClick={saveProgress}>Save Progress</button>
    </div>
  )
}

export default ProgressTracker