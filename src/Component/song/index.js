import ButtonComponent from '../Button';
import './index.css';
const SongComponent = ({url, name, artists}) =>{
    return (
        <div className="song-wrapper">
            <div className="image-wrapper">
            <img src= {url} alt="album-img"></img>
            </div>
            <div className='text-wrapper'>
            <h3 className='song-title'>{name}</h3>
            <h4 className='song-artist'>{artists}</h4>
            </div>
            <ButtonComponent>Select</ButtonComponent>
        </div>
    )
}

export default SongComponent;