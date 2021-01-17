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
        movieIds: '',
    }

    // open portal to Firebase
    dbRef = firebase.database().ref()
        
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
                movieIds
            })
        })
    }  

    nominate = (e) => {
        e.preventDefault();
        console.log(e.target.attributes.nomtitle.value, e.target.attributes.nomyear.value,e.target.attributes.nomid.value)

            const nomtitle = e.target.attributes.nomtitle.value
            const nomyear =  e.target.attributes.nomyear.value
            const nomid =  e.target.attributes.nomid.value

            this.state.movieArray.map(array => {
                return  this.setState({
                            movieIds: array.movie.nomid
                        })
            })

            this.setState({
                firebaseData: {
                    nomtitle,
                    nomyear,
                    nomid
                }
            }, () => {
                // add new record to Firebase
                this.dbRef.push(this.state.firebaseData)
            }) 
    }

    checkID = (id) => {
            let result = false

            if(typeof this.state.movieIds === 'object' ) {
                this.state.movieIds.forEach(movieId => {
                    if(movieId === id) {
                        result = true
                    }
                }) 
            }
            return result
        }

    render() {
        const displayResults = this.props.res.map(results => {
            const title = results.Title
            const releaseDate = results.Year
            const id = results.imdbID
            const isDisabled = this.checkID(id);

            return  (  
                <li className="storedMovies" key={id} id={id}>
                    <p>{title} ({releaseDate})</p>
                    <button 
                        disabled={isDisabled ? 't' : null }
                        onClick={this.nominate} 
                        nomtitle={title} 
                        nomyear={releaseDate}
                        nomid={id}
                    >
                    Nominate
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
                <Nominations className="nominations" />
            </MainContainer>
        );
    }
}

export default Results;