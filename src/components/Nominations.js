import React, { Component } from 'react';
import firebase from '../firebase';  
import styled from 'styled-components';

const Loading = styled.div`
    font-weight: 900;
    font-size: 2rem;
    color: #000;
    padding: 50px;
    
    .hide {
        display: none;
    }
`;

const List = styled.p`
    font-weight: 900;
    font-size: 3rem;
    color: #000;
    padding: 10px;
    text-align: center;
    letter-spacing: 2.5px;
`;


class Nominations extends Component {

    state = {
        movieArray: [],
        count: '',
        hide: ''
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
    handleRemove = (key, id) => {
        // Remove from database
        this.dbRef.child(key).remove(); 

        this.props.removeId(id)
    }

    // Add hide to className if there are no nominees
    addHide = () => {
        if(this.state.count === '') {
            setTimeout(() => {
                this.setState({
                    hide: 'hide'
                })
            }, 3000 )
        }
    }

    render() {

        this.addHide();
        // maps through movies stored in firebase
        const nominated = this.state.movieArray.map(array => {

            const { nomtitle: title, nomyear: releaseDate, nomid: id, nomposter: poster} = array.movie
            const key = array.key

            return (    <li key={key} id={id}>
                            <div className="nominated">
                                <img src={poster}/>
                                <p className="nomInfo">{title} ({releaseDate})</p>
                                <button onClick={() => this.handleRemove(key, id)} key={key}>
                                Remove
                                </button>
                            </div>
                        </li>
            );
        })

        return (
            <div className="nomContainer">
                <List>Nomination List</List>

                {/* informs user the nominated movies are being loaded  */}
                { this.state.count === ''
                ?
                <Loading>
                    <p className={this.state.hide}>loading list of nominated movies...</p>
                </Loading>
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