import React from 'react';

const Results = (props) => {

    const displayResults = props.res.map(results => {
        const title = results.Title
        const releaseDate = results.Year
        
        return  <div>
                    <p>{title} ({releaseDate})</p>
                    <button>Nominate</button>
                </div>
    });
        
    return (
        <>
            {displayResults}
        </>
    );
};

export default Results;