import data from '../../sample/data';
import SongComponent from '../../Component/song';
import ButtonComponent from '../../Component/button';
import '../../App.css';

const HomePage = () => {
    return (
        <div className="container">
            <h1 className='playlist-title'>Your Playlist</h1>
            {data.map((song,index) =>(
                <SongComponent
                    key = {song.id}
                    url ={song.album.images[1].url}
                    name = {song.name}
                    artists = {song.artists[0].name}
                >
                    <ButtonComponent />
                </SongComponent>
            ))}
            
            
        </div>
    )
}

export default HomePage;