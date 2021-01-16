import React, { Component } from 'react';
import firebase from '../firebase';  

class Nominations extends Component {

    state = {
        movieArray: [],
        count: 0
    }

    // open portal to Firebase
    dbRef = firebase.database().ref();

    //pull data from firebase only the first 5 objects
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
            // console.log(movieArray)
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

    // Remove Saved Song
    handleRemove = (key) => {
        // Remove data stored in key
        this.dbRef.child(key).remove(); 
    }

    render() {
        const nominated = this.state.movieArray.map(array => {
            
            const title = array.movie.nomtitle
            const releaseDate = array.movie.nomyear
            const id = array.movie.nomid
            const key = array.key
            
            return (<ul key={key}>
                        <li key={key} id={id}>
                            <div className="storedMovies">
                                <p>{title} ({releaseDate})</p>
                                <button 
                                    onClick={() => this.handleRemove(key)}
                                    key={key}
                                >
                                Remove
                                </button>
                            </div>
                        </li>
                    </ul>
            );
        })

        return (
                <div className="nomContainer">
                    { this.state.count === 5 

                    ? 
                    
                    <p className="nomCount">You have nominated {this.state.count} movies</p> 

                    :

                    null}

                    {nominated}
                </div>
        );
    }
}

export default Nominations;