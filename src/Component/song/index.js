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
            <h3 className='song-title'>{name}</h3>
            <h4 className='song-artist'>{artists}</h4>
            </div>
            <ButtonComponent onClick={handleSelect}>{isSelected? 'Deselect' : 'Select'}</ButtonComponent>
        </div>
    )
}

export default SongComponent;