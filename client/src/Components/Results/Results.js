import React from 'react';
import './Results.css';


const Results = (props) => {
    return (
        props.postData ? (
            <div>
                <ul>
                    <li><h3>{props.name}</h3></li>
                    <li><h4>{props.party}</h4></li>
                </ul>
            </div>
        ) : null
    )
};

export default Results;