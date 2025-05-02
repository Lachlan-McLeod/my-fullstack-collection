export interface Game {
  id: number
  title: string
  releaseDate: string 
  developerId: number
  image: string | null
}

// table.integer('id').primary()
// table.integer('developer_id')
// table.string('title')
// table.string('release_date')