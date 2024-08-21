import { type FC, useState } from 'react'
import type { Props as SearchProps } from './search.astro'

const SearchBar: FC<SearchProps> = ({ value }) => {
  const [searchValue, setSearchValue] = useState(value)

  return (
    <form className='flex gap-1 font-sans' action='/search' method='get'>
      <input
        type='search'
        className='flex-1 min-w-0'
        name='q'
        id='searchBar'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label='Search'
      />
      <button
        type='submit'
        className='bg-zinc-400 disabled:opacity-[.5] px-4'
        disabled={!searchValue}
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
