import ButtonComponent from "../Button"

const PlayListForm = (props) => {
    const {handleInput, input, createPlaylist} = props
    return (
        <>
            <h3>Create Playlist</h3>
            <div className='playlist-form'>
                <form className='create-playlist' onSubmit = {createPlaylist}>
                    <div> 
                        <input 
                            id ="playlistTitle"
                            type="text" 
                            name="playlistTitle" 
                            placeholder="Input Your Playlist Name..." 
                            value = {input.playlistTitle}
                            required 
                            onChange={handleInput}
                        /> 
                    </div>
                    <br />  
                    <div>
                        <textarea 
                            id = "playlistDesc"
                            name = "playlistDesc"
                            type = "text-area" 
                            placeholder = "Input Playlist Description..."  
                            value={input.playlistDesc}
                            onChange={handleInput}></textarea>
                    </div>
                    <ButtonComponent type="submit" >Create</ButtonComponent>
                    <br /> 
                    <br /> 
                </form>
            </div>
        </>
    )
}

export default PlayListForm;