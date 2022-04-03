import SearchBar from '../../Component/Search';
import ButtonComponent from '../../Component/Button';
import '../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayListForm from '../../Component/PlaylistForm';

const HomePage = () => {
    const [input, setInput] = useState ({
        playlistTitle: '',
        playlistDesc: '',
        searchKey: ''
    })
    const [accessToken, setAccessToken] = useState('')
    const [tracks, setTracks] = useState([])
    const [selectedTracksUri, setSelectedTracksUri] = useState([])
    const [isInSearch, setIsInSearch] = useState(false);
    const [userID, setUserID] = useState("");
    const [currentProfileData, setCurrentProfileData] = useState([]);

    useEffect (()=> {
        if(!isInSearch){
            const selectedTracks = tracks.filter((track) => selectedTracksUri.includes(track.uri));
            setTracks(selectedTracks);
        }
    }, [selectedTracksUri]);

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if(!token && hash){
            token = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token",token)
        }
        setAccessToken(token)

        const getUserData = async () =>{
            await axios.get(`https://api.spotify.com/v1/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }).then ((response) => {
                console.log(response);
                setCurrentProfileData(response.data);
                setUserID(response.data.id);
                }
            )
        }
        if(accessToken){
            getUserData();
        }
    },[])

    const getSpotifyLinkAuthorize= () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = 'http://localhost:3000';
        const scope = 'playlist-modify-private';
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const getTracks = async (e) => {
        e.preventDefault();        
        try {
            const {data} = await axios.get(`https://api.spotify.com/v1/search?type=track&q=${input.searchKey}`, {
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
        console.log(input.searchKey)
    }

    const toggleSelect = (track) =>{
        const uri = track.uri;
        if (selectedTracksUri.includes(uri)) {
            setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
        } else {
            setSelectedTracksUri([...selectedTracksUri, uri]);
        }
    }

    const CreatePlaylist = async () => {
        const data = JSON.stringify({
            name: input.playlistTitle,
            description: input.playlistDesc,
            public: false,
            collaborative: false,
        })

        const headerConfig = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type' : 'application/json',
            },
        }

        const response = await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`,
            data, 
            headerConfig
        );
        return response.data.id;
    }

    const AddMusicToCreatedPlaylist = async (playListID) => {
        let uris = selectedTracksUri;
        console.log("PlayListID")
        console.log(playListID);
        console.log(uris);
        const data = JSON.stringify({
            uris
        });

        const headerConfig = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type' : 'application/json',
            },
        }

        console.log(data);
        const response = await axios.post(`https://api.spotify.com/v1/playlists/${playListID}/tracks`,
            data, 
            headerConfig);
        console.log(response);
        alert("PlayList Created");
    }

    const CreateAndAddToPlaylist = async (e) =>{
        e.preventDefault();
        const playListID = await CreatePlaylist();

        await AddMusicToCreatedPlaylist(playListID);
    }

    const logout = () =>{
        setAccessToken("")
        window.localStorage.removeItem('token')
        //console.log(accessToken)
    }

    return (
        <>
            {!accessToken && (
                <div className="container">
                    <h1>Please Login to Continue</h1>
                    <a href={getSpotifyLinkAuthorize()}><ButtonComponent>Login</ButtonComponent></a>
                </div>
            )}
            {accessToken && (
                <div className="container">
                    <div className='playlist-container'>
                        <PlayListForm
                            handleInput = {handleInput}
                            input = {input}
                            createPlaylist = {CreateAndAddToPlaylist}
                             />
                    </div>
                    <div className='search-container'>
                        <SearchBar
                            handleInput = {handleInput}
                            getTracks = {getTracks}
                            tracks = {tracks}
                            toggleSelect = {toggleSelect}
                            input = {input}
                        />
                    </div>        
                    
                    <ButtonComponent className='new-btn' onClick = {logout}>Logout</ButtonComponent>
                </div>
                
            )}
        </>
    )
      
}


export default HomePage;