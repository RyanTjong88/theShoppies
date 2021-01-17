import React, { Component } from 'react';
import firebase from '../firebase';  
import styled from 'styled-components';

const Loading = styled.div`
    font-weight: 900;
    font-size: 2rem;
    color: #000;
    padding: 50px;
`;

class Nominations extends Component {

    state = {
        movieArray: [],
        count: 0,
    }

    // open portal to Firebase
    dbRef = firebase.database().ref();

    //pull data from firebase
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
                movieArray
            }, () => {
                if(this.state.movieArray.length) {
                    this.setState({
                        count: this.state.movieArray.length
                    })
                }
            })
        })
    }

    // Remove Saved Song from DOM
    handleRemove = (key) => {

        // Remove from database
        this.dbRef.child(key).remove(); 
    }

    render() {
        // maps through movies stored in firebase
        const nominated = this.state.movieArray.map(array => {
            
            const title = array.movie.nomtitle
            const releaseDate = array.movie.nomyear
            const id = array.movie.nomid
            const key = array.key
            
            return (    <li key={key} id={id}>
                            <div className="storedMovies">
                                <p>{title} ({releaseDate})</p>
                                <button onClick={() => this.handleRemove(key)} key={key}>
                                Remove
                                </button>
                            </div>
                        </li>
            );
        })

        return (
            <div className="nomContainer">
                {/* informs user the nominated movies are being loaded  */}
                { this.state.count === 0
                ?
                <Loading>loading list of nominated movies...</Loading>
                :
                null               
                }

                {/* ternary operator which displays a banner when 5 movies have been nominated */}
                { this.state.count === 5 
                ?                     
                <p className="nomCount">You have nominated {this.state.count} movies</p> 
                :
                null}

                <ul>
                    {nominated}
                </ul>
            </div>
        );
    }
}

export default Nominations;