import data from '../../sample/single-sample.js';
import SongComponent from '../../Component/song';
import ButtonComponent from '../../Component/button';
import '../../App.css';

const HomePage = () => {
    return (
        <div className="container">
            <SongComponent
                url ={data.album.images[1].url}
                name = {data.name}
                artists = {data.artists[0].name}
            />
            <ButtonComponent />
        </div>
    )
}

export default HomePage;