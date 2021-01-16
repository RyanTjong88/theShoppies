import React, { Component } from 'react';
import Results from './Results';
import styled from 'styled-components';
// import Nominations from './Nominations';

const SearchContainer = styled.div`
    padding: 20px;
    border: 1px solid black;

    form {
        display: flex;
        flex-direction: column;

        label {
            font-weight: 400;
            font-size: 3rem;
        }

        input[type=search] {
            font-family: FontAwesome;
            font-size: 2rem;
            margin-top: 10px;
            padding: 10px;
        }
    }
`;

const ResultsContainer = styled.div`
    padding: 20px;
    margin: 20px 0;
    border: 1px solid black;
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

        const url = `http://www.omdbapi.com/?s=${userInput}&apikey=f33f3c27`;
        fetch(url) 
            .then(response => response.json())
            .then(data => {
                const res = data.Search;

                if(!res) {
                    this.setState({
                        error: 'Movie title not found',
                        display: ''
                    })
                }

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
                    <p>{error}{loading}{display}</p>
                    <Results res={res} />
                </ResultsContainer>

                {/* <Nominations props={res}  /> */}
            </>
        );
    }
}

export default Search;