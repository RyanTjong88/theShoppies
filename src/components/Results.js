import React, { Component } from 'react';
import Nominations from './Nominations';
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
        // nominated: [
        //     {
        //         id: '',
        //         title: '',
        //         releaseDate: '',
        //     }
        // ]
        nominee: [],
        storetitle: '',
        storereleaseDate: '',
    }

    nominate = (e) => {
        console.log(e.target.value)
        // after user click the button, remove div and add it to the nominated container
        // const { storetitle, stoereleaseDate, id } = this.props;
        //     const title = results.Title
        //     const releaseDate = results.Year
        //     const id = results.imdbID
        // this.setState({
        //     id, 
        //     title,
        //     releaseDate
        // })
    }

    render() {
        const displayResults = this.props.res.map(results => {
            const title = results.Title
            const releaseDate = results.Year
            const id = results.imdbID
            
            return   <ul key={id}>
                        <li key={id} id={id}>
                            <p>{title} ({releaseDate})</p>
                            <button value={id} onClick={this.nominate}>Nominate</button>
                        </li>
                    </ul>
        });
        return (
            <MainContainer>
                <div>
                    {displayResults}
                </div>
                <Nominations className="nominations" />
            </MainContainer>
        );
    }
}

export default Results;