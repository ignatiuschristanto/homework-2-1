import ButtonComponent from '../Button';
import { useState } from 'react';
import './index.css';
const SongComponent = (props) =>{
    const {url, name, artists, toggleSelect} = props
    const [isSelected,setIsSelected] = useState(false)

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    }

    return (
        <div className="song-wrapper">
            <div className="image-wrapper">
            <img src= {url} height={200} width={200} alt="album-img"></img>
            </div>
            <div className='text-wrapper'>
            <p className='song-title'>{name}</p>
            <p className='song-artist'>{artists}</p>
            <ButtonComponent onClick={handleSelect}>{isSelected? 'Deselect' : 'Select'}</ButtonComponent>
            </div>
            
        </div>
    )
}

export default SongComponent;