
import ButtonComponent from '../Button'
import SongComponent from '../Song';
import './index.css';

const SearchBar = (props) => {
    const {getTracks, handleInput, tracks, toggleSelect, input} = props
    
    return (
      <>
      <form className="search-form" onSubmit={getTracks}>
        <input 
            id = "searchKey"
            name = "searchKey"
            type= "text" 
            placeholder="Search Songs" 
            className="input-search" 
            value={input.searchKey}
            required 
            onChange={handleInput} />
        <ButtonComponent type="submit">Search</ButtonComponent>
      </form>
      <div className="content">
            {tracks.map(song => (
                <SongComponent 
                    key={song.id}
                    url={song.album.images[1].url}
                    name={song.name}
                    artists={song.artists[0].name}
                    toggleSelect = {() =>toggleSelect(song)}
                />
            ))}
      </div>
      </>
    )

}

export default SearchBar;