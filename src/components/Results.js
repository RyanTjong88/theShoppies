import React, { Component } from 'react';
import Nominations from './Nominations';
import firebase from '../firebase';  
import styled from 'styled-components';

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    div {
        background-color: rgb(0, 128, 96);
        padding-top: 20px;
        ul li {
            display: flex;
        }
    }

    .results {
        width: 48%;
        min-height: 600px;
    }

    /* TABLET MEDIA QUERY*/
    @media (max-width: 850px) {
        flex-direction: column;

        .results {
            width: 100%;
        }
    }
`;

class Results extends Component {

    state = {
        firebaseData: {
            nomtitle: '',
            nomyear: '',
            nomid: ''
        },
        movieArray: [],
        movieIds: [],
    }

    // OPEN PORTAL TO FIREBASE
    dbRef = firebase.database().ref()

    // GET DATA FROM FIREBASE DATABASE
    componentDidMount() {
        this.dbRef.on('value', (response) => {

            const movies = response.val()
            const movieArray = []
            
            for (const property in movies) {
                movieArray.push({
                    key: property, 
                    movie: movies[property]
                });  
            }
            this.setState({
                movieArray,
            })

            const movieIds = []
            this.state.movieArray.map(movies => {
                return movieIds.push(movies.movie.nomid) 
            })

            this.setState({
                movieIds,
            })
        })
    }  

// WHEN USER CLICKS NOMINATE PUSH MOVIE DATA TO DATABASE 
    nominate = (e) => {
        e.preventDefault();

        const nomtitle = e.target.attributes.nomtitle.value
        const nomyear =  e.target.attributes.nomyear.value
        const nomid =  e.target.attributes.nomid.value

        this.dbRef.push({
            nomtitle,
            nomyear,
            nomid
        }).then(() => {
            // Update movieIds with current nominated list items
            this.setState(state => ({
                movieIds: [...state.movieIds,nomid]
            }))
        })
    }

// CHECK IF MOVIE ID RESULTS MATCH THE NOMINATED MOVIE IDS || TRUE=DISABLED / FALSE=ENABLED
    checkID = (id) => this.state.movieIds.includes(id)

// REMOVE NOMINATED MOVIE FROM LIST CONTAINER ADN DATABASE
    removeId = (id) => {
        const oldState = [...this.state.movieIds]
        const newState = oldState.filter(movieId => movieId !== id)
        this.setState({
            movieIds: newState,
        })
    }

    render() {
        // MAP THROUGH THE PROPS PASSED FROM THE SEARCH COMPONENT
        const displayResults = this.props.res.map(results => {
            const { Title: title, Year: releaseDate, imdbID: id} = results
            const isDisabled = this.checkID(id);

        // DISPLAY RESULTS TO THE DOM 
            return  (  
                <li className="storedMovies" key={id} id={id}>
                    <p>{title} ({releaseDate})</p>
                    <button 
                        display='false'
                        disabled={isDisabled}
                        onClick={this.nominate} 
                        nomtitle={title} 
                        nomyear={releaseDate}
                        nomid={id}
                    >
                    {/* CHANGES TEST FOR WHEN MOVIE IS NOMINATED OF NOT */}
                    {isDisabled 
                    ?
                    'Nominated'
                    :
                    'Nominate'
                    }
                    </button>
                </li>
            );
        });

        return (
            <MainContainer>
                <div className="results">
                    <ul>
                        {displayResults}
                    </ul>
                </div>
                <Nominations className="nominations" removeId={this.removeId} movieIds={this.state.movieIds}/>
            </MainContainer>
        );
    }
}

export default Results;