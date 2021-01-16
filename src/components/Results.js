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
`;

class Results extends Component {

    state = {
        firebaseData: {
            nomtitle: '',
            nomyear: '',
            nomid: ''
        },
        movieArray: [],
        test: '',
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

            // console.log(this.state.movieArray)
            const test2 = []
            this.state.movieArray.map(array => {
                test2.push(array.movie.nomid) 
            })

            this.setState({
                test: test2
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

                this.setState({
                    test: array.movie.nomid
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
        // console.log(this.state.test);
            let result = false
            if(typeof this.state.test === 'object' ) {
                
            // console.log(typeof this.state.test);

                this.state.test.forEach(test2 => {
            // console.log(test2 === id);
                    // test2
                    if(test2 === id) {
            // console.log(test2, id);

                    result = true
                    }
                }) 
            }
            return result
        }

    render() {

        console.log(this.state.test)
        const displayResults = this.props.res.map(results => {
            const title = results.Title
            const releaseDate = results.Year
            const id = results.imdbID
            // console.log(id);


            // const checkID = () => {
            // // console.log(this.state.test);
            //     let result = false
            //     if(typeof this.state.test === 'object' ) {
                    
            //     console.log(typeof this.state.test);

            //         this.state.test.forEach(test2 => {
            //     // console.log(test2 === id);
            //             // test2
            //             if(test2 === id) {
            //     console.log(test2, id);
    
            //             result = true
            //             }
            //         }) 
            //     }
            //     return result
            // }

            const isDisabled = this.checkID(id);
            // console.log(isDisabled)
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
                // {/* </div> */}
        
                        
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