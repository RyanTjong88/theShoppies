import React, { Component } from 'react';
import Results from './Results';

class Search extends Component {
    state = {
        userInput: '',
        res: []
    }

    searchParam = (e) => {
        this.setState({
            userInput: e.target.value
        })
    } 

    api = (e) => {
        const { userInput } = this.state;
        
        e.preventDefault();
        const url = `http://www.omdbapi.com/?s=${userInput}&apikey=f33f3c27`;
        fetch(url) 
            .then(response => response.json())
            .then(data => {
                const res = data.Search;
                console.log(res)

                this.setState({
                    res
                })
            });            
    };
    
    render() {
        const { userInput, res } = this.state;

        return (
            <>
                <h2>Search for a movie!</h2>
                <form  onSubmit={this.api}>
                    <label htmlFor="search">Movie Title:</label>
                    <input type="search" id="search" name="search" placeholder="Enter Movie" value={userInput} onChange={this.searchParam} />
                </form>

                <div className="resContainer">
                    <Results res={res} />
                </div>
            </>
        );
    }
}

export default Search;