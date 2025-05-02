type SearchFormProps = {
  onSearch: (searchTerm: string) => void
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchInput = (e.target as HTMLFormElement).search.value
    onSearch(searchInput)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        className="search-bar" 
        placeholder="Search for a game..."
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  )
}