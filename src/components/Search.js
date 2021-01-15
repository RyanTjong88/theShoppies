import React, { Component } from 'react';
import Results from './Results';

class Search extends Component {
    state = {
        userInput: '',
        titles: [],
        releaseDates: [],
    }

// add user input to search state
// make a fetch call
// handle error if no movie is found
// display title, year of release and a button to nominate that film.
    searchQuery = (e) => {
        console.log(e.target.value)
        this.setState({
            userInput: e.target.value
        })
    } 

    search = (e) => {
        const { userInput } = this.state;
        
        e.preventDefault();
        const url = `http://www.omdbapi.com/?s=${userInput}&apikey=f33f3c27`;
        fetch(url) 
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                const res = data;

                const titles = res.Search.map(movies => {
                    return movies.Title;
                })
                
                const releaseDates = res.Search.map(movies => {
                    return movies.Year;
                })
                

                this.setState({
                    titles,
                    releaseDates
                })
            });



            
            // const results = data.
            // method: "GET",
            // withCredentials: true,
            // headers: {
            //     "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
            //     "Content-Type": "application/json"
            // }
            // })
            // .then(resp => resp.json())
            // .then(function(data) {
            //     console.log(data);
            // })
            // .catch(function(error) {
            //     console.log(error);
            
            
            
    };
    
    render() {
        const { userInput, titles, releaseDates } = this.state;
        
        return (
            <>
                <h2>Search for a movie!</h2>
                <form  onSubmit={this.search}>
                    <label htmlFor="search">Movie Title:</label>
                    <input type="search" id="search" name="search" placeholder="Enter Movie" value={userInput} onChange={this.searchQuery} />
                </form>

                <Results title={titles} releaseDate={releaseDates} />
            </>
        );
    }
}

export default Search;