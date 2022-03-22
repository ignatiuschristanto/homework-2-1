import './App.css';
import data from './sample/single-sample.js';

function App() {
  return (
    <div className="App">
      <div className="image-wrapper">
        <img src={data.album.images[1].url} alt='album-image'></img>
      </div>
      <div className='text-wrapper'>
        <h2 className='song-title'>{data.name}</h2>
        <h3 className='song-artist'>{data.artists[0].name}</h3>
        <button type="button" className='new-btn'>Select</button>
      </div>
    </div>
  );
}

export default App;
