export async function getGames() {
  const response = await fetch('/api/v1/games') 
  if (!response.ok) {
    throw new Error('Failed to fetch games')
  }
  return response.json()  
}