import './index.css';
const SongComponent = ({url, name, artists, children}) =>{
    return (
        <div className="song-wrapper">
            <div className="image-wrapper">
            <img src={url} alt='album-image'></img>
            </div>
            <div className='text-wrapper'>
            <h2 className='song-title'>{name}</h2>
            <h4 className='song-artist'>{artists}</h4>
            </div>
            {children}
        </div>
    )
}

export default SongComponent;