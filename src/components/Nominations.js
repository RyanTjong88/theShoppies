import React, { Component } from 'react';
import firebase from '../firebase';  

//pull data from firebase only the first 5 objects

class Nominations extends Component {

    state = {
        title: '',
        releaseDate: '',
        id: ''
    }

    // open portal to Firebase
    dbRef = firebase.database().ref()

    // pull the data
    // if statement depending on the amount of index items in the array 
    render() {
        return (
            <div>
                {/* <Results /> */}
                <p>Nominated</p>
            </div>
        );
    }
}

export default Nominations;