import {SearchBar} from '../../Component/Search';
import SongComponent from '../../Component/Song';
import ButtonComponent from '../../Component/Button';
import '../../App.css';
import React, { Component } from 'react';

class HomePage extends Component {
    state = {
        accessToken: '',
        tracks: [],
    }

    getHashParams() {
        const hashParams = {};
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        let e = r.exec(q);
    
        while (e) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
          e = r.exec(q);
        }
        return hashParams;
      }
    
    componentDidMount() {
        const params = this.getHashParams();
        const { access_token: accessToken } = params;
        this.setState({ accessToken })
    }
    
      getSpotifyLinkAuthorize() {
        const clientId = '70cf9cefa8974d39ac631f97d6bc02cf';
        const redirectUri = 'http://localhost:3000';
        const scope = 'playlist-modify-private';
    
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
      }

      handleInput(e){
        this.setState({searchKey : e.target.value})
      }

      getTracks = async(e) => {
        e.preventDefault();
        const tracks = await fetch(`https://api.spotify.com/v1/search?type=track&q=${this.searchKey}`, {
            headers: {
                Authorization: `Bearer ${this.state.accessToken}`
            },
        }).then((response) => response.json());
        this.setState({tracks})
        //console.log({tracks})
      }

      onSuccessSearch(tracks) {
        this.setState({tracks});
      }

      render(){
        
        return (
            <>
            {!this.state.accessToken && (
                <div className="container">
                    <h1>Please Login to Continue</h1>
                    <a href={this.getSpotifyLinkAuthorize()}><ButtonComponent>Login</ButtonComponent></a>
                </div>
            )}

            {this.state.accessToken && (
                <div className="container">
                    <SearchBar
                        accessToken={this.state.accessToken}
                        onSuccess={(tracks) => this.onSuccessSearch(tracks)}
                    />
                    <div className="content">
                        {this.state.tracks.length === 0 && (
                            <p></p>
                        )}
                        <div className="song-content">
                            {this.state.tracks.map((song) => (
                                <SongComponent 
                                    key={song.id}
                                    url={song.album.images[1].url}
                                    name={song.name}
                                    artists={song.artists[0].name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            </>
            
            
        )
      }
        
}

export {HomePage};