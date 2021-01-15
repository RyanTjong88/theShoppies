import React from 'react';

const Results = (props) => {

    // const test = [...props.titles, ...props.releaseDates]
    // console.log(test)

    // const title = props.titles.map((ran) => {
    //     // return <p>{ran}</p>
    //     return <div>
    //                 <p>{ran}</p>
    //                 {/* <p>{releaseDate}</p> */}
    //                 <button>nom</button>
    //             </div>
    // });
    const test = props.res.map(results => {
        const test2 = results.Title
        const test3 = results.Year

        
        return  <div>
                    <p>{test2} ({test3})</p>
                    <button>Nominate</button>
                </div>
    })
    
    console.log(test)
        
    //  console.log(test)
    return (
        <>
           {test}
        </>
    );
};

export default Results;