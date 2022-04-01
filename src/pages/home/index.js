import SearchBar from '../../Component/Search';
import ButtonComponent from '../../Component/Button';
import '../../App.css';
import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [accessToken, setAccessToken] = useState('')
    
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if(!token && hash){
            token = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token",token)
        }
        setAccessToken(token)
    },[])

    const getSpotifyLinkAuthorize= () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = 'http://localhost:3000';
        const scope = 'playlist-modify-private';
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
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
                    <SearchBar
                    accessToken={accessToken}/>
                    <ButtonComponent className='new-btn' onClick = {logout}>Logout</ButtonComponent>
                </div>
                
            )}
        </>
    )
      
}


export default HomePage;