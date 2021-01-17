import React, { Component } from 'react';
import Results from './Results';
import styled from 'styled-components';

const SearchContainer = styled.div`
    padding: 20px;
    border: 1px solid black;

    form {
        display: flex;
        flex-direction: column;

        label {
            font-weight: 400;
            font-size: 2.5rem;
            letter-spacing: 2px;
        }

        input[type=search] {
            font-family: FontAwesome;
            font-size: 2rem;
            margin-top: 10px;
            padding: 5px 10px;
            transition: all .3s;
        }

        input[type=search]:hover,
        input[type=search]:focus {
            background-color: rgb(0,128,96);
            color: #FFF;
        }
    }
`;

const ResultsContainer = styled.div`
    padding: 20px;
    margin: 20px 0;
    border: 1px solid black;

    .resultInfo {
        font-size: 2.5rem;
        letter-spacing: 2px;
        color: #000;
        margin-bottom: 20px;
    }
`;

class Search extends Component {
    state = {
        userInput: '',
        res: [],
        error: '',
        loading: '',
        display: ''
    }
// Update userInput to a string with the users movie title search word
    searchParam = (e) => {
        this.setState({
            userInput: e.target.value,
        })
    } 

// Fetch / Get data from the API
    api = (e) => {
        const { userInput} = this.state;

        e.preventDefault();

        this.setState({
            res: []
        })

        const url = `https://www.omdbapi.com/?s=${userInput}&apikey=f33f3c27`;
        fetch(url) 
            .then(response => response.json())
            .then(data => {
                const res = data.Search;

                // ERROR HANDLING IF DATA NT RETURN FROM API
                if(!res) {
                    this.setState({
                        error: 'Movie title not found',
                        display: ''
                    })
                }

                // DISPLAYS THE MOVIE TITLE THAT WAS SEARCHED
                if(res) {
                    this.setState({
                        res,
                        error: '',
                        display: `Results for "${userInput}"`
                    })
                }
            });            
    };
    
    render() {
        const { userInput, res, error, loading, display } = this.state;

        return (
            <>
                <SearchContainer>
                    <form  onSubmit={this.api}>
                        <label htmlFor="search">Movie Title</label>
                        <input type="search" id="search" name="search" placeholder="&#xf002;  Enter Movie" value={userInput} onChange={this.searchParam} required/>
                    </form>
                </SearchContainer>

                <ResultsContainer className="resContainer">
                    <p className="resultInfo">{error}{loading}{display}</p>
                    <Results res={res} />
                </ResultsContainer>
            </>
        );
    }
}

export default Search;