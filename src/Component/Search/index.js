import React, { Component } from 'react';
import Button from '../Button'
//import './index.css'

class SearchBar extends Component {
  state = {
    searchKey: '',
  }

  handleInput = (e) => {
    this.setState({searchKey : e.target.value});
  }

  getTracks = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${this.state.searchKey}`, {
            headers: {
                'Authorization': `Bearer ${this.state.accessToken}`,
            }
        }).then((data) => data.json());
        const tracks = response.tracks.items;
        this.props.onSuccess(tracks);
    }
    catch(e){
        alert(e);
    }
    console.log(this.state.searchKey)
    //console.log({tracks})
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.getTracks}>
        <input type="text" placeholder="Search Songs" className="input-search" required onChange={this.handleInput}/>
        <Button type="submit">Search</Button>
      </form>
    )
  }
}

export {SearchBar};