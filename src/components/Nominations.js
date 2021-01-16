import React, { Component } from 'react';
import firebase from '../firebase';  

class Nominations extends Component {

    state = {
        movieArray: [],
        banner: ''
    }

    // open portal to Firebase
    dbRef = firebase.database().ref();

    com
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

            this.setState({
                movieArray
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
            // console.log(array)
            const title = array.movie.nomtitle
            const releaseDate = array.movie.nomyear
            const id = array.movie.nomid
            const key = array.key
            

            return <ul key={key}>
                        <li key={key} id={id}>
                            <p>{title} ({releaseDate})</p>
                            <button 
                                onClick={() => this.handleRemove(key)}
                                key={key}
                            >
                            Remove
                            </button>
                        </li>
                    </ul>
        })

        return (
                <div>
                    <p>{this.state.banner}</p>
                    {nominated}
                </div>
        );
    }
}

export default Nominations;