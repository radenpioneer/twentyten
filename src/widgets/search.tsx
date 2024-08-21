import { type FC, useState } from 'react'
import type { Props as SearchProps } from './search.astro'

const SearchBar: FC<SearchProps> = ({ value }) => {
  const [searchValue, setSearchValue] = useState(value)

  return (
    <form className='flex gap-1' action='/search' method='get'>
      <input
        type='search'
        className='flex-1'
        name='q'
        id='searchBar'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label='Pencarian'
      />
      <button
        type='submit'
        className='bg-zinc-400 px-4 py-1 disabled:opacity-[.5]'
        disabled={!searchValue}
      >
        Cari
      </button>
    </form>
  )
}

export default SearchBar
