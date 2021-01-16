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
        border: 2px solid black;

        ul li {
            display: flex;
        }
    }

    .results {
        width: 48%;
        min-height: 600px;
        color: #FFF;
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
        disable: 'okay',
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

            let movieId = this.state.movieArray.map(array => {
                // movieId = array.movie.nomid   
                console.log(array.movie.nomid )
            })

            // console.log(movieArray)
            
            this.setState({
                movieArray
            })
            // , () => {
            //     if(this.state.movieArray.length) {
            //         this.setState({
            //             count: this.state.movieArray.length
            //         })
            //     }
            // })

            console.log('dont give up')
        })
    }  
    

    nominate = (e) => {
        e.preventDefault();
        console.log(e.target.attributes.nomtitle.value, e.target.attributes.nomyear.value,e.target.attributes.nomid.value)

            const nomtitle = e.target.attributes.nomtitle.value
            const nomyear =  e.target.attributes.nomyear.value
            const nomid =  e.target.attributes.nomid.value

            this.state.movieArray.map(array => {
                // if(array.movie.nomid === nomid && array.movie.nomtitle === array.movie.nomtitlew

                const test2 = array.movie.nomid
                // console.log(test2)
                // console.log(nomid)


                // if(array.movie.nomid === nomid) {
                //     console.log(nomid)
                //     this.setState({
                //         disable: ''
                //     })
                // }

                if(array.movie.nomid != nomid) {
                    console.log(nomid)
                    this.setState({
                        disable: 'okay'
                    })
                }
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
            },) 
    }

    render() {
        console.log(this.state.movieArray)

        const displayResults = this.props.res.map(results => {
            const title = results.Title
            const releaseDate = results.Year
            const id = results.imdbID
            
            return  (<ul key={id} >
                        <li className="storedMovies" key={id} id={id}>
                            <p>{title} ({releaseDate})</p>
                            <button 
                                disabled={!this.state.disable}
                                onClick={this.nominate}
                                nomtitle={title} 
                                nomyear={releaseDate}
                                nomid={id}
                            >
                            Nominate
                            </button>
                        </li>
                    </ul>
            );
        });
        return (
            <MainContainer>
                <div className="results">
                    {displayResults}
                </div>
                <Nominations className="nominations" />
            </MainContainer>
        );
    }
}

export default Results;