import React from 'react';

function SimpleFunctionalComponent(props) {
    return (
        <div>
            <h1>Information</h1>
            <h2>Student Info:</h2>
            <p>ID: {props.student.id}</p>
            <p>Name: {props.student.name}</p>
            <h2>Teacher Info:</h2>
            <p>ID: {props.teacher.id2}</p>
            <p>Name: {props.teacher.name2}</p>
        </div>
    );
}

export default SimpleFunctionalComponent;