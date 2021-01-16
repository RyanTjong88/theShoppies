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
        border: 1px solid black;

        ul li {
            display: flex;
        }
    }

    .nominations {
        background-color: blue;
    }

    div,
    .nominations {
        width: 48%;
        min-height: 600px;
        color: #FFF;

        button {
            background-color: #000;
            color: #FFF;
            border: none;
            border-radius: 5px;
            padding: 10px;
            margin-left: 20px;
            font-size: 1.2rem
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
        count: 0,
        disabled: 'on'
    }

    // open portal to Firebase
    dbRef = firebase.database().ref()

    nominate = (e) => {
        e.preventDefault();
        console.log(e.target.attributes.nomtitle.value, e.target.attributes.nomyear.value,e.target.attributes.nomid.value)

            const nomtitle = e.target.attributes.nomtitle.value
            const nomyear =  e.target.attributes.nomyear.value
            const nomid =  e.target.attributes.nomid.value

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

        const count = this.state.count + 1;

        this.setState({
            count
        })

        if(this.state.count  === 4){
            this.setState({
                disabled: ''
            })
        }
    }

    render() {

        const { nomtitle, nomyear, nomid } = this.state.firebaseData;

        const displayResults = this.props.res.map(results => {
            const title = results.Title
            const releaseDate = results.Year
            const id = results.imdbID
            
            return   <ul key={id}>
                        <li key={id} id={id}>
                            <p>{title} ({releaseDate})</p>
                            <button 
                                disabled={!this.state.disabled}
                                onClick={this.nominate}
                                nomtitle={title} 
                                nomyear={releaseDate}
                                nomid={id}
                            >
                            Nominate
                            </button>
                        </li>
                    </ul>
        });
        return (
            <MainContainer>
                <div>
                    {displayResults}
                </div>
                <Nominations 
                    className="nominations" 
                />
            </MainContainer>
        );
    }
}

export default Results;