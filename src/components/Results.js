import React from 'react';

const Results = (props) => {
    console.log(props.title)

    return (
        <div>
            <h2>{props.title}{props.releaseDate}</h2>
        </div>
    );
};

export default Results;