import React, { Component } from 'react';
import Results from './Results';
import styled from 'styled-components';

const SearchContainer = styled.div`
    padding: 50px;
    border: 1px solid black;

    form {
        display: flex;
        flex-direction: column;

        input[type=search] {
            font-family: FontAwesome;
            margin-top: 10px;
            padding: 10px;
        }
    }
`;

const ResultsContainer = styled.div`
    width: 40%;
    padding: 50px;
    margin-top: 50px;
    border: 1px solid black;
`;

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
                <SearchContainer>
                    <form  onSubmit={this.api}>
                        <label htmlFor="search">Movie Title</label>
                        <input type="search" id="search" name="search" placeholder="&#xf002;  Enter Movie" value={userInput} onChange={this.searchParam} />
                    </form>
                </SearchContainer>

                <ResultsContainer className="resContainer">
                    <Results res={res} />
                </ResultsContainer>
            </>
        );
    }
}

export default Search;