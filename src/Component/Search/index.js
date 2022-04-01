import { useEffect, useState } from 'react';
import ButtonComponent from '../Button'
import SongComponent from '../Song';
import axios from 'axios';
//import './index.css'

const SearchBar = ({accessToken}) => {
    const [searchKey, setKey] = useState('')
    const [tracks, setTracks] = useState([])
    const [selectedTracksUri, setSelectedTracksUri] = useState([])
    const [isInSearch, setIsInSearch] = useState(false);

    useEffect (()=> {
        if(!isInSearch){
            const selectedTracks = tracks.filter((track) => selectedTracksUri.includes(track.uri));
            setTracks(selectedTracks);
        }
    }, [selectedTracksUri]);

    const handleInput = (e) => {
        setKey(e.target.value)
    }

    const getTracks = async (e) => {
        e.preventDefault();        
        try {
            const {data} = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${searchKey}`, {
                headers: {
                   'Authorization' : `Bearer ${accessToken}`,
                }
            })
            setIsInSearch(true);
            const trackData = data.tracks.items;
            const selectedTracks = tracks.filter((track)=>selectedTracksUri.includes(track.uri));
            const searchedTracks = trackData.filter((track)=> !selectedTracksUri.includes(track.uri));

            setTracks([...selectedTracks, ...searchedTracks]);
        }
        catch(e){
            alert(e);
        }
        console.log(accessToken)
        console.log(searchKey)
    }

    const toggleSelect = (track) =>{
        const uri = track.uri;
        if (selectedTracksUri.includes(uri)) {
            setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
        } else {
            setSelectedTracksUri([...selectedTracksUri, uri]);
        }
    }

    const renderTracks= () =>{
        return tracks.map(song => (
            <SongComponent 
                key={song.id}
                url={song.album.images[1].url}
                name={song.name}
                artists={song.artists[0].name}
                toggleSelect = {() =>toggleSelect(song)}
             />
        ))
    }
    
    return (
      <>
      <form className="search-form" onSubmit={getTracks}>
        <input type="text" placeholder="Search Songs" className="input-search" required onChange={handleInput} />
        <ButtonComponent type="submit">Search</ButtonComponent>
      </form>
      <div className="content">
          {renderTracks()}
      </div>
      </>
    )

}

export default SearchBar;