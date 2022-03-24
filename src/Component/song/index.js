const SongComponent = ({url, name, artists}) =>{
    return (
        <div className="song-wrapper">
            <div className="image-wrapper">
            <img src={url} alt='album-image'></img>
            </div>
            <div className='text-wrapper'>
            <h2 className='song-title'>{name}</h2>
            <h3 className='song-artist'>{artists}</h3>
            </div>
        </div>
    )
    
    
}

export default SongComponent;